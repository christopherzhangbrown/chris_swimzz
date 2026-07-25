import Link from "next/link"
import Image from "next/image"
import { SiInstagram, SiTiktok, SiYoutube, SiFacebook } from "react-icons/si"
import { Reveal } from "@/app/components/motion/Reveal"

const socialLinks = [
  { label: "Instagram", Icon: SiInstagram, href: "https://www.instagram.com/chris_swimzz/" },
  { label: "TikTok", Icon: SiTiktok, href: "https://www.tiktok.com/@chris_swimzz" },
  { label: "YouTube", Icon: SiYoutube, href: "https://www.youtube.com/@Chris_swimzz" },
  { label: "Facebook", Icon: SiFacebook, href: "https://www.facebook.com/profile.php?id=61560790375196" },
]

export default function Footer() {
  return (
    <footer className="overflow-hidden px-6 pb-14 pt-12">
      <Reveal className="mx-auto max-w-[1280px]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="text-[13px] text-white/60">© 2026 Christopher Zhang. All rights reserved.</div>

          <div className="flex items-center gap-3">
            <Image
              src="/images/logos/logowhiteimg.png"
              alt=""
              width={72}
              height={72}
              className="h-[36px] w-auto [filter:brightness(0)_invert(1)]"
            />
            <span className="font-[family-name:var(--font-big-shoulders)] text-[15px] font-extrabold tracking-[0.06em]">
              CHRIS SWIMZZ
            </span>
          </div>

          <div className="flex gap-2.5">
            {socialLinks.map(({ label, Icon, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors duration-300 hover:border-white hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
