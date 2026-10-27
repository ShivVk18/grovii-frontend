import ScrollProgress from "@/components/landingPageComponents/ScrollProgress";
import CursorGlow from "@/components/landingPageComponents/CursorGlow";
import Navbar from "@/components/landingPageComponents/Navbar";
import HeroSection from "@/components/landingPageComponents/HeroSection";
import HowItWorksSection from "@/components/landingPageComponents/HowItWorksSection";
import CreatorBenefitsSection from "@/components/landingPageComponents/CreatorBenefitsSection";
import StoryboardSection from "@/components/landingPageComponents/StoryboardSection";
import CreativeToolkitBento from "@/components/landingPageComponents/CreativeToolkitBento";
import TrustStatsSection from "@/components/landingPageComponents/TrustStatsSection";
import FinalCTASection from "@/components/landingPageComponents/FinalCTASection";
import Footer from "@/components/landingPageComponents/Footer";

export const metadata = {
  title: "Grovii — The AI Pre-Production Studio for Creators",
  description: "Turn your ideas into videos you actually want to shoot. Grovii generates viral hooks, scene-by-scene shoot plans, camera angles, and voiceover scripts in 30 seconds.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-background text-foreground relative selection:bg-primary/20">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="space-y-0">
        <HeroSection />
        <HowItWorksSection />
        <CreatorBenefitsSection />
        <StoryboardSection />
        <CreativeToolkitBento />
        <TrustStatsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
