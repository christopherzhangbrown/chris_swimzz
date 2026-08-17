"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

export default function GhostNumber({ number }: { number: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-24, 24])

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      aria-hidden="true"
      className="pointer-events-none absolute -top-8 left-0 -z-10 select-none font-display text-[clamp(120px,20vw,280px)] font-extrabold leading-none text-white/[0.04]"
    >
      {number}
    </motion.div>
  )
}
