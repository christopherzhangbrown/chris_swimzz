# Homepage Numbered-Sections Redesign

## Context

Reference wireframes (`screenshots/01-site.png` through `06-site.png`) show a
numbered-section format: a small kicker line ending in an index number
("WHO I AM — 01"), a bold heading, an oversized translucent "ghost number"
watermark bleeding behind the section, and a faint diagonal stripe texture
in the background. The hero (video) and stat band (animated counters) are
explicitly out of scope — they stay as-is.

Everything below the stat band is restructured to match this format while
keeping our existing content, images, and working form integrations.

## Page structure

Current (`app/page.tsx`):
```
Hero → StatBand → PopularContent → SectionDivider (marquee) → About → Sponsors → Contact → Footer
```

New:
```
Hero → StatBand → About (01) → PopularContent (02) → Sponsors (03) → AiStart (04) → Contact (05) → Footer
```

Changes:
- `SectionDivider` (marquee) is removed — deleted from the page composition.
  The component file itself can stay unused or be deleted; deleting it is
  cleaner since nothing else references it.
- `AboutSection` and `PopularContent` swap order.
- `AiStartSection` is added to the page composition for the first time
  (currently unused dead code — only reachable via a redirecting `/ai-start`
  route that bounces back to `/`).

## Global additions

### 1. Ghost number watermark

A new shared component, `app/components/home/GhostNumber.tsx`, renders an
oversized numeral (Big Shoulders, extrabold) at ~4-5% white opacity,
positioned absolutely behind a section's heading content (`aria-hidden`,
`pointer-events-none`, excluded from layout flow). It takes a `number: string`
prop (`"01"`, `"02"`, etc.).

Motion: rather than a static image, the numeral gets a subtle scroll-linked
parallax drift (via `useScroll`/`useTransform` from framer-motion, same
pattern already used in `PopularContentCard`) so it moves slightly slower
than the foreground content as the section scrolls past. Respects
`useReducedMotion` (no transform when reduced motion is on), consistent with
every other animated component in this codebase.

Each of the 5 renumbered sections wraps its kicker/heading block in a
`relative` container and drops in `<GhostNumber number="01" />` etc.
positioned top-left, behind the text (z-index below content, above section
background).

### 2. Diagonal stripe background texture

Added once, site-wide, not per-section. A single fixed/absolute full-page
layer in `app/page.tsx` (behind all section content, low z-index,
`pointer-events-none`) using a `repeating-linear-gradient` CSS background at
low opacity (matching the faint diagonal lines visible in the reference
screenshots). No JS, no motion — pure CSS, negligible perf cost.

### 3. Kicker index suffixes

Each numbered section's existing kicker text gets `" — 0N"` appended:
- About: `WHO I AM` → `WHO I AM — 01`
- PopularContent: `MOST WATCHED` → `MOST WATCHED — 02`
- Sponsors: `WHO BACKS THE JOURNEY` → `WHO BACKS THE JOURNEY — 03`
- AiStart: `COMING SOON` → `COMING SOON — 04`
- Contact: `LET'S TALK` → `LET'S TALK — 05`

## Section-specific changes

### 01 — My Story (`AboutSection.tsx`)
No content/layout changes. Add kicker suffix + `<GhostNumber number="01" />`.

### 02 — Popular Content (`PopularContent.tsx`)
Move down one slot in `page.tsx` (after About instead of after StatBand).
Add kicker suffix + `<GhostNumber number="02" />`. Video grid, cards, and
"VIEW ALL ON INSTAGRAM" link are unchanged.

### 03 — Sponsors (`SponsorsSection.tsx`)
Add kicker suffix + `<GhostNumber number="03" />`. Add a small numeric index
badge (`01`, `02`, `03`…) to the left of each sponsor row, matching the
wireframe's numbered-list treatment — derived from the row's position in
`visibleSponsors`, formatted as 2-digit strings. Existing logo, name,
category/code line, and "VISIT →" are unchanged.

### 04 — AI Start Analyzer (`AiStartSection.tsx`)
Currently dead code (not rendered on the homepage) and single-column. This
becomes a real two-column section, added to `page.tsx`:

- **Left column**: kicker (`COMING SOON — 04`) + heading + existing copy +
  the existing working email waitlist form (posts to `/api/waitlist`,
  unchanged logic).
- **Right column**: a new stylized abstract graphic panel in the site's
  monochrome aesthetic — geometric, referencing motion/analysis (e.g. a
  dive-block silhouette or scanning-line motif), not a fake screenshot. A
  floating "WAITLIST OPEN" pill badge sits in the panel's top-right corner,
  matching the reference wireframe's badge placement. Exact graphic
  treatment to be finalized visually during implementation (frontend-design
  skill), but constraints are: monochrome/grayscale, subtle motion allowed
  (e.g. a slow scan-line or pulse), no literal fake UI mockup.
- Add `<GhostNumber number="04" />` behind the left column's kicker/heading.
- Section gets an `id="ai-start"` (matching existing anchor-link convention
  used by other sections and the `/ai-start` redirect).
- `Header.tsx`'s `navItems` currently has no "AI START" entry at all (it was
  never added when the section existed only as dead code). Add
  `{ name: "AI START", href: "/#ai-start" }` between SPONSORS and CONTACT,
  matching the reference wireframe's nav order.

### 05 — Get In Touch (`ContactSection.tsx`)
Heading treatment gets bolder: inline arrow (→) next to "GET IN TOUCH"
(reusing the existing arrow glyph style already used elsewhere, e.g.
"VISIT →", "JOIN WAITLIST →") and a horizontal divider line beneath the
heading, matching the wireframe's punch. The existing working
name/email/message Formspree form and the sponsorship email line stay,
restyled to sit under the new heading treatment. Add kicker suffix
(`LET'S TALK — 05`) + `<GhostNumber number="05" />`.

### Footer
No changes — already has the oversized wordmark echo and scroll-reveal from
a prior commit.

## Components touched/added

- New: `app/components/home/GhostNumber.tsx`
- Edit: `app/page.tsx` (reorder sections, drop marquee, add AiStartSection,
  add diagonal stripe background layer)
- Edit: `AboutSection.tsx`, `PopularContent.tsx`, `SponsorsSection.tsx`,
  `AiStartSection.tsx`, `ContactSection.tsx` (kickers, ghost numbers,
  AiStart two-column rebuild, Contact heading treatment, Sponsors index
  badges)
- Edit: `app/components/Header.tsx` (add missing "AI START" nav entry)
- Delete: `app/components/home/SectionDivider.tsx` (no longer referenced
  anywhere after removal from `page.tsx`)

## Out of scope

- `HeroSection.tsx` and `StatBand.tsx` — explicitly unchanged.
- The vertical "SCROLL TO EXPLORE — D1 — BROWN" hero readout from the
  wireframe — user declined this addition.
- Any change to `/api/waitlist` or the Formspree contact submission logic.
- The About section's existing two-photo collage layout — kept as-is
  (established in a prior commit), not reverted to the wireframe's
  single-photo placeholder.

## Testing / verification

This is a visual/structural redesign with no new business logic beyond
moving an existing (previously untested-in-context) form into the page
flow. Verification is manual:
- `npm run dev`, visually walk through the full homepage scroll in browser.
- Confirm reduced-motion users get no parallax/scroll-linked movement
  (ghost numbers, existing card parallax).
- Confirm the AI Start waitlist form still successfully posts to
  `/api/waitlist` after being moved into the page.
- Confirm the Contact form still successfully posts to Formspree.
- Confirm anchor links (`/#about`, `/#sponsors`, `/#ai-start`, `/#contact`)
  still scroll to the right section given the reordering.
