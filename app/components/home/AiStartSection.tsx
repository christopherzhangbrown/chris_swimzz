import Image from "next/image"
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
import { ACTION_PRIMARY, ACTION_ARROW } from "@/app/components/ui/actions"
import GhostNumber from "./GhostNumber"

export default function AiStartSection() {
  return (
    <section id="ai-start" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="relative mb-10">
          <GhostNumber number="04" />
          <div className="relative z-10 mb-3.5 font-mono text-[12px] font-bold tracking-eyebrow text-ink-subtle">
            COMING SOON
          </div>
          <h2 className="relative z-10 m-0 font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none text-balance">
            SWIMVOLT
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-14">
          <RevealItem>
            <p className="mb-8 text-[16px] leading-[1.7] text-ink-muted">
              Film one racing start on your phone. SwimVolt reads it frame by frame and tells you
              what to change.
            </p>

            <a
              href="https://www.swimvolt.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group ${ACTION_PRIMARY}`}
            >
              JOIN WAITLIST
              <span aria-hidden="true" className={ACTION_ARROW}>
                →
              </span>
            </a>
          </RevealItem>

          <RevealItem>
            <div className="relative overflow-hidden rounded-[20px] border border-rule">
              <Image
                src="/images/swimvolt/pose-overlay.jpg"
                alt="Chris diving with SwimVolt pose tracking overlaid"
                width={946}
                height={450}
                className="h-auto w-full"
                priority
              />
              <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink px-3.5 py-1.5 font-mono text-label font-bold tracking-action text-ground">
                WAITLIST OPEN
              </div>
              <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ground/70 to-transparent px-6 pb-4 pt-10 text-center font-mono text-label font-medium tracking-eyebrow text-ink">
                FRAME-BY-FRAME START ANALYSIS
              </p>
            </div>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
