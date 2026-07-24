"use client"

import type React from "react"
import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
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
        <Reveal className="relative mb-14">
          <GhostNumber number="04" />
          <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            COMING SOON — 04
          </div>
          <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            AI START ANALYZER
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,380px)] lg:items-center">
          <RevealItem className="max-w-[560px]">

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
          </RevealItem>

          <RevealItem className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-dashed border-white/15 bg-white/[0.02]">
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
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
