# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate the dark editorial design from `design_handoff_homepage_redesign/` and collapse the site from five routes into one scrolling homepage with anchor-linked sections.

**Architecture:** `app/page.tsx` composes nine section components from a new `app/components/home/` directory. `Header`/`Footer` (rendered globally in `app/layout.tsx`) are restyled to the dark transparent/anchor-nav treatment. The four old route pages (`/about`, `/sponsors`, `/ai-start`, `/contact`) become one-line redirects to homepage anchors.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui (`Input`/`Textarea` only), `lucide-react`, `next/font/google`.

## Global Constraints

- Colors, type, spacing, and copy in `design_handoff_homepage_redesign/Homepage.dc.html` are final — match pixel values exactly (use Tailwind arbitrary values where the default scale doesn't hit the exact px/rem figure).
- Design tokens: background `#08090b`, foreground `#f5f6f7`, accent `#2f6bff` (hover `#1a55e6`), pill radius `100px` (`rounded-full`), card radius `20px` (`rounded-[20px]`), card border `rgba(255,255,255,0.08)`.
- Fonts: Big Shoulders Display (800/900 headings), Archivo (400–700 body), JetBrains Mono (500/700 labels) via `next/font/google` — replaces the current Poppins import.
- No new component libraries. Reuse `next/image`/`Image`-or-plain-`img` per existing pattern, `Link`, `lucide-react`, existing shadcn `Input`/`Textarea`.
- No changes to `/api/waitlist` route logic or the Formspree endpoint (`https://formspree.io/f/mjkorqbn`) — only the calling UI is restyled.
- No changes to sponsor data or the `hidden` visibility filter — only restyled.
- All image assets already exist under `public/images/` — no new assets.
- This repo has no test runner configured (no jest/vitest/playwright, `next.config.mjs` sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` to `true`). The verification step for each task is `npx tsc --noEmit` (fast type-check) plus, for visually significant tasks, a manual check in the browser via `npm run dev`. There is no unit test suite to add tests to.

---

### Task 1: Global theme — fonts and dark base styles

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: CSS custom properties `--font-big-shoulders`, `--font-archivo`, `--font-jetbrains-mono` available on `<body>`, consumed by every component in Tasks 2–12 via `font-[family-name:var(--font-big-shoulders)]` etc.

- [ ] **Step 1: Replace the font import and body classes in `app/layout.tsx`**

Replace the full file contents with:

```tsx
import type React from "react"
import type { Metadata } from "next"
import { Big_Shoulders_Display, Archivo, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"

const bigShoulders = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-big-shoulders",
})

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Chris Swimzz - D1 Swimmer & Content Creator",
  description:
    "Division 1 swimmer at Brown University sharing swimming insights and inspiring the next generation of swimmers.",
  generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bigShoulders.variable} ${archivo.variable} ${jetbrainsMono.variable} font-[family-name:var(--font-archivo)] antialiased`}
        suppressHydrationWarning={true}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Replace `app/globals.css` base layer with the dark theme and drop now-unused utility classes**

The classes `.gradient-text`, `.card-hover`, `.animate-fade-in`, `.animate-slide-up` are only used in `app/page.tsx`, `app/about/page.tsx`, `app/sponsors/page.tsx`, `app/ai-start/page.tsx`, `app/contact/page.tsx` — all of which are rewritten in later tasks. Replace the full file contents with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-[#08090b] text-[#f5f6f7];
  }

  ::selection {
    background: #2f6bff;
    color: #fff;
  }
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0). Existing pages will still reference `.gradient-text`/`.card-hover` at this point — that's fine, they're plain string class names, not type-checked, and get rewritten in later tasks.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "Switch homepage typography and base theme to dark editorial palette"
```

---

### Task 2: Redesign Header

**Files:**
- Modify: `app/components/Header.tsx`

**Interfaces:**
- Produces: fixed transparent header, 76px tall, rendered globally by `app/layout.tsx` (unchanged import). Nav links point to `/`, `/#about`, `/#sponsors`, `/#ai-start`, `/#contact` — consumed by Task 13's section `id` attributes (`about`, `sponsors`, `ai-start`, `contact`) which must match exactly.

- [ ] **Step 1: Replace `app/components/Header.tsx`**

```tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/#about" },
    { name: "SPONSORS", href: "/#sponsors" },
    { name: "AI START", href: "/#ai-start" },
    { name: "CONTACT", href: "/#contact" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logos/logowhiteimg.png"
              alt="Chris Swimzz"
              className="h-8 w-auto [filter:brightness(0)_invert(1)]"
            />
            <span className="font-[family-name:var(--font-big-shoulders)] text-[15px] font-extrabold tracking-[0.08em] text-white">
              CHRIS SWIMZZ
            </span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[13px] font-semibold tracking-[0.04em] transition-colors duration-200 ${
                  item.name === "HOME" ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            className="p-2 text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed left-0 right-0 top-[76px] border-b border-white/10 bg-[#08090b]/95 backdrop-blur-sm">
            <nav className="space-y-4 px-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-[13px] font-semibold tracking-[0.04em] text-white/70 transition-colors duration-200 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/Header.tsx
git commit -m "Redesign Header as dark transparent anchor nav"
```

---

### Task 3: Redesign Footer

**Files:**
- Modify: `app/components/Footer.tsx`

**Interfaces:**
- Produces: dark footer rendered globally by `app/layout.tsx` (unchanged import).

- [ ] **Step 1: Replace `app/components/Footer.tsx`**

```tsx
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
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/20 text-[11px] font-bold text-white/60 transition-colors duration-300 hover:border-[#2f6bff] hover:text-[#2f6bff]"
            >
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "Redesign Footer as dark circular social icon band"
```

---

### Task 4: Hero section

**Files:**
- Create: `app/components/home/HeroSection.tsx`

**Interfaces:**
- Produces: `export default function HeroSection(): JSX.Element` — no props. Consumed by Task 13 (`app/page.tsx`).

- [ ] **Step 1: Create `app/components/home/HeroSection.tsx`**

```tsx
"use client"

import { useState } from "react"

export default function HeroSection() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setPos({ x, y })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div
          className="absolute inset-0 h-full w-full transition-transform duration-[250ms] ease-out"
          style={{
            transform: `scale(1.08) translate(${pos.x * -10}px, ${pos.y * -10}px)`,
          }}
        >
          <img
            src="/images/blackwhitebrownborder.png"
            alt="Chris Zhang"
            className="h-full w-full object-cover object-[50%_30%] [filter:grayscale(1)_contrast(1.1)_brightness(0.9)]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,9,11,0.35)_0%,transparent_30%,transparent_55%,#08090b_100%)]" />
      </div>

      <div className="relative z-[2] w-full px-12 pb-[88px]">
        <h1 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(64px,13vw,180px)] font-extrabold leading-[0.86] tracking-[-0.01em] [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]">
          CHRIS SWIMZZ
        </h1>
        <div className="mt-6">
          <a
            href="https://www.instagram.com/chris_swimzz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border-b border-white/40 pb-1.5 text-[14px] font-bold tracking-[0.03em] text-white transition-colors duration-300 hover:border-[#2f6bff] hover:text-[#2f6bff]"
          >
            WATCH ON INSTAGRAM →
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/home/HeroSection.tsx
git commit -m "Add dark hero section with mouse parallax"
```

---

### Task 5: Stat band

**Files:**
- Create: `app/components/home/StatBand.tsx`

**Interfaces:**
- Produces: `export default function StatBand(): JSX.Element` — no props. Consumed by Task 13.

- [ ] **Step 1: Create `app/components/home/StatBand.tsx`**

Note: in the reference, followers and views render with a `K` suffix (`{{ followersDisplay }}K+`) but years does not (`{{ yearsDisplay }}+`) — the code below matches that exactly.

```tsx
"use client"

import { useEffect, useRef, useState } from "react"

export default function StatBand() {
  const sectionRef = useRef<HTMLElement>(null)
  const startedRef = useRef(false)
  const [followers, setFollowers] = useState(0)
  const [views, setViews] = useState(0)
  const [years, setYears] = useState(0)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            animateStats()
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const animateStats = () => {
    const duration = 1400
    const start = performance.now()
    const targets = { followers: 20, views: 620, years: 12 }

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - t, 3)
      setFollowers(Math.round(targets.followers * ease))
      setViews(Math.round(targets.views * ease))
      setYears(Math.round(targets.years * ease))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  return (
    <section ref={sectionRef} className="px-6 pb-[88px] pt-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 text-center">
        <div>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white [text-shadow:0_0_24px_rgba(47,107,255,0.3)]">
            {followers}K<span className="text-[#2f6bff]">+</span>
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/60">
            INSTAGRAM FOLLOWERS
          </div>
        </div>
        <div>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white [text-shadow:0_0_24px_rgba(47,107,255,0.3)]">
            {views}K<span className="text-[#2f6bff]">+</span>
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/50">
            TOTAL VIEWS ACROSS TOP CLIPS
          </div>
        </div>
        <div>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white [text-shadow:0_0_24px_rgba(47,107,255,0.3)]">
            {years}<span className="text-[#2f6bff]">+</span>
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/50">
            YEARS COMPETITIVE SWIMMING
          </div>
        </div>
        <div>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white [text-shadow:0_0_24px_rgba(47,107,255,0.3)]">
            D1
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/50">
            BROWN UNIVERSITY
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/home/StatBand.tsx
git commit -m "Add animated stat band with scroll-triggered count-up"
```

---

### Task 6: Popular Content section

**Files:**
- Create: `app/components/home/PopularContent.tsx`

**Interfaces:**
- Produces: `export default function PopularContent(): JSX.Element` — no props. Consumed by Task 13.

- [ ] **Step 1: Create `app/components/home/PopularContent.tsx`**

```tsx
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
            <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-[#2f6bff]">
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
            className="border-b border-white/35 pb-1 text-[14px] font-bold tracking-[0.03em] text-white transition-colors duration-300 hover:border-[#2f6bff] hover:text-[#2f6bff]"
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
              className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(47,107,255,0.25)]"
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
                <div className="mb-2 text-[11px] font-bold tracking-[0.12em] text-[#2f6bff]">{video.views}</div>
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/home/PopularContent.tsx
git commit -m "Add Popular Content video grid section"
```

---

### Task 7: Explore More section

**Files:**
- Create: `app/components/home/ExploreMore.tsx`

**Interfaces:**
- Produces: `export default function ExploreMore(): JSX.Element` — no props. Consumed by Task 13. Links to `#about`, `#sponsors`, `#ai-start`, `#contact` must match the `id` attributes produced by Tasks 8–11.

- [ ] **Step 1: Create `app/components/home/ExploreMore.tsx`**

```tsx
const items = [
  {
    title: "MY STORY",
    description: "The journey from Charlotte to Brown's pool deck — and why I started sharing it.",
    cta: "READ MORE →",
    href: "#about",
  },
  {
    title: "SPONSORS",
    description: "Nike Swim, SBR Sports, DripDrop, and more brands backing the journey.",
    cta: "SEE PARTNERS →",
    href: "#sponsors",
  },
  {
    title: "AI START ANALYZER",
    description: "AI-powered feedback on your dive start. Waitlist open now.",
    cta: "JOIN WAITLIST →",
    href: "#ai-start",
  },
  {
    title: "GET IN TOUCH",
    description: "Collabs, questions, partnerships — let's talk.",
    cta: "CONTACT →",
    href: "#contact",
  },
]

export default function ExploreMore() {
  return (
    <section className="px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-[#2f6bff]">
            GET INTO IT
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            EXPLORE MORE
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="flex min-h-[220px] flex-col gap-[18px] rounded-[20px] border border-white/[0.08] bg-white/[0.03] px-8 py-10 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2f6bff]/40 hover:bg-white/[0.05] hover:shadow-[0_20px_40px_rgba(47,107,255,0.2)]"
            >
              <div className="h-[3px] w-10 rounded-sm bg-[#2f6bff]" />
              <div className="font-[family-name:var(--font-big-shoulders)] text-[22px] font-extrabold">
                {item.title}
              </div>
              <div className="flex-1 text-[14px] leading-[1.6] text-white/55">{item.description}</div>
              <div className="text-[12px] font-bold tracking-[0.08em] text-white">{item.cta}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/home/ExploreMore.tsx
git commit -m "Add Explore More in-page quick-jump section"
```

---

### Task 8: My Story (About) section

**Files:**
- Create: `app/components/home/AboutSection.tsx`

**Interfaces:**
- Produces: `export default function AboutSection(): JSX.Element`, renders `<section id="about">`. Consumed by Task 13. The `id="about"` must match `ExploreMore`'s `href="#about"`, `Header`'s `/#about` link, and Task 14's redirect target.

- [ ] **Step 1: Create `app/components/home/AboutSection.tsx`**

```tsx
const tags = [
  "D1 SWIMMING",
  "CONTENT CREATION",
  "PERFORMANCE ANALYSIS",
  "COACHING",
  "EXCELLENCE",
  "EDUCATION",
  "AUTHENTICITY",
  "COMMUNITY",
]

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-[#2f6bff]">
            WHO I AM
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            MY STORY
          </h2>
        </div>

        <div className="max-w-[720px] space-y-5 text-[16px] leading-[1.7] text-white/65">
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

        <div className="mt-10 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] px-4 py-2 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.1em] text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/home/AboutSection.tsx
git commit -m "Add condensed My Story section"
```

---

### Task 9: Sponsors section

**Files:**
- Create: `app/components/home/SponsorsSection.tsx`

**Interfaces:**
- Produces: `export default function SponsorsSection(): JSX.Element`, renders `<section id="sponsors">`. Consumed by Task 13. The `id="sponsors"` must match `ExploreMore`'s `href="#sponsors"`, `Header`'s `/#sponsors` link, and Task 14's redirect target.

- [ ] **Step 1: Create `app/components/home/SponsorsSection.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/home/SponsorsSection.tsx
git commit -m "Add Sponsors section with dark card grid"
```

---

### Task 10: AI Start Analyzer section

**Files:**
- Create: `app/components/home/AiStartSection.tsx`

**Interfaces:**
- Consumes: `Input` from `@/components/ui/input` (existing component, unchanged).
- Produces: `export default function AiStartSection(): JSX.Element`, renders `<section id="ai-start">`. Consumed by Task 13. The `id="ai-start"` must match `ExploreMore`'s `href="#ai-start"`, `Header`'s `/#ai-start` link, and Task 14's redirect target. Posts to the existing `/api/waitlist` route — unchanged request/response contract (`{ email }` → `{ ok, error? }`).

- [ ] **Step 1: Create `app/components/home/AiStartSection.tsx`**

```tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function AiStartSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.ok) {
        setIsSubmitted(true)
        setEmail("")
      } else {
        setError(data.error || "Submission failed. Please try again.")
      }
    } catch {
      setError("Submission failed. Please try again.")
    }
  }

  return (
    <section id="ai-start" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-[#2f6bff]">
            COMING SOON
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            AI START ANALYZER
          </h2>
        </div>

        <div className="max-w-[520px]">
          <p className="mb-6 text-[16px] leading-[1.7] text-white/65">
            AI-powered feedback on your dive start, in seconds. Waitlist open now — be first to try it.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-[52px] w-full rounded-full border-white/[0.15] bg-white/[0.03] px-5 text-white placeholder:text-white/40 focus-visible:ring-[#2f6bff]"
              />
              <button
                type="submit"
                className="h-[52px] shrink-0 rounded-full bg-[#2f6bff] px-8 text-[14px] font-bold tracking-[0.03em] text-white transition-colors duration-300 hover:bg-[#1a55e6]"
              >
                JOIN WAITLIST →
              </button>
            </form>
          ) : (
            <p className="text-[14px] font-bold tracking-[0.03em] text-[#2f6bff]">
              You&apos;re on the list — we&apos;ll email you when it&apos;s ready.
            </p>
          )}
          {error && <p className="mt-3 text-[13px] text-red-400">{error}</p>}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/home/AiStartSection.tsx
git commit -m "Add AI Start Analyzer waitlist section"
```

---

### Task 11: Contact section

**Files:**
- Create: `app/components/home/ContactSection.tsx`

**Interfaces:**
- Consumes: `Input`, `Textarea` from `@/components/ui/input` and `@/components/ui/textarea` (existing components, unchanged).
- Produces: `export default function ContactSection(): JSX.Element`, renders `<section id="contact">`. Consumed by Task 13. The `id="contact"` must match `ExploreMore`'s `href="#contact"`, `Header`'s `/#contact` link, and Task 14's redirect target. Posts to the existing Formspree endpoint `https://formspree.io/f/mjkorqbn` — unchanged.

- [ ] **Step 1: Create `app/components/home/ContactSection.tsx`**

```tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    try {
      const res = await fetch("https://formspree.io/f/mjkorqbn", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.ok) {
        setSuccess(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setError("Submission failed. Please try again.")
      }
    } catch {
      setError("Submission failed. Please try again.")
    }
  }

  return (
    <section id="contact" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-[#2f6bff]">
            LET&apos;S TALK
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            GET IN TOUCH
          </h2>
        </div>

        <div className="max-w-[560px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="h-[52px] w-full rounded-full border-white/[0.15] bg-white/[0.03] px-5 text-white placeholder:text-white/40 focus-visible:ring-[#2f6bff]"
            />
            <Input
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="h-[52px] w-full rounded-full border-white/[0.15] bg-white/[0.03] px-5 text-white placeholder:text-white/40 focus-visible:ring-[#2f6bff]"
            />
            <Textarea
              name="message"
              placeholder="Tell me about your inquiry, collaboration idea, or just say hello!"
              required
              value={formData.message}
              onChange={handleChange}
              className="min-h-[120px] w-full rounded-[20px] border-white/[0.15] bg-white/[0.03] px-5 py-4 text-white placeholder:text-white/40 focus-visible:ring-[#2f6bff]"
            />
            <button
              type="submit"
              className="h-[52px] w-full rounded-full bg-[#2f6bff] text-[14px] font-bold tracking-[0.03em] text-white transition-colors duration-300 hover:bg-[#1a55e6] sm:w-auto sm:px-8"
            >
              SEND MESSAGE →
            </button>
            {success && <p className="text-[13px] text-[#2f6bff]">Message sent! I&apos;ll get back to you soon.</p>}
            {error && <p className="text-[13px] text-red-400">{error}</p>}
          </form>

          <p className="mt-8 text-[14px] text-white/50">
            For sponsorships &amp; business inquiries:{" "}
            <a href="mailto:chrisswimzzinquires@gmail.com" className="text-white hover:text-[#2f6bff]">
              chrisswimzzinquires@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/home/ContactSection.tsx
git commit -m "Add condensed Contact section with working Formspree submission"
```

---

### Task 12: CTA band

**Files:**
- Create: `app/components/home/CtaBand.tsx`

**Interfaces:**
- Produces: `export default function CtaBand(): JSX.Element` — no props. Consumed by Task 13. Links to `#about` — must match Task 8's `id="about"`.

- [ ] **Step 1: Create `app/components/home/CtaBand.tsx`**

```tsx
export default function CtaBand() {
  return (
    <section className="px-6 py-[120px]">
      <div className="mx-auto max-w-[800px] text-center">
        <h2 className="m-0 mb-6 font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,5vw,64px)] font-extrabold leading-none">
          DIVE INTO THE COMMUNITY
        </h2>
        <p className="mx-auto mb-10 max-w-[560px] text-[18px] leading-[1.6] text-white/65">
          New race breakdowns and training content posted weekly. Join 20,000+ swimmers following along.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.instagram.com/chris_swimzz/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#2f6bff] px-8 py-[17px] text-[14px] font-bold tracking-[0.03em] text-white transition-colors duration-300 hover:bg-[#1a55e6]"
          >
            FOLLOW ON INSTAGRAM →
          </a>
          <a
            href="#about"
            className="rounded-full border border-white/35 px-8 py-[17px] text-[14px] font-bold tracking-[0.03em] text-white transition-colors duration-300 hover:border-white"
          >
            READ MY STORY
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Commit**

```bash
git add app/components/home/CtaBand.tsx
git commit -m "Add community CTA band"
```

---

### Task 13: Compose the homepage

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `HeroSection`, `StatBand`, `PopularContent`, `ExploreMore`, `AboutSection`, `SponsorsSection`, `AiStartSection`, `ContactSection`, `CtaBand` — all default exports from Tasks 4–12, no props on any of them.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import HeroSection from "./components/home/HeroSection"
import StatBand from "./components/home/StatBand"
import PopularContent from "./components/home/PopularContent"
import ExploreMore from "./components/home/ExploreMore"
import AboutSection from "./components/home/AboutSection"
import SponsorsSection from "./components/home/SponsorsSection"
import AiStartSection from "./components/home/AiStartSection"
import ContactSection from "./components/home/ContactSection"
import CtaBand from "./components/home/CtaBand"

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#08090b] text-[#f5f6f7]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[8%] -top-[5%] h-[38%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.16),transparent_65%)] blur-[10px]" />
        <div className="absolute -right-[12%] top-[12%] h-[34%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.12),transparent_65%)] blur-[10px]" />
        <div className="absolute -left-[10%] top-[38%] h-[30%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.09),transparent_65%)] blur-[10px]" />
        <div className="absolute -right-[10%] top-[58%] h-[36%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(80,140,255,0.13),transparent_65%)] blur-[10px]" />
        <div className="absolute left-[8%] top-[82%] h-[34%] w-[56%] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.14),transparent_65%)] blur-[10px]" />
      </div>

      <HeroSection />
      <StatBand />
      <PopularContent />
      <ExploreMore />
      <AboutSection />
      <SponsorsSection />
      <AiStartSection />
      <ContactSection />
      <CtaBand />
    </div>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 3: Full build check**

Run: `npm run build`
Expected: build completes successfully (exit code 0). This is the first point where every new file is wired together — if any import path or JSX is wrong, this will surface it even though `next.config.mjs` ignores type/lint errors (it does not ignore hard build/syntax failures).

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000` in a browser. Confirm: hero renders full-bleed with parallax on mousemove, stat numbers count up when scrolled into view, all sections render in order, nav anchor links scroll to the right section without the fixed header covering the section heading.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "Compose homepage from redesigned sections"
```

---

### Task 14: Redirect legacy routes to homepage anchors

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/sponsors/page.tsx`
- Modify: `app/ai-start/page.tsx`
- Modify: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `redirect` from `next/navigation`.

- [ ] **Step 1: Replace `app/about/page.tsx`**

```tsx
import { redirect } from "next/navigation"

export default function AboutPage() {
  redirect("/#about")
}
```

- [ ] **Step 2: Replace `app/sponsors/page.tsx`**

```tsx
import { redirect } from "next/navigation"

export default function SponsorsPage() {
  redirect("/#sponsors")
}
```

- [ ] **Step 3: Replace `app/ai-start/page.tsx`**

```tsx
import { redirect } from "next/navigation"

export default function AiStartPage() {
  redirect("/#ai-start")
}
```

- [ ] **Step 4: Replace `app/contact/page.tsx`**

```tsx
import { redirect } from "next/navigation"

export default function ContactPage() {
  redirect("/#contact")
}
```

- [ ] **Step 5: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no output (exit code 0).

- [ ] **Step 6: Manual verification**

Run: `npm run dev`, visit `http://localhost:3000/about`, `/sponsors`, `/ai-start`, `/contact` in a browser. Confirm each redirects to `/` and scrolls to the matching section.

- [ ] **Step 7: Commit**

```bash
git add app/about/page.tsx app/sponsors/page.tsx app/ai-start/page.tsx app/contact/page.tsx
git commit -m "Redirect legacy routes to homepage anchor sections"
```

---

### Task 15: Full visual QA pass against the reference

**Files:** none (verification-only task; fixes go into whichever file needs them).

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (leave running)

- [ ] **Step 2: Compare against the reference**

Open `http://localhost:3000` in a browser alongside `design_handoff_homepage_redesign/Homepage.dc.html` (open directly in a second browser tab) and `design_handoff_homepage_redesign/screenshots/01-homepage.png` through `04-homepage.png`. Check, top to bottom:
- Header: transparent, sits over hero, nav items and spacing match
- Hero: wordmark size/position, parallax responds to mouse movement, gradient overlay legibility
- Stat band: numbers animate from 0 on first scroll into view, don't re-trigger on repeated scroll
- Popular Content: 3 cards, hover lift + glow + image zoom, links open Instagram in new tab
- Explore More: 4 cards, hover states, each scrolls to the right section
- My Story / Sponsors / AI Start Analyzer / Get In Touch: readable, consistent with the dark card language, forms are usable (don't need to complete a real submission — just confirm the UI renders and accepts input)
- CTA band and Footer: match spacing, hover states on social icons

- [ ] **Step 3: Check mobile**

Resize the browser (or use device emulation) to a ~375px-wide viewport. Confirm the hamburger menu opens/closes, all sections remain readable, no horizontal scroll appears.

- [ ] **Step 4: Fix any mismatches found**

If a mismatch is found, edit the relevant component file from Tasks 2–13 directly (don't create new files) and re-check in the browser.

- [ ] **Step 5: Final full build**

Run: `npm run build`
Expected: build completes successfully (exit code 0).

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "Fix visual QA issues from full homepage review"
```

Only run this step if Step 4 actually changed files — skip if the QA pass found nothing to fix.
