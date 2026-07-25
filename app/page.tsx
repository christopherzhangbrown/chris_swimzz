import HeroSection from "./components/home/HeroSection"
import StatBand from "./components/home/StatBand"
import PopularContent from "./components/home/PopularContent"
import AboutSection from "./components/home/AboutSection"
import SponsorsSection from "./components/home/SponsorsSection"
import AiStartSection from "./components/home/AiStartSection"
import ContactSection from "./components/home/ContactSection"
import AmbientGlow from "./components/home/AmbientGlow"

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#08090b] text-[#f5f6f7]">
      <AmbientGlow />
      <div className="relative z-[1]">
        <HeroSection />
        <StatBand />
        <AboutSection />
        <PopularContent />
        <SponsorsSection />
        <AiStartSection />
        <ContactSection />
      </div>
    </div>
  )
}
