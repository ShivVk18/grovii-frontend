import Navbar from "@/components/landingPageComponents/Navbar";
import HeroSection from "@/components/landingPageComponents/HeroSection";
import HowItWorksSection from "@/components/landingPageComponents/HowItWorksSection";
import PricingSection from "@/components/landingPageComponents/PricingSection";
import Footer from "@/components/landingPageComponents/Footer";

export default function LandingPage() {
  return (
    <div className=" min-h-screen  bg-gradient-to-b from-white to-orange-50 font-sans dark:bg-black">
     <Navbar/> 
     <HeroSection />
     <HowItWorksSection/>
     <PricingSection/>
     <Footer/>
    </div>
  );
}
