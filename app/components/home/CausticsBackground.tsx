"use client"

import { useEffect, useState } from "react"

export default function CausticsBackground() {
  const [animated, setAnimated] = useState(true)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setAnimated(!query.matches)
    const handleChange = () => setAnimated(!query.matches)
    query.addEventListener("change", handleChange)
    return () => query.removeEventListener("change", handleChange)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.14] mix-blend-screen"
    >
      <svg className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <pattern id="caustics-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 8H16M8 0V16" stroke="#8fb8ff" strokeWidth="1" fill="none" />
          </pattern>
          <filter id="caustics-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.014"
              numOctaves="2"
              seed="7"
              result="noise"
            >
              {animated && (
                <animate
                  attributeName="baseFrequency"
                  values="0.009 0.014;0.014 0.009;0.009 0.014"
                  dur="26s"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="130"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="0.5" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#caustics-grid)" filter="url(#caustics-filter)" />
      </svg>
    </div>
  )
}
