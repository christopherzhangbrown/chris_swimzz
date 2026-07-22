"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function AiStartSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

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
        <div className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-[#2f6bff]">
            COMING SOON
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            AI START ANALYZER
          </h2>
        </div>

        <div className="max-w-[520px]">
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
                className="h-[52px] w-full rounded-full border-white/[0.15] bg-white/[0.03] px-5 text-white placeholder:text-white/40 focus-visible:ring-[#2f6bff]"
              />
              <button
                type="submit"
                className="h-[52px] shrink-0 rounded-full bg-[#2f6bff] px-8 text-[14px] font-bold tracking-[0.03em] text-white transition-colors duration-300 hover:bg-[#1a55e6]"
              >
                JOIN WAITLIST →
              </button>
            </form>
          ) : (
            <p className="text-[14px] font-bold tracking-[0.03em] text-[#2f6bff]">
              You&apos;re on the list — we&apos;ll email you when it&apos;s ready.
            </p>
          )}
          {error && <p className="mt-3 text-[13px] text-red-400">{error}</p>}
        </div>
      </div>
    </section>
  )
}
