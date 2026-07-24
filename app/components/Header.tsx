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
