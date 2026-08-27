// Two action tiers, and only two.
//
// Primary is the white pill and belongs to the thing the section is asking
// you to do: submit the contact form, analyze a start on SwimVolt. Secondary
// is mono caps with a trailing arrow and belongs to navigation away from the
// page: visit a sponsor, view the Instagram profile, read how SwimVolt works.
//
// Before this the two form submits looked nothing alike, and the weaker of
// the two was on SwimVolt, the section with the most commercial intent.

export const ACTION_PRIMARY =
  "inline-flex h-11 items-center justify-center gap-3 rounded-full bg-ink px-8 font-mono text-[13px] font-bold tracking-action text-ground transition-colors duration-300 hover:bg-white/85"

export const ACTION_SECONDARY =
  "group inline-flex min-h-11 items-center gap-3 font-mono text-[13px] font-bold tracking-action text-ink-subtle transition-colors duration-300 hover:text-ink"

// The arrow that trails both tiers. Nudges on hover so the affordance is
// felt, not just seen.
export const ACTION_ARROW =
  "transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
