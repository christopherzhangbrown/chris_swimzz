"use client"

import { useEffect, useRef, useState } from "react"

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
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 text-center">
        <div>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white [text-shadow:0_0_24px_rgba(47,107,255,0.3)]">
            {followers}K<span className="text-[#2f6bff]">+</span>
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/60">
            INSTAGRAM FOLLOWERS
          </div>
        </div>
        <div>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white [text-shadow:0_0_24px_rgba(47,107,255,0.3)]">
            {views}K<span className="text-[#2f6bff]">+</span>
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/50">
            TOTAL VIEWS ACROSS TOP CLIPS
          </div>
        </div>
        <div>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white [text-shadow:0_0_24px_rgba(47,107,255,0.3)]">
            {years}<span className="text-[#2f6bff]">+</span>
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/50">
            YEARS COMPETITIVE SWIMMING
          </div>
        </div>
        <div>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white [text-shadow:0_0_24px_rgba(47,107,255,0.3)]">
            D1
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/50">
            BROWN UNIVERSITY
          </div>
        </div>
      </div>
    </section>
  )
}
