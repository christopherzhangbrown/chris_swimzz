export default function CtaBand() {
  return (
    <section className="px-6 py-[120px]">
      <div className="mx-auto max-w-[800px] text-center">
        <h2 className="m-0 mb-6 font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,5vw,64px)] font-extrabold leading-none">
          DIVE INTO THE COMMUNITY
        </h2>
        <p className="mx-auto mb-10 max-w-[560px] text-[18px] leading-[1.6] text-white/65">
          New race breakdowns and training content posted weekly. Join 20,000+ swimmers following along.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.instagram.com/chris_swimzz/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-8 py-[17px] text-[14px] font-bold tracking-[0.03em] text-[#08090b] transition-colors duration-300 hover:bg-white/85"
          >
            FOLLOW ON INSTAGRAM →
          </a>
          <a
            href="#about"
            className="rounded-full border border-white/35 px-8 py-[17px] text-[14px] font-bold tracking-[0.03em] text-white transition-colors duration-300 hover:border-white"
          >
            READ MY STORY
          </a>
        </div>
      </div>
    </section>
  )
}
