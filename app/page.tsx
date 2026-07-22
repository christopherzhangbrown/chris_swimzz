import HeroSection from "./components/home/HeroSection"
import StatBand from "./components/home/StatBand"
import PopularContent from "./components/home/PopularContent"
import ExploreMore from "./components/home/ExploreMore"
import AboutSection from "./components/home/AboutSection"
import SponsorsSection from "./components/home/SponsorsSection"
import AiStartSection from "./components/home/AiStartSection"
import ContactSection from "./components/home/ContactSection"
import CtaBand from "./components/home/CtaBand"

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#08090b] text-[#f5f6f7]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[8%] -top-[5%] h-[38%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.16),transparent_65%)] blur-[10px]" />
        <div className="absolute -right-[12%] top-[12%] h-[34%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.12),transparent_65%)] blur-[10px]" />
        <div className="absolute -left-[10%] top-[38%] h-[30%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.09),transparent_65%)] blur-[10px]" />
        <div className="absolute -right-[10%] top-[58%] h-[36%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(80,140,255,0.13),transparent_65%)] blur-[10px]" />
        <div className="absolute left-[8%] top-[82%] h-[34%] w-[56%] rounded-full bg-[radial-gradient(circle,rgba(47,107,255,0.14),transparent_65%)] blur-[10px]" />
      </div>

      <HeroSection />
      <StatBand />
      <PopularContent />
      <ExploreMore />
      <AboutSection />
      <SponsorsSection />
      <AiStartSection />
      <ContactSection />
      <CtaBand />
    </div>
  )
}
