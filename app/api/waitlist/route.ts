import { NextResponse } from "next/server"

export const runtime = "nodejs"

/**
 * SwimVolt waitlist signups.
 *
 * This does not talk to a database. It forwards to the SwimVolt app's
 * /api/interest endpoint, which owns the Neon `interest` table and already
 * does email validation, per-IP rate limiting and dedup. Duplicating that
 * here would mean a second copy of the rules, a second place to keep them in
 * sync, and the Neon credential living in a second Vercel project.
 *
 * This replaces a Supabase integration that pointed at a project which no
 * longer exists, so every signup had been failing with a 500.
 */
const INTEREST_ENDPOINT =
  process.env.SWIMVOLT_INTEREST_URL ?? "https://www.swimvolt.com/api/interest"

const TIMEOUT_MS = 10_000

export async function POST(request: Request) {
  let email: unknown
  try {
    ;({ email } = await request.json())
  } catch {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 })
  }

  if (typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 })
  }

  // The rate limit downstream buckets on the FIRST entry of x-forwarded-for.
  // Without passing the caller's IP through, every signup from this site would
  // share one bucket and the sixth person in an hour would be turned away.
  const forwardedFor =
    request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? ""

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const upstream = await fetch(INTEREST_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(forwardedFor ? { "x-forwarded-for": forwardedFor } : {}),
      },
      body: JSON.stringify({ email: email.trim(), kind: "waitlist" }),
      signal: controller.signal,
    })

    if (upstream.ok) {
      return NextResponse.json({ ok: true })
    }

    // Surface the upstream copy where it is useful to the person typing
    // (invalid email, rate limited) rather than replacing it with a generic
    // failure. Fall back if the body is not the shape we expect.
    const body = (await upstream.json().catch(() => null)) as { message?: unknown } | null
    const message =
      typeof body?.message === "string" ? body.message : "Something went wrong — try again."

    return NextResponse.json({ ok: false, error: message }, { status: upstream.status })
  } catch (err) {
    const timedOut = err instanceof Error && err.name === "AbortError"
    console.error("[waitlist] forward to interest endpoint failed:", err)
    return NextResponse.json(
      {
        ok: false,
        error: timedOut
          ? "That took too long — try again."
          : "Couldn't reach the server — try again.",
      },
      { status: 502 },
    )
  } finally {
    clearTimeout(timeout)
  }
}
