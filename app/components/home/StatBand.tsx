"use client"

import { useEffect, useRef, useState } from "react"
import { RevealStagger, RevealItem } from "@/app/components/motion/Reveal"

export default function StatBand() {
  const sectionRef = useRef<HTMLElement>(null)
  const startedRef = useRef(false)
  const [followers, setFollowers] = useState(0)
  const [views, setViews] = useState(0)
  const [years, setYears] = useState(0)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            animateStats()
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const animateStats = () => {
    const duration = 1400
    const start = performance.now()
    const targets = { followers: 20, views: 620, years: 12 }

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - t, 3)
      setFollowers(Math.round(targets.followers * ease))
      setViews(Math.round(targets.views * ease))
      setYears(Math.round(targets.years * ease))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  return (
    <section ref={sectionRef} className="px-6 pb-[88px] pt-16">
      <RevealStagger className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 text-center">
        <RevealItem>
          <div className="font-display text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white">
            {followers}K<span className="text-ink-faint">+</span>
          </div>
          <div className="mt-3 font-mono text-[11px] font-medium tracking-eyebrow text-ink-subtle">
            INSTAGRAM FOLLOWERS
          </div>
        </RevealItem>
        <RevealItem>
          <div className="font-display text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white">
            {views}K<span className="text-ink-faint">+</span>
          </div>
          <div className="mt-3 font-mono text-[11px] font-medium tracking-eyebrow text-ink-subtle">
            TOTAL VIEWS ACROSS TOP CLIPS
          </div>
        </RevealItem>
        <RevealItem>
          <div className="font-display text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white">
            {years}<span className="text-ink-faint">+</span>
          </div>
          <div className="mt-3 font-mono text-[11px] font-medium tracking-eyebrow text-ink-subtle">
            YEARS COMPETITIVE SWIMMING
          </div>
        </RevealItem>
        <RevealItem>
          <div className="font-display text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white">
            D1
          </div>
          <div className="mt-3 font-mono text-[11px] font-medium tracking-eyebrow text-ink-subtle">
            BROWN UNIVERSITY
          </div>
        </RevealItem>
      </RevealStagger>
    </section>
  )
}
