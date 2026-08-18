// Shared field styling for the contact form.
//
// The label is visible, not sr-only. A placeholder disappears the moment
// someone types, so on a three-field form a person who tabs away and back
// has nothing left telling them which field is which.

export const FIELD_CLASSNAME =
  "h-auto w-full rounded-none border-0 border-b border-rule bg-transparent px-0 py-3 text-ink placeholder:text-ink-faint focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-ink focus-visible:shadow-[inset_0_-2px_0_0_white]"

export const FIELD_LABEL_CLASSNAME =
  "mb-2 block font-mono text-label font-bold tracking-eyebrow text-ink-subtle"

export const EMAIL_PLACEHOLDER = "you@example.com"
