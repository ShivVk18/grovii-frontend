import Navbar from "@/components/landingPageComponents/Navbar";
import HeroSection from "@/components/landingPageComponents/HeroSection";
import HowItWorksSection from "@/components/landingPageComponents/HowItWorksSection";
import StoryboardPreviewSection from "@/components/landingPageComponents/StoryboardPreviewSection";
import ScriptPreviewSection from "@/components/landingPageComponents/ScriptPreviewSection";
import CaptionPreviewSection from "@/components/landingPageComponents/CaptionPreviewSection";
import MusicSuggestionsSection from "@/components/landingPageComponents/MusicSuggestionsSection";
import RepurposePreviewSection from "@/components/landingPageComponents/RepurposePreviewSection";
import ProductFAQSection from "@/components/landingPageComponents/ProductFAQSection";
import FinalCTASection from "@/components/landingPageComponents/FinalCTASection";
import Footer from "@/components/landingPageComponents/Footer";

export const metadata = {
  title: "Grovii — Transform Ideas Into Complete Content Plans",
  description: "Grovii is a creative planning platform that transforms one idea into a complete, ready-to-shoot content plan: hooks, camera-directed storyboards, voiceover scripts, captions, music, and social repurposing.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main className="space-y-0">
        <HeroSection />
        <HowItWorksSection />
        <StoryboardPreviewSection />
        <ScriptPreviewSection />
        <CaptionPreviewSection />
        <MusicSuggestionsSection />
        <RepurposePreviewSection />
        <ProductFAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
