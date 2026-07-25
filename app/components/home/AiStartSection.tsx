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
          <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/60">
            COMING SOON
          </div>
          <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            AI START ANALYZER
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto_minmax(0,380px)] lg:items-start">
          <RevealItem className="max-w-[560px]">
            <p className="mb-8 text-[16px] leading-[1.7] text-white/65">
              AI-powered feedback on your dive start, in seconds. Waitlist open now — be first to try it.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <label htmlFor="waitlist-email" className="sr-only">
                  Your email
                </label>
                <Input
                  id="waitlist-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-auto w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-white focus-visible:shadow-[inset_0_-2px_0_0_white]"
                />
                <button
                  type="submit"
                  className="group flex items-center gap-3 font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-bold tracking-[0.06em] text-white"
                >
                  JOIN WAITLIST
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </form>
            ) : (
              <p
                role="status"
                className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-bold tracking-[0.06em] text-white"
              >
                You&apos;re on the list — we&apos;ll email you when it&apos;s ready.
              </p>
            )}
            {error && (
              <p role="alert" className="mt-3 text-[13px] text-red-400">
                {error}
              </p>
            )}
          </RevealItem>

          <div aria-hidden="true" className="hidden self-stretch border-l border-dashed border-white/15 lg:block" />

          <RevealItem className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] border border-white/[0.12] bg-white/[0.02]">
            <div className="absolute right-4 top-4 rounded-full bg-white px-3.5 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-bold tracking-[0.04em] text-[#08090b]">
              WAITLIST OPEN
            </div>

            <div className="absolute inset-x-10 top-1/2 -translate-y-1/2">
              <div className="relative h-px w-full bg-white/15">
                <div className="absolute inset-0 flex items-center justify-between">
                  <div className="h-3 w-px bg-white/25" />
                  <div className="h-3 w-px bg-white/25" />
                  <div className="h-3 w-px bg-white/25" />
                </div>
                <motion.div
                  aria-hidden="true"
                  className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                  initial={{ left: "0%" }}
                  animate={reduceMotion ? { left: "50%" } : { left: ["0%", "100%", "0%"] }}
                  transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="mt-5 flex justify-between font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-bold tracking-[0.1em] text-white/35">
                <span>REACTION</span>
                <span>ANGLE</span>
                <span>ENTRY</span>
              </div>
            </div>

            <div className="absolute inset-x-10 bottom-6 text-center font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] text-white/30">
              FRAME-BY-FRAME START ANALYSIS
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
