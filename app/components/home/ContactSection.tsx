"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    try {
      const res = await fetch("https://formspree.io/f/mjkorqbn", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.ok) {
        setSuccess(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setError("Submission failed. Please try again.")
      }
    } catch {
      setError("Submission failed. Please try again.")
    }
  }

  return (
    <section id="contact" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <Reveal className="relative">
            <GhostNumber number="05" />
            <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
              LET&apos;S TALK
            </div>
            <h2 className="relative z-10 m-0 flex items-center gap-4 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
              GET IN TOUCH
              <span aria-hidden="true" className="text-white/50">
                →
              </span>
            </h2>
            <div className="relative z-10 mt-8 h-px w-full bg-white/10" />
            <p className="relative z-10 mt-8 max-w-[440px] text-[16px] leading-[1.7] text-white/65">
              Collabs, questions, partnerships — let&apos;s talk. For sponsorships &amp; business inquiries:{" "}
              <a
                href="mailto:chrisswimzzinquires@gmail.com"
                className="text-white/80 underline underline-offset-4 hover:text-white"
              >
                chrisswimzzinquires@gmail.com
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <Input
                name="name"
                type="text"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
                className="h-auto w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-white/50"
              />
              <Input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="h-auto w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-white/50"
              />
              <Textarea
                name="message"
                placeholder="Tell me about your inquiry, collaboration idea, or just say hello!"
                required
                value={formData.message}
                onChange={handleChange}
                className="min-h-[100px] w-full resize-none rounded-none border-0 border-b border-white/15 bg-transparent px-0 py-3 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-white/50"
              />
              <button
                type="submit"
                className="h-[52px] w-full rounded-full bg-white font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-bold tracking-[0.06em] text-[#08090b] transition-colors duration-300 hover:bg-white/85 sm:w-auto sm:px-8"
              >
                SEND MESSAGE →
              </button>
              {success && <p className="text-[13px] text-white">Message sent! I&apos;ll get back to you soon.</p>}
              {error && <p className="text-[13px] text-red-400">{error}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
