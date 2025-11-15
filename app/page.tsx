import CTA_SECTION from "@/components/cta";
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

      <section id="home">
        <HeroSection />
      </section>
      <LogoLoopMarquee />
      <section id="features">
        <FeaturesStep />
      </section>
      <CTA_SECTION />

      <section id="faq">
        <FAQ />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
