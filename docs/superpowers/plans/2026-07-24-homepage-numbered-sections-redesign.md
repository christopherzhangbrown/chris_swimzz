# Homepage Numbered-Sections Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure everything below the hero video and stat band into a
numbered-section format (kicker + index number, oversized ghost-number
watermark, diagonal stripe texture) matching the reference wireframes in
`screenshots/01-site.png` through `06-site.png`, while keeping all existing
content, images, and working form integrations.

**Architecture:** A new shared `GhostNumber` client component (framer-motion
scroll-parallax) is dropped into each of the 5 renumbered sections
(`AboutSection`, `PopularContent`, `SponsorsSection`, `AiStartSection`,
`ContactSection`). `page.tsx` is reordered, gains a site-wide diagonal-stripe
background layer, and gets `AiStartSection` wired in for the first time
(previously dead code). `SectionDivider` (marquee) is deleted.

**Tech Stack:** Next.js 15 (App Router), React 19, Tailwind CSS, framer-motion
(already used throughout via `app/components/motion/Reveal.tsx` and
`PopularContentCard.tsx`).

## Global Constraints

- Hero (`HeroSection.tsx`) and stat band (`StatBand.tsx`) are unchanged — do
  not touch.
- All scroll/parallax motion must respect `useReducedMotion()` — no motion
  when the user has reduced-motion enabled, matching the existing pattern in
  `PopularContentCard.tsx`.
- Do not change `/api/waitlist` or the Formspree contact submission logic —
  only the surrounding layout/copy may change.
- Use existing design tokens only: `font-[family-name:var(--font-big-shoulders)]`
  for display headings, `font-[family-name:var(--font-jetbrains-mono)]` for
  kickers/labels, background `#08090b`, text `#f5f6f7`, white-opacity scale
  (e.g. `text-white/45`, `border-white/[0.08]`) — do not introduce new colors.
- This repo has no test framework configured (`package.json` has no test
  script; no `.test.`/`.spec.` files exist). Verification for every task is:
  `npm run lint` (must exit clean) + a manual check in `npm run dev`. Do not
  invent a test runner or add test-only dependencies.
- Kicker suffixes use an em dash: `"WHO I AM — 01"` (matching existing copy
  conventions like `"CODE {sponsor.code} — {sponsor.codeDescription}"` in
  `SponsorsSection.tsx`).

---

### Task 1: Create `GhostNumber` and wire it into the About section (01)

**Files:**
- Create: `app/components/home/GhostNumber.tsx`
- Modify: `app/components/home/AboutSection.tsx`

**Interfaces:**
- Produces: `GhostNumber` — default export, `({ number }: { number: string }) => JSX.Element`. Renders an absolutely-positioned, `aria-hidden`, non-interactive numeral at low opacity with scroll-linked parallax. Must be placed inside a `relative`-positioned ancestor, and sibling content that should render on top of it must carry `relative z-10`.

- [ ] **Step 1: Create the `GhostNumber` component**

```tsx
"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

export default function GhostNumber({ number }: { number: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-24, 24])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      aria-hidden="true"
      className="pointer-events-none absolute -top-8 left-0 -z-10 select-none font-[family-name:var(--font-big-shoulders)] text-[clamp(120px,20vw,280px)] font-extrabold leading-none text-white/[0.04]"
    >
      {number}
    </motion.div>
  )
}
```

- [ ] **Step 2: Wire it into `AboutSection.tsx`**

In `app/components/home/AboutSection.tsx`, add the import:

```tsx
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"
```

Replace the kicker/heading block:

```tsx
        <Reveal className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            WHO I AM
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            MY STORY
          </h2>
        </Reveal>
```

with:

```tsx
        <Reveal className="relative mb-14">
          <GhostNumber number="01" />
          <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            WHO I AM — 01
          </div>
          <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            MY STORY
          </h2>
        </Reveal>
```

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open `http://localhost:3000/#about` in a browser. Confirm:
- A large, faint "01" numeral is visible behind the "WHO I AM — 01" / "MY STORY" heading, not overlapping the photos or body text.
- Scrolling the section causes the "01" to drift slightly slower than the heading text (parallax).
- With OS-level "reduce motion" enabled, the "01" does not move on scroll.

- [ ] **Step 4: Commit**

```bash
git add app/components/home/GhostNumber.tsx app/components/home/AboutSection.tsx
git commit -m "Add GhostNumber watermark component, wire into About section"
```

---

### Task 2: Reorder homepage sections, drop the marquee divider

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/components/home/PopularContent.tsx`
- Delete: `app/components/home/SectionDivider.tsx`

**Interfaces:**
- Consumes: `GhostNumber` from Task 1 (`app/components/home/GhostNumber.tsx`, default export, `{ number: string }` prop).

- [ ] **Step 1: Reorder `page.tsx` and remove the marquee**

Replace the full contents of `app/page.tsx`:

```tsx
import HeroSection from "./components/home/HeroSection"
import StatBand from "./components/home/StatBand"
import PopularContent from "./components/home/PopularContent"
import AboutSection from "./components/home/AboutSection"
import SponsorsSection from "./components/home/SponsorsSection"
import ContactSection from "./components/home/ContactSection"

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#08090b] text-[#f5f6f7]">
      <HeroSection />
      <StatBand />
      <AboutSection />
      <PopularContent />
      <SponsorsSection />
      <ContactSection />
    </div>
  )
}
```

(This drops the `SectionDivider` import/usage and swaps `PopularContent` to
after `AboutSection`. `AiStartSection` is intentionally not added yet — that
happens in Task 5.)

- [ ] **Step 2: Delete the now-unused marquee component**

```bash
rm app/components/home/SectionDivider.tsx
```

- [ ] **Step 3: Add kicker suffix + GhostNumber to `PopularContent.tsx`**

Add the import at the top of `app/components/home/PopularContent.tsx`:

```tsx
import PopularContentCard from "./PopularContentCard"
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"
```

Replace the heading block:

```tsx
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
              MOST WATCHED
            </div>
            <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
              POPULAR CONTENT
            </h2>
          </div>
```

with:

```tsx
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="relative">
            <GhostNumber number="02" />
            <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
              MOST WATCHED — 02
            </div>
            <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
              POPULAR CONTENT
            </h2>
          </div>
```

(Leave the sibling `<a href=... VIEW ALL ON INSTAGRAM →</a>` untouched.)

- [ ] **Step 4: Verify**

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, load `http://localhost:3000`. Confirm:
- Scrolling from the stat band goes straight into "WHO I AM — 01 / MY STORY" — no marquee band in between.
- "MOST WATCHED — 02 / POPULAR CONTENT" now appears directly after the My Story section, with its own "02" ghost watermark, followed by Sponsors and Contact in their previous order.
- No console errors about a missing `SectionDivider` import.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/components/home/PopularContent.tsx
git rm app/components/home/SectionDivider.tsx
git commit -m "Reorder homepage sections, drop marquee divider"
```

---

### Task 3: Add site-wide diagonal stripe background texture

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add the fixed background layer**

Replace the root `<div>` in `app/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#08090b] text-[#f5f6f7]">
      <HeroSection />
      <StatBand />
      <AboutSection />
      <PopularContent />
      <SponsorsSection />
      <ContactSection />
    </div>
  )
}
```

with:

```tsx
export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#08090b] text-[#f5f6f7]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] [background-image:repeating-linear-gradient(115deg,rgba(255,255,255,0.6)_0px,rgba(255,255,255,0.6)_1px,transparent_1px,transparent_80px)]"
      />
      <div className="relative z-[1]">
        <HeroSection />
        <StatBand />
        <AboutSection />
        <PopularContent />
        <SponsorsSection />
        <ContactSection />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, load `http://localhost:3000`. Confirm:
- A very faint diagonal line texture is visible across the dark background of every section (subtle — should not compete with text or photos).
- The texture stays fixed in place while scrolling (doesn't scroll with content).
- Ghost numbers from Task 1/2 still render above the texture and below the heading text.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "Add site-wide diagonal stripe background texture"
```

---

### Task 4: Sponsors section (03) — kicker, ghost number, per-row index badges

**Files:**
- Modify: `app/components/home/SponsorsSection.tsx`

**Interfaces:**
- Consumes: `GhostNumber` from Task 1.

- [ ] **Step 1: Add the import**

```tsx
import Image from "next/image"
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"
```

- [ ] **Step 2: Replace the heading block**

```tsx
        <Reveal className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            WHO BACKS THE JOURNEY
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            SPONSORS
          </h2>
        </Reveal>
```

with:

```tsx
        <Reveal className="relative mb-14">
          <GhostNumber number="03" />
          <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            WHO BACKS THE JOURNEY — 03
          </div>
          <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            SPONSORS
          </h2>
        </Reveal>
```

- [ ] **Step 3: Add a numeric index badge to each sponsor row**

Replace:

```tsx
        <RevealStagger className="mx-auto max-w-[880px]" staggerDelay={0.08}>
          {visibleSponsors.map((sponsor) => (
            <RevealItem key={sponsor.name}>
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 border-b border-white/[0.08] py-6 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div className="flex h-9 w-24 shrink-0 items-center">
```

with:

```tsx
        <RevealStagger className="mx-auto max-w-[880px]" staggerDelay={0.08}>
          {visibleSponsors.map((sponsor, index) => (
            <RevealItem key={sponsor.name}>
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 border-b border-white/[0.08] py-6 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div className="w-8 shrink-0 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.04em] text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex h-9 w-24 shrink-0 items-center">
```

- [ ] **Step 4: Verify**

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open `http://localhost:3000/#sponsors`. Confirm:
- Kicker reads "WHO BACKS THE JOURNEY — 03" with a faint "03" watermark behind it.
- Each sponsor row now shows a small "01", "02", "03"... index number to the left of the logo, in reading order.
- Hover states on rows (background tint, logo color, "VISIT →" brighten) still work.

- [ ] **Step 5: Commit**

```bash
git add app/components/home/SponsorsSection.tsx
git commit -m "Add kicker number, ghost watermark, and row indices to Sponsors"
```

---

### Task 5: Rebuild AI Start Analyzer (04) as two-column, wire into homepage

**Files:**
- Modify: `app/components/home/AiStartSection.tsx`
- Modify: `app/page.tsx`
- Modify: `app/ai-start/page.tsx`

**Interfaces:**
- Consumes: `GhostNumber` from Task 1.

- [ ] **Step 1: Rebuild `AiStartSection.tsx`**

Replace the full contents of `app/components/home/AiStartSection.tsx`:

```tsx
"use client"

import type React from "react"
import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Input } from "@/components/ui/input"
import GhostNumber from "./GhostNumber"

export default function AiStartSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const reduceMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.ok) {
        setIsSubmitted(true)
        setEmail("")
      } else {
        setError(data.error || "Submission failed. Please try again.")
      }
    } catch {
      setError("Submission failed. Please try again.")
    }
  }

  return (
    <section id="ai-start" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,380px)] lg:items-center">
          <div className="max-w-[560px]">
            <div className="relative mb-14">
              <GhostNumber number="04" />
              <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
                COMING SOON — 04
              </div>
              <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
                AI START ANALYZER
              </h2>
            </div>

            <p className="mb-6 text-[16px] leading-[1.7] text-white/65">
              AI-powered feedback on your dive start, in seconds. Waitlist open now — be first to try it.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-[52px] w-full rounded-full border-white/[0.15] bg-white/[0.03] px-5 text-white placeholder:text-white/40 focus-visible:ring-white"
                />
                <button
                  type="submit"
                  className="h-[52px] shrink-0 rounded-full bg-white px-8 text-[14px] font-bold tracking-[0.03em] text-[#08090b] transition-colors duration-300 hover:bg-white/85"
                >
                  JOIN WAITLIST →
                </button>
              </form>
            ) : (
              <p className="text-[14px] font-bold tracking-[0.03em] text-white">
                You&apos;re on the list — we&apos;ll email you when it&apos;s ready.
              </p>
            )}
            {error && <p className="mt-3 text-[13px] text-red-400">{error}</p>}
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-dashed border-white/15 bg-white/[0.02]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2/3 w-2/3 rounded-full border border-white/[0.08]" />
              <div className="absolute h-1/3 w-1/3 rounded-full border border-white/[0.12]" />
            </div>
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-6 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
              initial={{ top: "20%" }}
              animate={reduceMotion ? { top: "50%" } : { top: ["15%", "85%", "15%"] }}
              transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute right-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-[0.04em] text-[#08090b]">
              WAITLIST OPEN
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire `AiStartSection` into `page.tsx`**

Replace:

```tsx
import HeroSection from "./components/home/HeroSection"
import StatBand from "./components/home/StatBand"
import PopularContent from "./components/home/PopularContent"
import AboutSection from "./components/home/AboutSection"
import SponsorsSection from "./components/home/SponsorsSection"
import ContactSection from "./components/home/ContactSection"
```

with:

```tsx
import HeroSection from "./components/home/HeroSection"
import StatBand from "./components/home/StatBand"
import PopularContent from "./components/home/PopularContent"
import AboutSection from "./components/home/AboutSection"
import SponsorsSection from "./components/home/SponsorsSection"
import AiStartSection from "./components/home/AiStartSection"
import ContactSection from "./components/home/ContactSection"
```

And replace:

```tsx
        <SponsorsSection />
        <ContactSection />
```

with:

```tsx
        <SponsorsSection />
        <AiStartSection />
        <ContactSection />
```

- [ ] **Step 3: Update the legacy `/ai-start` redirect to point at the new anchor**

The `/ai-start` route currently redirects to `/` (a leftover from when the
section wasn't rendered anywhere). Now that `#ai-start` is a real section,
align it with the pattern already used by `/about`, `/sponsors`, and
`/contact`. Replace the full contents of `app/ai-start/page.tsx`:

```tsx
import { redirect } from "next/navigation"

export default function AiStartPage() {
  redirect("/#ai-start")
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open `http://localhost:3000/#ai-start`. Confirm:
- Section now appears on the homepage between Sponsors and Get In Touch.
- Left column: "COMING SOON — 04 / AI START ANALYZER" with "04" ghost watermark, copy, and working email field + "JOIN WAITLIST →" button.
- Right column: a bordered panel with nested circles and a moving horizontal scan line, plus a white "WAITLIST OPEN" pill in the top-right corner.
- Submitting a real email in the form still successfully posts to `/api/waitlist` (check Network tab for a 200 response, and the "You're on the list" confirmation message appears).
- With reduced motion enabled, the scan line is static (no animation).
- Visiting `http://localhost:3000/ai-start` directly redirects to `/#ai-start` and lands on the section (not just the homepage top).

- [ ] **Step 5: Commit**

```bash
git add app/components/home/AiStartSection.tsx app/page.tsx app/ai-start/page.tsx
git commit -m "Rebuild AI Start Analyzer as two-column section, wire into homepage"
```

---

### Task 6: Add missing "AI START" nav link

**Files:**
- Modify: `app/components/Header.tsx`

- [ ] **Step 1: Add the nav entry**

Replace:

```tsx
  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/#about" },
    { name: "SPONSORS", href: "/#sponsors" },
    { name: "CONTACT", href: "/#contact" },
  ]
```

with:

```tsx
  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/#about" },
    { name: "SPONSORS", href: "/#sponsors" },
    { name: "AI START", href: "/#ai-start" },
    { name: "CONTACT", href: "/#contact" },
  ]
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, load `http://localhost:3000`. Confirm:
- Desktop nav shows HOME, ABOUT, SPONSORS, AI START, CONTACT in that order.
- Clicking "AI START" scrolls to the AI Start Analyzer section.
- Open the mobile menu (narrow viewport) and confirm "AI START" appears there too and works the same way.

- [ ] **Step 3: Commit**

```bash
git add app/components/Header.tsx
git commit -m "Add missing AI START nav link"
```

---

### Task 7: Get In Touch section (05) — heading arrow, divider, kicker, ghost number

**Files:**
- Modify: `app/components/home/ContactSection.tsx`

**Interfaces:**
- Consumes: `GhostNumber` from Task 1.

- [ ] **Step 1: Add the import**

```tsx
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"
```

- [ ] **Step 2: Replace the heading block**

Replace:

```tsx
        <Reveal className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            LET&apos;S TALK
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            GET IN TOUCH
          </h2>
        </Reveal>
```

with:

```tsx
        <Reveal className="relative mb-14">
          <GhostNumber number="05" />
          <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            LET&apos;S TALK — 05
          </div>
          <h2 className="relative z-10 m-0 flex items-center gap-4 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            GET IN TOUCH
            <span aria-hidden="true" className="text-white/50">
              →
            </span>
          </h2>
          <div className="relative z-10 mt-8 h-px w-full bg-white/10" />
        </Reveal>
```

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open `http://localhost:3000/#contact`. Confirm:
- Kicker reads "LET'S TALK — 05" with a faint "05" watermark behind it.
- Heading reads "GET IN TOUCH →" with a thin horizontal divider line beneath it, above the form.
- The name/email/message form below still submits successfully to Formspree (check Network tab, and the "Message sent!" confirmation appears).

- [ ] **Step 4: Commit**

```bash
git add app/components/home/ContactSection.tsx
git commit -m "Add heading arrow, divider, kicker number, and ghost watermark to Contact"
```

---

## Final full-site walkthrough

After all 7 tasks:

- [ ] Run `npm run build` — expect a clean production build with no type or lint errors.
- [ ] Run `npm run dev`, load `http://localhost:3000`, and scroll the entire homepage top to bottom. Confirm the full order: Hero (video, unchanged) → StatBand (unchanged) → 01 My Story → 02 Popular Content → 03 Sponsors → 04 AI Start Analyzer → 05 Get In Touch → Footer.
- [ ] Confirm every nav link (HOME, ABOUT, SPONSORS, AI START, CONTACT) scrolls to the correct section.
- [ ] Confirm both forms (AI Start waitlist, Contact) still submit successfully end-to-end.
- [ ] Toggle OS-level reduced motion and re-scroll the page; confirm no parallax/scan-line motion occurs anywhere.
