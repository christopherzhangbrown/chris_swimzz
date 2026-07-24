import { RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <RevealStagger className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-center">
          <RevealItem className="flex flex-col gap-4">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[20px]">
              <img
                src="/images/IMG_8018.JPG"
                alt="Chris mid-race at a swim meet"
                className="h-full w-full object-cover [filter:grayscale(1)_contrast(1.1)_brightness(0.9)]"
              />
            </div>
            <div className="aspect-[4/5] w-[55%] overflow-hidden rounded-[20px]">
              <img
                src="/images/medalpicoutlined.png"
                alt="Chris wearing a swim medal"
                className="h-full w-full object-cover object-top [filter:grayscale(1)_contrast(1.1)_brightness(0.9)]"
              />
            </div>
          </RevealItem>

          <RevealItem className="max-w-[640px]">
            <div className="relative mb-8">
              <GhostNumber number="01" />
              <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
                WHO I AM — 01
              </div>
              <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
                MY STORY
              </h2>
            </div>
            <div className="space-y-5 text-[16px] leading-[1.7] text-white/65">
              <p>
                I&apos;m a Division 1 swimmer at Brown University and content creator sharing swimming insights with 20K+
                followers.
              </p>
              <p>
                My swimming journey began 12 years ago in Charlotte, North Carolina. What started as a fun activity
                became a deep passion — swimming with Lifetime Swim and Ardrey Kell High School before taking it to the
                next level at Brown.
              </p>
              <p>
                It started simple: sharing race videos with friends on Instagram to save phone storage. Over time I
                realized people loved the real, behind-the-scenes journey of a D1 swimmer — so I kept going. Now
                swimming is more than a sport to me. It&apos;s a vehicle for growth, discipline, and community.
              </p>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
