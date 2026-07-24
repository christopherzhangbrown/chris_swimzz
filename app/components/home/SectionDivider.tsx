const WORDS = ["SWIM", "CONTENT", "COMMUNITY", "REPEAT"]

function MarqueeTrack() {
  return (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {WORDS.map((word) => (
        <span key={word} className="flex items-center gap-8">
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-bold tracking-[0.2em] text-white/40">
            {word}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
        </span>
      ))}
    </span>
  )
}

export default function SectionDivider() {
  return (
    <div className="overflow-hidden border-y border-white/10 py-4">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  )
}
