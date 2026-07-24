# Homepage Motion & Layout Redesign

## Overview

Phase 2 of the homepage redesign (`docs/superpowers/specs/2026-07-20-homepage-redesign-design.md`). The dark editorial base is in place and works; the complaint now is that the bottom half of the page (About, Sponsors, AI Start, Contact) is generic — everything is the same centered "eyebrow + heading + rounded card" pattern, with no unique visual identity per section and no motion. This phase gives each remaining section its own shape, adds scroll-driven animation across the whole page so it reads as one continuous flow instead of a list of stacked blocks, and removes a redundant section along the way. The hero (video, wordmark, mouse parallax) stays exactly as-is — it already works.

Reference for motion/feel (not layout or color): lukadoncicfoundation.org — scroll-triggered reveals, restrained motion, sections that don't all look alike. We are **not** adopting its light/coral palette or its GSAP+Lenis scroll-hijacking stack; the site stays monochrome black/white and keeps native scroll.

## Section-by-Section Changes

1. **Hero** — unchanged.
2. **StatBand** — layout unchanged (4-stat row). Add: each stat fades/slides in with a slight stagger as the row enters the viewport (on top of the existing count-up-on-intersect behavior), instead of the row just appearing.
3. **PopularContent** — layout unchanged (3-card image grid, already the strongest section). Add: cards fade/slide up staggered as they enter view; subtle scroll-linked parallax on the images.
4. **ExploreMore — removed.** Its 4 cards ("My Story" / "Sponsors" / "AI Start Analyzer" / "Get in Touch") just link to sections that already exist immediately below it on the same page — a redundant table of contents, and the most generic 4-identical-box moment on the page. Delete the component and its usage in `app/page.tsx`.
5. **New: `SectionDivider`** — a thin horizontal strip with looping marquee text (e.g. "SWIM · CONTENT · COMMUNITY · REPEAT"), placed where `ExploreMore` used to sit (between PopularContent and About). Cheap, adds motion/texture as a breather between sections without introducing another card grid. Pauses/removes the scroll animation under `prefers-reduced-motion`.
6. **AboutSection — redesigned.** Currently plain centered paragraphs with no imagery. New: a photo collage (3 images — race action, medals/achievements, everyday life, pulled from existing `public/images/` assets, grayscale to match the hero's treatment) next to the existing story copy, in a simple two-column split (collage stacks above text on mobile). No oversized graphic numerals or other gimmicks — kept deliberately restrained, per direct feedback during design review.
7. **SponsorsSection — redesigned.** Currently a grid of 8 bordered/shadowed cards. New: a plain divided list — one row per visible sponsor with grayscale logo (full color on hover) + name + sponsor code inline (mono, muted, only when a code exists) + a "VISIT →" link, separated by 1px hairlines. No card backgrounds, no borders-as-boxes, no shadow/lift hover. Same `sponsors` data array and `hidden` filter as today — only the visual treatment changes.
8. **AiStartSection — removed from the homepage for now.** The feature isn't ready; it'll be re-added when it is. Remove `<AiStartSection />` from `app/page.tsx`. Remove the "AI START" item from `Header.tsx`'s `navItems`. Leave `app/ai-start/page.tsx` (which currently does `redirect("/#ai-start")`) untouched — with the anchor gone it just lands on the homepage top, which is harmless; reconnect it to a real section when AI Start relaunches. The `AiStartSection.tsx` component file itself can stay in the repo unused (not deleted) so the waitlist form logic is easy to bring back later — remove its import from `page.tsx` only.
9. **ContactSection** — no structural redesign; it stops looking like a clone of AI Start simply because AI Start is no longer sitting right above it. In scope only for the same scroll-reveal treatment every other section gets.
10. **Footer** — layout unchanged. Add a faint, large-scale wordmark echo (low-opacity, oversized "CHRIS SWIMZZ" type in the background) to bookend the hero's big-type treatment at the bottom of the page.

## Motion System

- **Library: Framer Motion** (`motion` package for React). No GSAP/Lenis — the reference site's heavier scroll-hijacking stack is explicitly out, per design review (harder to keep accessible/performant, and Framer Motion is a better fit for this Next.js/React codebase).
- **Scroll reveal**: a small reusable wrapper (e.g. `app/components/motion/Reveal.tsx`) using Framer Motion's `whileInView` (fade + ~16–24px translate-y, `viewport={{ once: true, amount: 0.3 }}`) applied per section. Where a section has multiple items (StatBand's 4 stats, PopularContent's 3 cards, About's photo collage, Sponsors' list rows), children stagger in via a shared parent `variants`/`staggerChildren` rather than each item animating independently.
- **Reduced motion**: respect `prefers-reduced-motion` — Framer Motion's `useReducedMotion` hook gates translate/parallax to opacity-only (or instant) so nothing forces movement on users who've opted out.
- **Marquee**: CSS keyframe or Framer `animate` looping translateX on a duplicated text track, `animation-play-state: paused` under reduced motion.
- **Existing motion kept**: hero mouse parallax, StatBand count-up, PopularContent hover image scale, Sponsors row hover (grayscale→color). These aren't replaced, just extended with entrance animation.

## Technical Approach

- Add `motion` (Framer Motion) to `package.json`.
- `app/page.tsx`: remove `ExploreMore` and `AiStartSection` imports/usage, add new `SectionDivider` between `PopularContent` and `AboutSection`.
- `app/components/Header.tsx`: remove the `AI START` entry from `navItems`.
- `app/components/home/AboutSection.tsx`: rewritten for the photo-collage + text split, reusing the existing story copy. Collage images from existing `public/images/`: `IMG_8018.JPG` (main, larger tile), `blackwhitebrown.png` and `medalpicoutlined.png` (two smaller tiles) — no new asset uploads required.
- `app/components/home/SponsorsSection.tsx`: rewritten from card grid to divided list; reuses the existing `sponsors` data array and `hidden` filter unchanged.
- New `app/components/home/SectionDivider.tsx` (marquee).
- New `app/components/motion/Reveal.tsx` (or similar shared wrapper) used across StatBand, PopularContent, AboutSection, SponsorsSection, ContactSection, Footer.
- `app/components/home/ExploreMore.tsx`: deleted outright (not coming back). `app/components/home/AiStartSection.tsx`: left in the repo but unused/unimported from `page.tsx`, so the waitlist form logic is easy to bring back later.

## Out of Scope

- No changes to `/api/waitlist` or Formspree contact submission logic.
- No color palette or font changes — stays monochrome black/white, Big Shoulders + JetBrains Mono.
- No GSAP/Lenis or other new heavy dependency beyond Framer Motion.
- No changes to the Hero section.
- AI Start Analyzer feature work itself (the waitlist UI stays as a dormant, unused component — this spec only removes it from the live page).
