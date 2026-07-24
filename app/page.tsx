import HeroSection from "./components/home/HeroSection"
import StatBand from "./components/home/StatBand"
import PopularContent from "./components/home/PopularContent"
import SectionDivider from "./components/home/SectionDivider"
import AboutSection from "./components/home/AboutSection"
import SponsorsSection from "./components/home/SponsorsSection"
import ContactSection from "./components/home/ContactSection"

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#08090b] text-[#f5f6f7]">
      <HeroSection />
      <StatBand />
      <PopularContent />
      <SectionDivider />
      <AboutSection />
      <SponsorsSection />
      <ContactSection />
    </div>
  )
}
