# Homepage Motion & Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the bottom half of the homepage (About, Sponsors, Contact, Footer) its own visual identity instead of the repeated "eyebrow + heading + rounded card" pattern, add scroll-driven motion across the whole page via Framer Motion, cut the redundant Explore More section, and pull AI Start off the homepage until that feature is ready.

**Architecture:** A small shared motion primitives module (`Reveal`/`RevealStagger`/`RevealItem`) built on Framer Motion's `whileInView` is applied across existing sections. Three sections get structural rewrites (About → photo collage + text, Sponsors → divided list, page flow → Explore More removed / marquee divider added / AI Start removed). Everything else keeps its current markup and just gets the motion wrapper added.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v3, Framer Motion (new dependency).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-24-homepage-motion-redesign-design.md` — read it before starting if anything below is ambiguous.
- No color/font changes: stay on `#08090b` / `#f5f6f7`, Big Shoulders Display (headings), JetBrains Mono (eyebrow labels), Archivo (body).
- Only new dependency: `framer-motion` (no GSAP/Lenis).
- All new/changed motion must respect `prefers-reduced-motion` (Framer Motion's `useReducedMotion()` for JS-driven motion; Tailwind's `motion-reduce:` variant for pure-CSS motion).
- Package manager is `pnpm` (see `engines` in `package.json`: `pnpm 10.x`, `node >=22.x`).
- Hero section (`app/components/home/HeroSection.tsx`) is not touched by this plan.
- **This repo has no test framework** (`package.json` has no `test` script, no Jest/Vitest/Playwright). This is a marketing site with no existing test harness, so adding one is out of scope (YAGNI) for a visual redesign. "Verification" in every task below means: (a) `pnpm exec tsc --noEmit` for type safety, and (b) a manual check in a running dev server (`pnpm dev`, http://localhost:3000) using the browser, per the specific checklist in that task's steps. This replaces the write-test/run-test steps you'd normally see in this plan format.
- Asset note: during file-structure mapping, `public/images/blackwhitebrown.png` was found to be the *same photo* as the Hero's poster image (`blackwhitebrownborder.png`, just without the black border). It is intentionally **not** reused in the About section (Task 4) to avoid duplicating the hero's imagery — About uses `IMG_8018.JPG` and `medalpicoutlined.png` instead, both otherwise-unused personal photos.

---

### Task 1: Motion primitives + Framer Motion install + StatBand integration

**Files:**
- Modify: `package.json` (add `framer-motion` dependency)
- Create: `app/components/motion/Reveal.tsx`
- Modify: `app/components/home/StatBand.tsx`

**Interfaces:**
- Produces (used by every later task): from `@/app/components/motion/Reveal`:
  - `Reveal({ children, className?, distance?: number, delay?: number })` — single element, fades + slides up once when ~30% in view.
  - `RevealStagger({ children, className?, staggerDelay?: number })` — parent wrapper; direct `RevealItem` children animate in sequence.
  - `RevealItem({ children, className?, distance?: number })` — must be a direct child of `RevealStagger`.
  - All three are client components (`"use client"` internally) and can be imported directly into server components.

- [ ] **Step 1: Install Framer Motion**

```bash
pnpm add framer-motion
```

Expected: `package.json` gains a `"framer-motion": "^12.x.x"` line under `dependencies`, `pnpm-lock.yaml` updates.

- [ ] **Step 2: Create the motion primitives**

Create `app/components/motion/Reveal.tsx`:

```tsx
"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  distance = 20,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  distance?: number
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.6, ease: EASE, delay },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function RevealStagger({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
}) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : staggerDelay },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  distance = 20,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.01 : 0.6, ease: EASE },
    },
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Apply to StatBand**

Modify `app/components/home/StatBand.tsx`. Add the import (after the existing `"use client"` + React imports):

```tsx
import { RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
```

Replace the return statement's grid container and its four stat `<div>`s (currently plain `<div>`s) so the outer grid becomes `RevealStagger` and each stat becomes a `RevealItem`, keeping every existing class and all existing JSX content inside each stat unchanged:

```tsx
  return (
    <section ref={sectionRef} className="px-6 pb-[88px] pt-16">
      <RevealStagger className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 text-center">
        <RevealItem>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white">
            {followers}K<span className="text-white/40">+</span>
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/60">
            INSTAGRAM FOLLOWERS
          </div>
        </RevealItem>
        <RevealItem>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white">
            {views}K<span className="text-white/40">+</span>
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/50">
            TOTAL VIEWS ACROSS TOP CLIPS
          </div>
        </RevealItem>
        <RevealItem>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white">
            {years}<span className="text-white/40">+</span>
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/50">
            YEARS COMPETITIVE SWIMMING
          </div>
        </RevealItem>
        <RevealItem>
          <div className="font-[family-name:var(--font-big-shoulders)] text-[clamp(36px,4.5vw,52px)] font-extrabold leading-none text-white">
            D1
          </div>
          <div className="mt-3 font-[family-name:var(--font-jetbrains-mono)] text-[11px] font-medium tracking-[0.14em] text-white/50">
            BROWN UNIVERSITY
          </div>
        </RevealItem>
      </RevealStagger>
    </section>
  )
```

- [ ] **Step 4: Type-check**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Manual verification**

```bash
pnpm dev
```

Open http://localhost:3000 in the browser. Scroll down to the stat row (just below the hero). Expected: the four stats fade in with a slight upward slide, left-to-right in quick succession (not all at once), the first time they enter view; the existing count-up animation still plays. Scroll past and back up — they should not re-animate (fade-in only happens once). Stop the dev server (Ctrl+C).

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml app/components/motion/Reveal.tsx app/components/home/StatBand.tsx
git commit -m "$(cat <<'EOF'
Add Framer Motion and scroll-reveal primitives, wire into StatBand

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Restructure page flow — remove Explore More, remove AI Start, add marquee divider

**Files:**
- Delete: `app/components/home/ExploreMore.tsx`
- Create: `app/components/home/SectionDivider.tsx`
- Modify: `app/page.tsx`
- Modify: `app/components/Header.tsx`

**Interfaces:**
- Consumes: none from other tasks.
- Produces: `SectionDivider` (default export, no props) — a static marquee divider component other tasks don't need to know about.

- [ ] **Step 1: Delete ExploreMore**

```bash
rm app/components/home/ExploreMore.tsx
```

- [ ] **Step 2: Create the marquee divider**

Create `app/components/home/SectionDivider.tsx`:

```tsx
const WORDS = ["SWIM", "CONTENT", "COMMUNITY", "REPEAT"]

function MarqueeTrack() {
  return (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {WORDS.map((word) => (
        <span key={word} className="flex items-center gap-8">
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-bold tracking-[0.2em] text-white/40">
            {word}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
        </span>
      ))}
    </span>
  )
}

export default function SectionDivider() {
  return (
    <div className="overflow-hidden border-y border-white/10 py-4">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </div>
  )
}
```

This is a plain server component (no `"use client"`, no JS) — the loop is a pure CSS animation.

- [ ] **Step 3: Add the `marquee` keyframe to Tailwind config**

Modify `tailwind.config.ts`. In the `keyframes` object (currently only has `accordion-down`/`accordion-up`), add a `marquee` entry:

```ts
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(-50%)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			marquee: 'marquee 24s linear infinite'
  		}
```

(Two identical `MarqueeTrack`s back to back means the total track is exactly 2x one track's width, so `translateX(-50%)` loops seamlessly.)

- [ ] **Step 4: Update `app/page.tsx`**

Replace the full file contents:

```tsx
import HeroSection from "./components/home/HeroSection"
import StatBand from "./components/home/StatBand"
import PopularContent from "./components/home/PopularContent"
import SectionDivider from "./components/home/SectionDivider"
import AboutSection from "./components/home/AboutSection"
import SponsorsSection from "./components/home/SponsorsSection"
import ContactSection from "./components/home/ContactSection"

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#08090b] text-[#f5f6f7]">
      <HeroSection />
      <StatBand />
      <PopularContent />
      <SectionDivider />
      <AboutSection />
      <SponsorsSection />
      <ContactSection />
    </div>
  )
}
```

- [ ] **Step 5: Remove the AI Start nav item**

Modify `app/components/Header.tsx`. In the `navItems` array, remove the AI Start line so it reads:

```tsx
  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/#about" },
    { name: "SPONSORS", href: "/#sponsors" },
    { name: "CONTACT", href: "/#contact" },
  ]
```

- [ ] **Step 6: Type-check**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors (confirms no dangling imports of `ExploreMore` or `AiStartSection`).

- [ ] **Step 7: Manual verification**

```bash
pnpm dev
```

Open http://localhost:3000. Expected:
- Header nav shows HOME / ABOUT / SPONSORS / CONTACT only — no "AI START".
- Scrolling down: Hero → Stats → Popular Content → a thin scrolling text ribbon ("SWIM · CONTENT · COMMUNITY · REPEAT" looping) → About → Sponsors → Contact → Footer. No AI Start section, no 4-box Explore More grid anywhere.
- Navigate to http://localhost:3000/ai-start directly — it should redirect to the homepage (landing at the top is fine; there's no `#ai-start` anchor anymore, that's expected per the design spec).
- Open Chrome DevTools → Rendering tab → emulate `prefers-reduced-motion: reduce`, reload — the marquee text should be static (not scrolling).

Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx app/components/Header.tsx app/components/home/SectionDivider.tsx tailwind.config.ts
git rm app/components/home/ExploreMore.tsx
git commit -m "$(cat <<'EOF'
Remove Explore More and AI Start from homepage, add marquee divider

Explore More just linked to sections already below it on the same page.
AI Start is coming off the homepage until the feature is ready; the
waitlist component itself is left in the repo, just unused.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: PopularContent — staggered reveal + image parallax

**Files:**
- Create: `app/components/home/PopularContentCard.tsx`
- Modify: `app/components/home/PopularContent.tsx`

**Interfaces:**
- Consumes: `RevealStagger`, `RevealItem` from `@/app/components/motion/Reveal` (Task 1).
- Produces: `PopularContentCard({ video: { title: string; views: string; image: string; href: string } })` — default export, used only by `PopularContent.tsx`.

- [ ] **Step 1: Create the card component with scroll parallax**

Create `app/components/home/PopularContentCard.tsx`:

```tsx
"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

type Video = {
  title: string
  views: string
  image: string
  href: string
}

export default function PopularContentCard({ video }: { video: Video }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-16, 16])

  return (
    <a
      ref={cardRef}
      href={video.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(255,255,255,0.12)]"
    >
      <motion.img
        src={video.image}
        alt={video.title}
        style={{ y }}
        className="absolute inset-[-8%] h-[116%] w-full object-cover [filter:grayscale(0.3)_contrast(1.05)] transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.9)_100%)]" />
      <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-[#08090b]/60">
        <div className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
      </div>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="mb-2 text-[11px] font-bold tracking-[0.12em] text-white/55">{video.views}</div>
        <div className="font-[family-name:var(--font-big-shoulders)] text-[22px] font-extrabold">
          {video.title}
        </div>
      </div>
    </a>
  )
}
```

- [ ] **Step 2: Wire it into PopularContent with stagger**

Modify `app/components/home/PopularContent.tsx`. Add imports at the top:

```tsx
import PopularContentCard from "./PopularContentCard"
import { RevealStagger, RevealItem } from "@/app/components/motion/Reveal"
```

Replace the grid `<div>` of cards (the `<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">...</div>` block, currently containing the full `<a>` markup inline) with:

```tsx
        <RevealStagger className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
          {videos.map((video) => (
            <RevealItem key={video.title}>
              <PopularContentCard video={video} />
            </RevealItem>
          ))}
        </RevealStagger>
```

The `videos` array and everything above the grid (the eyebrow/heading/"VIEW ALL" link block) stay unchanged.

- [ ] **Step 3: Type-check**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

```bash
pnpm dev
```

Open http://localhost:3000, scroll to "Popular Content". Expected: the 3 cards fade/slide in staggered left-to-right the first time they enter view. Slowly scroll up and down past the section — the images should shift very slightly (a few pixels) up/down relative to their frame as you scroll (parallax), with no visible gap/empty edge around the image at any scroll position. Hover a card — it should still lift and the image should still scale up slightly, same as before. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add app/components/home/PopularContentCard.tsx app/components/home/PopularContent.tsx
git commit -m "$(cat <<'EOF'
Add staggered reveal and scroll parallax to Popular Content cards

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: AboutSection — photo collage + story split

**Files:**
- Modify: `app/components/home/AboutSection.tsx`

**Interfaces:**
- Consumes: `Reveal`, `RevealStagger`, `RevealItem` from `@/app/components/motion/Reveal` (Task 1).

- [ ] **Step 1: Rewrite AboutSection**

Replace the full contents of `app/components/home/AboutSection.tsx`:

```tsx
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-[76px] px-6 pb-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            WHO I AM
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            MY STORY
          </h2>
        </Reveal>

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

          <RevealItem className="max-w-[640px] space-y-5 text-[16px] leading-[1.7] text-white/65">
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
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manual verification**

```bash
pnpm dev
```

Open http://localhost:3000, scroll to "My Story". Expected on desktop width (≥1024px): photo collage on the left (one larger photo, one smaller photo below-left of it, both grayscale), story text on the right, vertically centered against the photos. On a narrow/mobile viewport (resize browser to ~390px wide): photos stack full-width above the text, in a single column. The collage + text should fade/slide in together (staggered) the first time the section scrolls into view. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/components/home/AboutSection.tsx
git commit -m "$(cat <<'EOF'
Redesign About section as a photo collage + story split

Replaces the plain centered-paragraph layout with two real photos
(race action, medal) next to the existing story copy.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: SponsorsSection — divided list instead of card grid

**Files:**
- Modify: `app/components/home/SponsorsSection.tsx`

**Interfaces:**
- Consumes: `Reveal`, `RevealStagger`, `RevealItem` from `@/app/components/motion/Reveal` (Task 1).

- [ ] **Step 1: Rewrite SponsorsSection**

Replace the full contents of `app/components/home/SponsorsSection.tsx`. Keep the existing `sponsors` array exactly as-is (all 8 entries, `hidden` flags unchanged) — only the section markup below it changes:

```tsx
import Image from "next/image"
import { Reveal, RevealStagger, RevealItem } from "@/app/components/motion/Reveal"

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
        <Reveal className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            WHO BACKS THE JOURNEY
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            SPONSORS
          </h2>
        </Reveal>

        <RevealStagger className="mx-auto max-w-[880px]" staggerDelay={0.08}>
          {visibleSponsors.map((sponsor) => (
            <RevealItem key={sponsor.name}>
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-6 border-b border-white/[0.08] py-6 transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div className="flex h-9 w-24 shrink-0 items-center">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={140}
                    height={56}
                    className="h-full w-auto object-contain object-left [filter:brightness(0)_invert(1)] opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:[filter:none]"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-[family-name:var(--font-big-shoulders)] text-[18px] font-extrabold uppercase tracking-[0.01em]">
                    {sponsor.name}
                  </div>
                  {sponsor.code && (
                    <div className="mt-1 font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.04em] text-white/50">
                      CODE {sponsor.code} — {sponsor.codeDescription}
                    </div>
                  )}
                </div>
                <div className="shrink-0 text-[12px] font-bold tracking-[0.08em] text-white/40 transition-colors duration-300 group-hover:text-white">
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
```

Note on the logo treatment: default state uses the same `[filter:brightness(0)_invert(1)]` white-silhouette trick already used for logos elsewhere in this codebase (Header, Footer) at reduced opacity, rather than literal `grayscale()` — a true grayscale filter would leave dark-colored logos (e.g. a black wordmark) nearly invisible against the `#08090b` background. On hover, the filter is removed and opacity goes to 100%, revealing the logo's real colors. This achieves the "muted by default, color on hover" effect from the approved mockup while guaranteeing every logo stays visible in its default state.

- [ ] **Step 2: Type-check**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manual verification**

```bash
pnpm dev
```

Open http://localhost:3000, scroll to "Sponsors". Expected: three rows (Nike Swim, SBR Sports, DripDrop — matching the current `hidden: false` entries), each a logo + name (+ code line for SBR Sports and DripDrop, no code line for Nike Swim) + "VISIT →", separated by thin horizontal lines, no card backgrounds/borders/shadows. Hover a row — logo should shift from muted white to full color, "VISIT →" should brighten. Click a row (in a new tab) — confirm it opens the sponsor's website. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/components/home/SponsorsSection.tsx
git commit -m "$(cat <<'EOF'
Redesign Sponsors as a divided logo list instead of a card grid

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: ContactSection — reveal wrap

**Files:**
- Modify: `app/components/home/ContactSection.tsx`

**Interfaces:**
- Consumes: `Reveal` from `@/app/components/motion/Reveal` (Task 1).

- [ ] **Step 1: Wrap the two content blocks in `Reveal`**

Modify `app/components/home/ContactSection.tsx`. Add the import:

```tsx
import { Reveal } from "@/app/components/motion/Reveal"
```

Change the two top-level `<div>`s inside `<div className="mx-auto max-w-[560px]">` from plain `<div>` to `Reveal` (keep `className="mb-14"` on the first one; give the second a small `delay` so it follows the heading in):

```tsx
      <div className="mx-auto max-w-[560px]">
        <Reveal className="mb-14">
          <div className="mb-3.5 font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.14em] text-white/45">
            LET&apos;S TALK
          </div>
          <h2 className="m-0 font-[family-name:var(--font-big-shoulders)] text-[clamp(32px,4vw,52px)] font-extrabold leading-none">
            GET IN TOUCH
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              type="text"
              placeholder="Your name"
              required
              value={formData.name}
              onChange={handleChange}
              className="h-[52px] w-full rounded-full border-white/[0.15] bg-white/[0.03] px-5 text-white placeholder:text-white/40 focus-visible:ring-white"
            />
            <Input
              name="email"
              type="email"
              placeholder="your.email@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="h-[52px] w-full rounded-full border-white/[0.15] bg-white/[0.03] px-5 text-white placeholder:text-white/40 focus-visible:ring-white"
            />
            <Textarea
              name="message"
              placeholder="Tell me about your inquiry, collaboration idea, or just say hello!"
              required
              value={formData.message}
              onChange={handleChange}
              className="min-h-[120px] w-full rounded-[20px] border-white/[0.15] bg-white/[0.03] px-5 py-4 text-white placeholder:text-white/40 focus-visible:ring-white"
            />
            <button
              type="submit"
              className="h-[52px] w-full rounded-full bg-white text-[14px] font-bold tracking-[0.03em] text-[#08090b] transition-colors duration-300 hover:bg-white/85 sm:w-auto sm:px-8"
            >
              SEND MESSAGE →
            </button>
            {success && <p className="text-[13px] text-white">Message sent! I&apos;ll get back to you soon.</p>}
            {error && <p className="text-[13px] text-red-400">{error}</p>}
          </form>

          <p className="mt-8 text-[14px] text-white/50">
            For sponsorships &amp; business inquiries:{" "}
            <a href="mailto:chrisswimzzinquires@gmail.com" className="text-white/70 hover:text-white">
              chrisswimzzinquires@gmail.com
            </a>
          </p>
        </Reveal>
      </div>
```

Everything else in the file (the `"use client"` directive, imports, `useState`, `handleChange`, `handleSubmit`) stays unchanged.

- [ ] **Step 2: Type-check**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manual verification**

```bash
pnpm dev
```

Open http://localhost:3000, scroll to "Get In Touch". Expected: heading fades/slides in, then the form fades/slides in just after it. Submit the form with a test message and confirm the existing success/error behavior still works exactly as before (no change to submit logic). Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/components/home/ContactSection.tsx
git commit -m "$(cat <<'EOF'
Add scroll-reveal to Contact section

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Footer — reveal wrap + oversized wordmark echo

**Files:**
- Modify: `app/components/Footer.tsx`

**Interfaces:**
- Consumes: `Reveal` from `@/app/components/motion/Reveal` (Task 1).

- [ ] **Step 1: Rewrite Footer**

Replace the full contents of `app/components/Footer.tsx`:

```tsx
import Link from "next/link"
import { Reveal } from "@/app/components/motion/Reveal"

const socialLinks = [
  { label: "IG", href: "https://www.instagram.com/chris_swimzz/" },
  { label: "TT", href: "https://www.tiktok.com/@chris_swimzz" },
  { label: "YT", href: "https://www.youtube.com/@Chris_swimzz" },
  { label: "FB", href: "https://www.facebook.com/profile.php?id=61560790375196" },
]

export default function Footer() {
  return (
    <footer className="overflow-hidden px-6 pb-14 pt-12">
      <Reveal className="mx-auto max-w-[1280px]">
        <div className="mb-8 select-none font-[family-name:var(--font-big-shoulders)] text-[clamp(48px,10vw,140px)] font-extrabold leading-none tracking-[-0.01em] text-white/[0.04]">
          CHRIS SWIMZZ
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6">
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
      </Reveal>
    </footer>
  )
}
```

`Footer.tsx` stays a server component — it has no hooks of its own, and importing the client component `Reveal` into it does not require adding `"use client"` here.

- [ ] **Step 2: Type-check**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manual verification**

```bash
pnpm dev
```

Open http://localhost:3000, scroll to the very bottom. Expected: a large, very faint "CHRIS SWIMZZ" wordmark sits above the copyright/logo/social row, echoing the hero's big type treatment without being distracting. No horizontal scrollbar appears at any viewport width (resize the browser narrow to confirm). The row below fades in as before. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/components/Footer.tsx
git commit -m "$(cat <<'EOF'
Add oversized wordmark echo and scroll-reveal to Footer

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Final verification pass

**Files:** none (verification only; fix forward in the relevant task's files if something fails).

- [ ] **Step 1: Full type-check**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 2: Lint**

```bash
pnpm run lint
```

Expected: completes without new errors introduced by this plan's changes (pre-existing warnings, if any, are not this plan's concern).

- [ ] **Step 3: Production build**

```bash
pnpm build
```

Expected: build succeeds. This catches any server/client component boundary mistakes (e.g. a hook used outside `"use client"`) that `tsc --noEmit` alone wouldn't.

- [ ] **Step 4: Full-page manual walkthrough**

```bash
pnpm dev
```

Open http://localhost:3000 and scroll the entire page top to bottom at desktop width, then again at a mobile width (~390px):
- Hero looks and behaves exactly as before (video, wordmark, mouse parallax).
- Header nav: HOME / ABOUT / SPONSORS / CONTACT (no AI START), all anchor links scroll to the right section.
- Stats, Popular Content, marquee divider, About, Sponsors, Contact, Footer all appear in that order with no leftover Explore More or AI Start content anywhere.
- Every section's entrance animation plays once on first scroll into view and doesn't replay on scrolling back up.
- In Chrome DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, reload, and re-scroll the whole page: content should still appear (no permanently-hidden elements), just without sliding/parallax motion, and the marquee should be static.
- No horizontal scrollbar at any viewport width.

Stop the dev server.

- [ ] **Step 5: Fix forward if anything failed**

If any check in Steps 1–4 fails, fix it in the file it belongs to (per the task that created it above), re-run the failing check, and commit the fix with a message describing what was wrong — do not proceed to hand-off until everything in this task passes.
