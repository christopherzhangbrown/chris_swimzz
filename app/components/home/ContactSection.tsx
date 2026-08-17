"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Reveal } from "@/app/components/motion/Reveal"
import { ACTION_PRIMARY, ACTION_ARROW } from "@/app/components/ui/actions"
import GhostNumber from "./GhostNumber"

const FIELD_CLASSNAME =
  "h-auto w-full rounded-none border-0 border-b border-rule bg-transparent px-0 py-3 text-white placeholder:text-ink-faint focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-white focus-visible:shadow-[inset_0_-2px_0_0_white]"

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
            <div className="relative z-10 mb-3.5 font-mono text-[12px] font-bold tracking-eyebrow text-ink-subtle">
              LET&apos;S TALK
            </div>
            <h2 className="relative z-10 m-0 flex items-center gap-4 font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
              GET IN TOUCH
              <span aria-hidden="true" className="text-ink-subtle">
                →
              </span>
            </h2>
            <div className="relative z-10 mt-8 h-px w-full bg-white/10" />
            <p className="relative z-10 mt-8 max-w-[440px] text-[16px] leading-[1.7] text-ink-muted">
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
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Your name
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={FIELD_CLASSNAME}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Your email
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={FIELD_CLASSNAME}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Your message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your inquiry, collaboration idea, or just say hello!"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`min-h-[100px] resize-none ${FIELD_CLASSNAME}`}
                />
              </div>
              <button type="submit" className={`group w-full sm:w-auto ${ACTION_PRIMARY}`}>
                SEND MESSAGE
                <span aria-hidden="true" className={ACTION_ARROW}>
                  →
                </span>
              </button>
              {success && (
                <p role="status" className="text-[13px] text-white">
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {error && (
                <p role="alert" className="text-[13px] text-red-400">
                  {error}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
