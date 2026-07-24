"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

type Video = {
  title: string
  views: string
  image: string
  href: string
}

export default function PopularContentCard({ video }: { video: Video }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-16, 16])

  return (
    <a
      ref={cardRef}
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(255,255,255,0.12)]"
    >
      <motion.div style={{ y }} className="absolute inset-[-8%] overflow-hidden">
        <img
          src={video.image}
          alt={video.title}
          className="h-full w-full object-cover [filter:grayscale(0.3)_contrast(1.05)] transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.9)_100%)]" />
      <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#08090b]/60">
        <div className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="mb-2 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-bold tracking-[0.12em] text-white/55">{video.views}</div>
        <div className="font-[family-name:var(--font-big-shoulders)] text-[22px] font-extrabold">
          {video.title}
        </div>
      </div>
    </a>
  )
}
