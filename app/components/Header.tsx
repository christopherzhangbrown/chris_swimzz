"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  const navItems = [
    { name: "HOME", id: "home", href: "/" },
    { name: "ABOUT", id: "about", href: "/#about" },
    { name: "SPONSORS", id: "sponsors", href: "/#sponsors" },
    { name: "SWIMVOLT", id: "ai-start", href: "/#ai-start" },
    { name: "CONTACT", id: "contact", href: "/#contact" },
  ]

  const [activeId, setActiveId] = useState("home")

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "border-b border-white/10 bg-[#08090b]/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logos/logowhiteimg.png"
              alt="Chris Swimzz"
              width={64}
              height={64}
              priority
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
                aria-current={item.id === activeId ? "true" : undefined}
                className={`font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.08em] transition-colors duration-200 ${
                  item.id === activeId ? "text-white" : "text-white/60 hover:text-white"
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
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed left-0 right-0 top-[76px] border-b border-white/10 bg-[#08090b]/95 backdrop-blur-sm">
            <nav className="space-y-4 px-6 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block font-[family-name:var(--font-jetbrains-mono)] text-[12px] font-bold tracking-[0.08em] text-white/70 transition-colors duration-200 hover:text-white"
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
