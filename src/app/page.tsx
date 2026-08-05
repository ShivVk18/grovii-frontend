import ScrollProgress from "@/components/landingPageComponents/ScrollProgress";
import CursorGlow from "@/components/landingPageComponents/CursorGlow";
import Navbar from "@/components/landingPageComponents/Navbar";
import HeroSection from "@/components/landingPageComponents/HeroSection";
import HowItWorksSection from "@/components/landingPageComponents/HowItWorksSection";
import StoryboardSection from "@/components/landingPageComponents/StoryboardSection";
import CreativeToolkitBento from "@/components/landingPageComponents/CreativeToolkitBento";
import TrustStatsSection from "@/components/landingPageComponents/TrustStatsSection";
import FinalCTASection from "@/components/landingPageComponents/FinalCTASection";
import Footer from "@/components/landingPageComponents/Footer";

export const metadata = {
  title: "Grovii — Transform Ideas Into Complete Video Plans",
  description: "Grovii is a creative planning studio that transforms one idea into a complete, camera-ready content plan: hooks, storyboards, voiceovers, captions, and social versions.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-[#FAF7F2] text-[#3D2B1F] relative selection:bg-[#8B5E3C]/20 selection:text-[#8B5E3C]">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="space-y-0">
        <HeroSection />
        <HowItWorksSection />
        <StoryboardSection />
        <CreativeToolkitBento />
        <TrustStatsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
