"use client"

import { useState } from "react"

export default function HeroSection() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setPos({ x, y })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div
          className="absolute inset-0 h-full w-full transition-transform duration-[250ms] ease-out"
          style={{
            transform: `scale(1.08) translate(${pos.x * -10}px, ${pos.y * -10}px)`,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/blackwhitebrownborder.png"
            className="h-full w-full object-cover object-[50%_30%] [filter:grayscale(1)_contrast(1.1)_brightness(0.9)]"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,11,0.35)_0%,transparent_30%,transparent_55%,#08090b_100%)]" />
      </div>

      <div className="relative z-[2] w-full px-12 pb-[88px]">
        <h1 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(64px,13vw,180px)] font-extrabold leading-[0.86] tracking-[-0.01em] [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]">
          CHRIS SWIMZZ
        </h1>
      </div>
    </section>
  )
}
