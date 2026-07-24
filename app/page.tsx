import HeroSection from "./components/home/HeroSection"
import StatBand from "./components/home/StatBand"
import PopularContent from "./components/home/PopularContent"
import ExploreMore from "./components/home/ExploreMore"
import AboutSection from "./components/home/AboutSection"
import SponsorsSection from "./components/home/SponsorsSection"
import AiStartSection from "./components/home/AiStartSection"
import ContactSection from "./components/home/ContactSection"

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#08090b] text-[#f5f6f7]">
      <HeroSection />
      <StatBand />
      <PopularContent />
      <ExploreMore />
      <AboutSection />
      <SponsorsSection />
      <AiStartSection />
      <ContactSection />
    </div>
  )
}
