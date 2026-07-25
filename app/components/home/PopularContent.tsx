import PopularContentCard from "./PopularContentCard"
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"

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
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="relative">
            <GhostNumber number="02" />
            <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
              MOST WATCHED
            </div>
            <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
              POPULAR CONTENT
            </h2>
          </div>
          <a
            href="https://www.instagram.com/chris_swimzz/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-white/35 pb-1 font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-bold tracking-[0.06em] text-white/80 transition-colors duration-300 hover:border-white hover:text-white"
          >
            VIEW ALL ON INSTAGRAM →
          </a>
        </Reveal>

        <RevealStagger className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
          {videos.map((video) => (
            <RevealItem key={video.title}>
              <PopularContentCard video={video} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
