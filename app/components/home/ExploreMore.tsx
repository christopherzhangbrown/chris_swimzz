const items = [
  {
    title: "MY STORY",
    description: "The journey from Charlotte to Brown's pool deck — and why I started sharing it.",
    cta: "READ MORE →",
    href: "#about",
  },
  {
    title: "SPONSORS",
    description: "Nike Swim, SBR Sports, DripDrop, and more brands backing the journey.",
    cta: "SEE PARTNERS →",
    href: "#sponsors",
  },
  {
    title: "AI START ANALYZER",
    description: "AI-powered feedback on your dive start. Waitlist open now.",
    cta: "JOIN WAITLIST →",
    href: "#ai-start",
  },
  {
    title: "GET IN TOUCH",
    description: "Collabs, questions, partnerships — let's talk.",
    cta: "CONTACT →",
    href: "#contact",
  },
]

export default function ExploreMore() {
  return (
    <section className="px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-[#2f6bff]">
            GET INTO IT
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            EXPLORE MORE
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="flex min-h-[220px] flex-col gap-[18px] rounded-[20px] border border-white/[0.08] bg-white/[0.03] px-8 py-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2f6bff]/40 hover:bg-white/[0.05] hover:shadow-[0_20px_40px_rgba(47,107,255,0.2)]"
            >
              <div className="h-[3px] w-10 rounded-sm bg-[#2f6bff]" />
              <div className="font-[family-name:var(--font-big-shoulders)] text-[22px] font-extrabold">
                {item.title}
              </div>
              <div className="flex-1 text-[14px] leading-[1.6] text-white/55">{item.description}</div>
              <div className="text-[12px] font-bold tracking-[0.08em] text-white">{item.cta}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
