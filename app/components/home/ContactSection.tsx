"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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
      <div className="mx-auto max-w-[560px]">
        <div className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            LET&apos;S TALK
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            GET IN TOUCH
          </h2>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="h-[52px] w-full rounded-full border-white/[0.15] bg-white/[0.03] px-5 text-white placeholder:text-white/40 focus-visible:ring-white"
            />
            <Input
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="h-[52px] w-full rounded-full border-white/[0.15] bg-white/[0.03] px-5 text-white placeholder:text-white/40 focus-visible:ring-white"
            />
            <Textarea
              name="message"
              placeholder="Tell me about your inquiry, collaboration idea, or just say hello!"
              required
              value={formData.message}
              onChange={handleChange}
              className="min-h-[120px] w-full rounded-[20px] border-white/[0.15] bg-white/[0.03] px-5 py-4 text-white placeholder:text-white/40 focus-visible:ring-white"
            />
            <button
              type="submit"
              className="h-[52px] w-full rounded-full bg-white text-[14px] font-bold tracking-[0.03em] text-[#08090b] transition-colors duration-300 hover:bg-white/85 sm:w-auto sm:px-8"
            >
              SEND MESSAGE →
            </button>
            {success && <p className="text-[13px] text-white">Message sent! I&apos;ll get back to you soon.</p>}
            {error && <p className="text-[13px] text-red-400">{error}</p>}
          </form>

          <p className="mt-8 text-[14px] text-white/50">
            For sponsorships &amp; business inquiries:{" "}
            <a href="mailto:chrisswimzzinquires@gmail.com" className="text-white/70 hover:text-white">
              chrisswimzzinquires@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
