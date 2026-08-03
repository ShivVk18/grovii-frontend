import Navbar from "@/components/landingPageComponents/Navbar";
import HeroSection from "@/components/landingPageComponents/HeroSection";
import AnimatedPipelineSection from "@/components/landingPageComponents/AnimatedPipelineSection";
import InteractiveDemoSection from "@/components/landingPageComponents/InteractiveDemoSection";
import SceneGeneratorSection from "@/components/landingPageComponents/SceneGeneratorSection";
import AITeamSection from "@/components/landingPageComponents/AITeamSection";
import WorkflowTimelineSection from "@/components/landingPageComponents/WorkflowTimelineSection";
import PricingSection from "@/components/landingPageComponents/PricingSection";
import Footer from "@/components/landingPageComponents/Footer";

export const metadata = {
  title: "Grovii — AI Creative Director & Storyboard Studio",
  description: "Turn one raw idea into a complete production-ready shoot plan: hooks, 5-scene storyboards, camera angles, lighting setup, scripts, music vibes, captions, and social repurposing.",
};

export default function LandingPage() {
  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden text-[#5C4033] selection:bg-[#8B5E3C]/20 selection:text-[#8B5E3C]"
      style={{
        background: "linear-gradient(180deg, #FAF7F2 0%, #FFF7F0 50%, #FAF7F2 100%)",
      }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <AnimatedPipelineSection />
        <InteractiveDemoSection />
        <SceneGeneratorSection />
        <AITeamSection />
        <WorkflowTimelineSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
