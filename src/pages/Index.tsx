import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SolutionsSection from "@/components/SolutionsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ImpactSection from "@/components/ImpactSection";
import UseCasesSection from "@/components/UseCasesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CursorFollower from "@/components/CursorFollower";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <CursorFollower />
      <Navbar />
      <HeroSection />
      <SolutionsSection />
      <HowItWorksSection />
      <ImpactSection />
      <UseCasesSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
