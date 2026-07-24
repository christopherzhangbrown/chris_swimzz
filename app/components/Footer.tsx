import Link from "next/link"

const socialLinks = [
  { label: "IG", href: "https://www.instagram.com/chris_swimzz/" },
  { label: "TT", href: "https://www.tiktok.com/@chris_swimzz" },
  { label: "YT", href: "https://www.youtube.com/@Chris_swimzz" },
  { label: "FB", href: "https://www.facebook.com/profile.php?id=61560790375196" },
]

export default function Footer() {
  return (
    <footer className="px-6 pb-14 pt-12">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
        <div className="text-[13px] text-white/40">© 2026 Christopher Zhang. All rights reserved.</div>

        <div className="flex items-center gap-2.5">
          <img
            src="/images/logos/logowhiteimg.png"
            alt=""
            className="h-[22px] w-auto [filter:brightness(0)_invert(1)]"
          />
          <span className="font-[family-name:var(--font-big-shoulders)] text-[13px] font-extrabold tracking-[0.06em]">
            CHRIS SWIMZZ
          </span>
        </div>

        <div className="flex gap-2.5">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/20 text-[11px] font-bold text-white/60 transition-colors duration-300 hover:border-white hover:text-white"
            >
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
