import Navbar from "@/components/landingPageComponents/Navbar";
import HeroSection from "@/components/landingPageComponents/HeroSection";
import HowItWorksSection from "@/components/landingPageComponents/HowItWorksSection";
import PricingSection from "@/components/landingPageComponents/PricingSection";
import Footer from "@/components/landingPageComponents/Footer";

export const metadata = {
  title: "Grovii — AI Reel Studio for Creators",
  description: "Turn your ideas into scroll-stopping video scripts with AI. A visual storyboard workspace built for high-growth creators.",
};

export default function LandingPage() {
  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #FAF7F2 0%, #FFF7F0 50%, #FAF7F2 100%)",
        color: "#3D2B1F",
      }}
    >
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <PricingSection />
      <Footer />
    </div>
  );
}

