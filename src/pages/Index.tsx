import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SolutionsSection from "@/components/SolutionsSection";
import SolarAnimationSection from "@/components/SolarAnimationSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ImpactSection from "@/components/ImpactSection";
import UseCasesSection from "@/components/UseCasesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <SolutionsSection />
      <SolarAnimationSection />
      <HowItWorksSection />
      <ImpactSection />
      <UseCasesSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
