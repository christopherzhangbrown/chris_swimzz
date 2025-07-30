import Link from "next/link"
import { Instagram, Youtube, Facebook } from "lucide-react"

// Custom TikTok SVG icon since Lucide doesn't have it
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left - Copyright */}
          <div className="text-sm text-gray-400 mb-4 md:mb-0">© 2025 Christopher Zhang, All rights reserved</div>

          {/* Center - Logo */}
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img src="/images/logos/logowhiteimg.png" alt="Chris Swimzz Logo" className="h-8 w-auto" />
            <span className="text-lg font-bold tracking-wide">CHRIS SWIMZZ</span>
          </div>

          {/* Right - Social Media */}
          <div className="flex items-center space-x-4">
            <Link href="https://www.instagram.com/chris_swimzz/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://www.tiktok.com/@chris_swimzz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <TikTokIcon className="h-5 w-5" />
            </Link>
            <Link href="https://www.youtube.com/@Chris_swimzz" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61560790375196" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
