"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  distance = 20,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  distance?: number
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.6, ease: EASE, delay },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function RevealStagger({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
}) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : staggerDelay },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  distance = 20,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.6, ease: EASE },
    },
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
