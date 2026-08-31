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
              <h2 className="relative z-10 m-0 font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none text-balance">
                MY STORY
              </h2>
            </div>
            <div className="max-w-[560px] space-y-5 text-[16px] leading-[1.7] text-ink-muted">
              <p>
                I&apos;m a Division 1 swimmer at Brown. I&apos;ve been swimming for twelve years, starting in Charlotte
                with Lifetime Swim.
              </p>
              <p>
                The Chris Swimzz account started off as storage for my races. I&apos;d post them so I could clear them
                off my phone. Then one day I decided to try making something real out of it, and I kept going. It&apos;s
                at 20K followers now. These days I show the whole thing: what it actually takes to swim D1 at Brown,
                keep up with school, and build an app called SwimVolt.
              </p>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
