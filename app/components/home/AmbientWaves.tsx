const WAVE_PATH = "M0,120 C240,180 480,60 720,120 C960,180 1200,60 1440,120 L1440,240 L0,240 Z"

function WavePath() {
  return (
    <svg viewBox="0 0 1440 240" preserveAspectRatio="none" className="h-full w-1/2 flex-shrink-0">
      <path d={WAVE_PATH} fill="#2f6bff" />
    </svg>
  )
}

function WaveBand({
  top,
  height,
  opacity,
  duration,
  reverse = false,
}: {
  top: string
  height: number
  opacity: number
  duration: string
  reverse?: boolean
}) {
  return (
    <div className="absolute left-0 w-full overflow-hidden blur-[48px]" style={{ top, height, opacity }}>
      <div
        className="animate-marquee motion-reduce:animate-none flex h-full w-[200%]"
        style={{ animationDuration: duration, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <WavePath />
        <WavePath />
      </div>
    </div>
  )
}

export default function AmbientWaves() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      <WaveBand top="18%" height={260} opacity={0.1} duration="46s" />
      <WaveBand top="46%" height={220} opacity={0.08} duration="60s" reverse />
      <WaveBand top="74%" height={220} opacity={0.07} duration="54s" />
    </div>
  )
}
