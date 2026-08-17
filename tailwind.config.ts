import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // The site is monochrome on a near-black ground. Every muted value is
      // white at a fixed alpha; naming them stops each section inventing its
      // own gray.
      colors: {
        ground: "#08090b",
        ink: "#f5f6f7",
        "ink-muted": "rgb(255 255 255 / 0.65)", // body copy
        "ink-subtle": "rgb(255 255 255 / 0.60)", // eyebrows, labels, secondary links
        "ink-faint": "rgb(255 255 255 / 0.45)", // placeholders, decorative numerals
        rule: "rgb(255 255 255 / 0.15)", // field underlines, dividers
        "rule-faint": "rgb(255 255 255 / 0.08)", // row separators
        "rule-strong": "rgb(255 255 255 / 0.30)", // hover and active borders
      },
      fontFamily: {
        display: ["var(--font-big-shoulders)", "sans-serif"],
        body: ["var(--font-archivo)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      // Three tracking roles, not six.
      //   eyebrow  labels that describe something else
      //   action   buttons, CTA links, nav, badges
      //   wordmark the brand lockup, header and footer
      letterSpacing: {
        eyebrow: "0.14em",
        action: "0.06em",
        wordmark: "0.08em",
      },
      fontSize: {
        label: ["12px", { lineHeight: "1.4" }],
      },
    },
  },
  plugins: [],
};
export default config;
