"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

export default function HeroSection() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setPos({ x, y })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  // Mirror actual video playback state rather than assuming play()/pause() succeed synchronously.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  return (
    <section id="home" className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div
          className="absolute inset-0 h-full w-full transition-transform duration-[250ms] ease-out"
          style={{
            transform: `scale(1.08) translate(${pos.x * -10}px, ${pos.y * -10}px)`,
          }}
        >
          <video
            ref={videoRef}
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

      <button
        type="button"
        onClick={toggleVideo}
        aria-pressed={!isPlaying}
        aria-label={isPlaying ? "Pause background video" : "Play background video"}
        className="absolute bottom-6 right-6 z-[2] flex h-10 w-10 items-center justify-center rounded-full border border-rule-strong bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-black/60 focus-visible:outline-none focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/70"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      <div className="relative z-[2] w-full px-12 pb-[88px]">
        <h1 className="m-0 font-display text-[clamp(64px,13vw,180px)] font-extrabold leading-[0.86] tracking-[-0.01em] [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]">
          CHRIS SWIMZZ
        </h1>
      </div>
    </section>
  )
}
