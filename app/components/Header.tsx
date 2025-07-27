"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "AI Start Analyzer", href: "/ai-start" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/images/logos/logoblackimg.png" 
                  alt="Chris Swimzz Logo" 
                  className="h-10 w-auto transition-all duration-300 group-hover:filter group-hover:sepia-100 group-hover:hue-rotate-[200deg] group-hover:saturate-[300%] group-hover:brightness-[0.8]" 
                />
              </div>
              <span className="text-xl font-bold tracking-wide group-hover:text-blue-600 transition-colors duration-300">CHRIS SWIMZZ</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                    pathname === item.href ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Black accent line */}
        <div className="h-0.5 bg-black"></div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200">
            <nav className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block text-base font-medium transition-colors duration-200 hover:text-blue-600 ${
                    pathname === item.href ? "text-blue-600" : "text-gray-700"
                  }`}
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
