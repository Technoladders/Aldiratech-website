import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TrustBar } from "@/components/site/TrustBar";
import { Services } from "@/components/site/Services";
import { ServicesSection } from "@/components/site/ServicesSection";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { CaseStudies } from "@/components/site/CaseStudies";
import { AiSection } from "@/components/site/AiSection";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustBar />
      {/* <Services /> */}
      <ServicesSection />
      <WhyChooseUs />
      <AiSection />
      {/* <CaseStudies /> */}
      <CtaBanner />
      <Footer />
    </main>
  );
};

export default Index;