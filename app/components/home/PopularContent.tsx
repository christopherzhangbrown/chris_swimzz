const videos = [
  {
    title: "DAY IN THE LIFE",
    views: "230K VIEWS",
    image: "/images/DayInTheLife.png",
    href: "https://www.instagram.com/stories/highlights/18035038568011095/",
  },
  {
    title: "TOP TIPS",
    views: "253K VIEWS",
    image: "/images/TopTips.png",
    href: "https://www.instagram.com/stories/highlights/18036885218433292/",
  },
  {
    title: "BRUTALLY HONEST RACE ANALYSIS",
    views: "137K VIEWS",
    image: "/images/BHRA.png",
    href: "https://www.instagram.com/stories/highlights/18084130924583838/",
  },
]

export default function PopularContent() {
  return (
    <section className="px-6 pb-[100px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
              MOST WATCHED
            </div>
            <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
              POPULAR CONTENT
            </h2>
          </div>
          <a
            href="https://www.instagram.com/chris_swimzz/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-white/35 pb-1 text-[14px] font-bold tracking-[0.03em] text-white/80 transition-colors duration-300 hover:border-white hover:text-white"
          >
            VIEW ALL ON INSTAGRAM →
          </a>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
          {videos.map((video) => (
            <a
              key={video.title}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(255,255,255,0.12)]"
            >
              <img
                src={video.image}
                alt={video.title}
                className="h-full w-full object-cover [filter:grayscale(0.3)_contrast(1.05)] transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.9)_100%)]" />
              <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#08090b]/60">
                <div className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <div className="mb-2 text-[11px] font-bold tracking-[0.12em] text-white/55">{video.views}</div>
                <div className="font-[family-name:var(--font-big-shoulders)] text-[22px] font-extrabold">
                  {video.title}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
