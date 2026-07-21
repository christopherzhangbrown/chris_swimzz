# Homepage Redesign: Single-Page Dark Editorial Site

## Overview

Recreate the dark, editorial homepage design from `design_handoff_homepage_redesign/` (Homepage.dc.html + README) in the existing Next.js 14 + Tailwind + shadcn/ui codebase, pixel-for-pixel per the handoff's fidelity note. In addition, collapse the site from five routes (`/`, `/about`, `/sponsors`, `/ai-start`, `/contact`) into a single scrolling homepage, since the intent is one continuous page rather than separate tabs. The old routes become redirects to in-page anchors so existing links keep working.

## Page Architecture

Single page at `/`, sections top to bottom:

1. **Header** (fixed, transparent, global)
2. **Hero** — full-bleed photo, giant wordmark, parallax
3. **Stat band** — animated count-up stats
4. **Popular Content** — 3-card video grid
5. **Explore More** — 4-card in-page quick-jump teaser grid (My Story / Sponsors / AI Start Analyzer / Get in Touch), each card scrolls to the matching section below instead of navigating to a separate route
6. **My Story** (`id="about"`) — condensed About content
7. **Sponsors** (`id="sponsors"`) — sponsor grid, restyled dark
8. **AI Start Analyzer** (`id="ai-start"`) — condensed waitlist section
9. **Contact** (`id="contact"`) — condensed contact form
10. **CTA band** — "Dive Into the Community"
11. **Footer** (global)

`app/about/page.tsx`, `app/sponsors/page.tsx`, `app/ai-start/page.tsx`, `app/contact/page.tsx` are replaced with thin server components that call `redirect("/#about")` etc. (Next.js `redirect` from `next/navigation`), preserving any existing external links/bookmarks.

## Header, Nav & Footer

- Header stays a global component (rendered in `layout.tsx`), fixed, transparent, 76px tall, sitting directly over the hero — this now works site-wide since there's only one page.
- Desktop nav items (HOME / ABOUT / SPONSORS / AI START / CONTACT) become smooth-scroll anchor links (`#`, `#about`, `#sponsors`, `#ai-start`, `#contact`). HOME scrolls to top.
- Each anchor target section gets `scroll-margin-top: 76px` (via Tailwind `scroll-mt-[76px]` or CSS) so the fixed header doesn't cover the top of the section when scrolled to.
- The reference only specs desktop nav; add a simple dark slide-down mobile menu (same open/close pattern as the current `Header.tsx`) so mobile stays usable, styled to match the dark palette.
- Footer restyled to match the reference: dark background, copyright, centered logo + wordmark, 4 circular bordered social icon links (IG/TT/YT/FB) that turn blue on hover, open in new tabs.

## Content Per Section (condensed from existing pages)

- **My Story**: 2–3 sentence intro + condensed origin story (2 short paragraphs, trimmed from the current 4) + a single compact row of short skill/value tags (JetBrains Mono label style) instead of 8 separate cards with descriptions.
- **Sponsors**: dark bordered cards matching the Explore More card visual language — logo, name, category, discount code badge (if present), "Visit site →" link. Keeps the existing `hidden` filter (only Nike Swim, SBR Sports, DripDrop currently visible).
- **AI Start Analyzer**: heading + one-line description + the working email waitlist form (unchanged `/api/waitlist` POST logic). Drop the "Interactive Demo coming soon" placeholder — filler that doesn't fit the sparse aesthetic.
- **Contact**: condensed form (name/email/message via the existing Formspree endpoint, unchanged submit logic) + business email. Drop the duplicate social-links list since the footer already carries social icons.

## Design Tokens (from handoff, final — not open for interpretation)

- Background `#08090b`, foreground `#f5f6f7`, accent `#2f6bff` (hover `#1a55e6`)
- Fonts: Big Shoulders Display (800/900 headings), Archivo (400–700 body), JetBrains Mono (500/700 labels) — via `next/font/google`, replacing the current Poppins import in `layout.tsx`
- Pill buttons `100px` radius, cards `20px` radius, card borders `rgba(255,255,255,0.08)`

## Technical Approach

- Split `app/page.tsx` into focused section components under `app/components/home/`: `Hero.tsx`, `StatBand.tsx`, `PopularContent.tsx`, `ExploreMore.tsx`, `AboutSection.tsx`, `SponsorsSection.tsx`, `AiStartSection.tsx`, `ContactSection.tsx`, `CtaBand.tsx`. `page.tsx` composes them in order.
- Small client components (`"use client"`) for the two interactive pieces: hero parallax (mousemove/mouseleave transform) and stat count-up (IntersectionObserver at 40% threshold, animating once). Everything else can stay a server component.
- Hero/stat/popular-content/explore/CTA sections use custom Tailwind utility classes matching the reference's exact inline pixel values (colors, spacing, radii, font sizes/clamp values) rather than default shadcn `Button`/`Card` styling, per the handoff's pixel-perfect fidelity requirement.
- Contact and AI Start waitlist forms keep the existing shadcn `Input`/`Textarea` components and existing submit handlers — only their visual container/copy is restyled dark.
- All existing image assets (`blackwhitebrownborder.png`, `DayInTheLife.png`, `TopTips.png`, `BHRA.png`, `logowhiteimg.png`, sponsor logos) are reused as-is from `public/images/`; no new assets.
- `frontend-design` plugin is already installed locally (found in `~/.claude/plugins/cache/claude-plugins-official/frontend-design`) — used during implementation for visual polish decisions not pinned by the handoff (e.g., mobile menu treatment, responsive breakpoints for condensed sections).

## Out of Scope

- No changes to `/api/waitlist` or the Formspree contact endpoint logic.
- No new component libraries introduced.
- No changes to sponsor data/visibility logic beyond restyling.
