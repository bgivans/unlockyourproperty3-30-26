import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/HeroSection";
import PropertyOptionsSection from "@/components/PropertyOptionsSection";
import HowWeHelpSection from "@/components/HowWeHelpSection";
import DecideSection from "@/components/DecideSection";
import StrategyFormSection from "@/components/StrategyFormSection";

const Index = () => {
  return (
    <main>
      <Helmet>
        <title>Unlock Your Property — Real Estate Strategy for Complex Properties</title>
      </Helmet>
      <HeroSection />
      <PropertyOptionsSection />
      <HowWeHelpSection />
      <DecideSection />
      <StrategyFormSection />
    </main>
  );
};

export default Index;
