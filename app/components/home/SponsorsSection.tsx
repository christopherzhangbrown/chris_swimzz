import Image from "next/image"
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
import GhostNumber from "./GhostNumber"

const sponsors = [
  {
    name: "Nike Swim",
    logo: "/images/Sponsors/nikeswimlogo.png",
    category: "Swimwear",
    website: "https://www.nike.com/",
    code: null as string | null,
    codeDescription: null as string | null,
    hidden: false,
  },
  {
    name: "Arena",
    logo: "/images/Sponsors/Arena_(Unternehmen)_logo.svg",
    category: "Swimwear",
    website: "https://www.arenasport.com/en_us/",
    code: "amb-chris-discount",
    codeDescription: "10% off all products",
    hidden: true,
  },
  {
    name: "Cal AI",
    logo: "/images/Sponsors/calAIrectangle.svg",
    category: "Technology",
    website: "https://apps.apple.com/us/app/cal-ai-calorie-tracker/id6480417616",
    code: "CHRISSWIMZZ",
    codeDescription: "3 days free trial",
    hidden: true,
  },
  {
    name: "SBR Sports",
    logo: "/images/Sponsors/SBR_logo_2e216e6c-8a4d-459a-bb69-10131f6e384a.webp",
    category: "Performance",
    website: "https://www.sbrsportsinc.com/?sca_ref=7937126.heHPWDBAqKvozy4",
    code: "CHRISSWIMZZ",
    codeDescription: "20% off all products",
    hidden: false,
  },
  {
    name: "Feed The Cheeks",
    logo: "/images/Sponsors/LOGO_WEBSITE_f7915b30-5928-4c9f-8018-d2b3ed5ed100.webp",
    category: "Nutrition",
    website: "https://www.feedthecheeks.com/",
    code: null as string | null,
    codeDescription: null as string | null,
    hidden: true,
  },
  {
    name: "Block Cancer",
    logo: "/images/Sponsors/BC+PNG.png",
    category: "Charity",
    website: "https://www.blockcancer.co/?srsltid=AfmBOoolzCyO9CAzq2K_efoj5YG3e_3TNvcOtoagxlN3I59ddmfUDdY1",
    code: null as string | null,
    codeDescription: null as string | null,
    hidden: true,
  },
  {
    name: "Honey Stinger",
    logo: "/images/Sponsors/honey-stinger-logo.png",
    category: "Nutrition",
    website: "https://honeystinger.rfrl.co/ex47z",
    code: null as string | null,
    codeDescription: null as string | null,
    hidden: true,
  },
  {
    name: "DripDrop",
    logo: "/images/Sponsors/dripdroplogo.png",
    category: "Hydration",
    website: "https://dripdrop.com/CHRISSWIMZZ",
    code: "CHRISSWIMZZ",
    codeDescription: "20% off all products",
    hidden: false,
  },
]

export default function SponsorsSection() {
  const visibleSponsors = sponsors.filter((sponsor) => !sponsor.hidden)

  return (
    <section id="sponsors" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="relative mb-14">
          <GhostNumber number="03" />
          <div className="relative z-10 mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            WHO BACKS THE JOURNEY
          </div>
          <h2 className="relative z-10 m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            SPONSORS
          </h2>
        </Reveal>

        <RevealStagger staggerDelay={0.08}>
          {visibleSponsors.map((sponsor, index) => (
            <RevealItem key={sponsor.name}>
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-8 border-b border-white/[0.08] py-10 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div aria-hidden="true" className="w-12 shrink-0 font-[family-name:var(--font-jetbrains-mono)] text-[16px] font-bold tracking-[0.04em] text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex h-16 w-44 shrink-0 items-center">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={220}
                    height={90}
                    className="h-full w-auto object-contain object-left [filter:brightness(0)_invert(1)] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-[family-name:var(--font-big-shoulders)] text-[32px] font-extrabold uppercase leading-none tracking-[0.01em]">
                    {sponsor.name}
                  </div>
                  {sponsor.code && (
                    <div className="mt-2 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.04em] text-white/50">
                      CODE {sponsor.code} — {sponsor.codeDescription}
                    </div>
                  )}
                </div>
                <div className="shrink-0 font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-bold tracking-[0.08em] text-white/40 transition-colors duration-300 group-hover:text-white">
                  VISIT →
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
