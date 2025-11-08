import FAQ from "@/components/faq";
import { FeaturesStep } from "@/components/features";
import { Footer } from "@/components/footer-section";
import HeroSection from "@/components/hero";

import { LogoLoopMarquee } from "@/components/logo_marquee";
import { TestimonialsSectionDemo } from "@/components/testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      <HeroSection />
      <LogoLoopMarquee />
      <FeaturesStep />
      <FAQ />
      <TestimonialsSectionDemo />

      <Footer />
    </div>
  );
};

export default Home;
