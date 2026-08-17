"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"

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
        <Reveal className="relative mb-10">
          <GhostNumber number="04" />
          <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/60">
            COMING SOON
          </div>
          <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            SWIMVOLT
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-14">
          <RevealItem>
            <p className="mb-8 text-[16px] leading-[1.7] text-white/65">
              Film one racing start on your phone. SwimVolt reads it frame by frame and tells you
              what to change.
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

          <RevealItem>
            <div className="relative overflow-hidden rounded-[20px] border border-white/[0.12]">
              <Image
                src="/images/swimvolt/pose-overlay.jpg"
                alt="Chris diving with SwimVolt pose tracking overlaid"
                width={946}
                height={450}
                className="h-auto w-full"
                priority
              />
              <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white px-3.5 py-1.5 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-bold tracking-[0.04em] text-[#08090b]">
                WAITLIST OPEN
              </div>
              <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#08090b]/70 to-transparent px-6 pb-4 pt-10 text-center font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.08em] text-white/80">
                FRAME-BY-FRAME START ANALYSIS
              </p>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
