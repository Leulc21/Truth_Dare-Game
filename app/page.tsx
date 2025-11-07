import FAQ from "@/components/faq";
import { FeaturesStep } from "@/components/features1";
import { Footer } from "@/components/footer-section";

import Hero1 from "@/components/hero1";
import { LogoLoopMarquee } from "@/components/logo_marquee";
import { TestimonialsSectionDemo } from "@/components/testimonials";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      <Hero1 />
      <LogoLoopMarquee />
      <FeaturesStep />
      <FAQ />
      <TestimonialsSectionDemo />

      <Footer />
    </div>
  );
};

export default Home;
