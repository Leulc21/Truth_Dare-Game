import { CtaSection } from "@/components/cta_Section";
import FAQ from "@/components/faq";
import { FeaturesStep } from "@/components/features";
import { Footer } from "@/components/footer-section";
import HeroSection from "@/components/hero";

import { LogoLoopMarquee } from "@/components/logo_marquee";
import { Navbar } from "@/components/navbar";
import Testimonials from "@/components/testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <Navbar />

      <HeroSection />
      <LogoLoopMarquee />
      <FeaturesStep />

      <FAQ />
      <CtaSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
