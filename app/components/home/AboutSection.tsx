import Image from "next/image"
import { RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <RevealStagger className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-start">
          <RevealItem>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px]">
              <Image
                src="/images/IMG_8018.JPG"
                alt="Chris mid-race at a swim meet"
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="object-cover [filter:grayscale(1)_contrast(1.1)_brightness(0.9)]"
              />
            </div>
          </RevealItem>

          <RevealItem className="max-w-[640px]">
            <div className="relative mb-8">
              <GhostNumber number="01" />
              <div className="relative z-10 mb-3.5 font-mono text-[12px] font-bold tracking-eyebrow text-ink-subtle">
                WHO I AM
              </div>
              <h2 className="relative z-10 m-0 font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
                MY STORY
              </h2>
            </div>
            <div className="space-y-5 text-[16px] leading-[1.7] text-ink-muted">
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
