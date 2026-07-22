import Image from "next/image"

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
        <div className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-[#2f6bff]">
            WHO BACKS THE JOURNEY
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            SPONSORS
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {visibleSponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex flex-col gap-4 rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2f6bff]/40 hover:shadow-[0_20px_40px_rgba(47,107,255,0.2)]"
            >
              <div className="flex h-16 items-center rounded-lg bg-white p-4">
                <Image
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  width={160}
                  height={64}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="font-[family-name:var(--font-big-shoulders)] text-[20px] font-extrabold">
                {sponsor.name}
              </div>
              <div className="text-[12px] font-medium tracking-[0.08em] text-white/50">
                {sponsor.category.toUpperCase()}
              </div>
              {sponsor.code && (
                <div className="text-[12px] font-bold tracking-[0.05em] text-[#2f6bff]">
                  CODE {sponsor.code} — {sponsor.codeDescription}
                </div>
              )}
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-[12px] font-bold tracking-[0.08em] text-white"
              >
                VISIT SITE →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
