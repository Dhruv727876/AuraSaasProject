import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Gallery } from "@/components/sections/Gallery";
import { Process } from "@/components/sections/Process";
import { TechnicalHUD } from "@/components/sections/TechnicalHUD";
import { TheVibe } from "@/components/sections/TheVibe";
import { Footer } from "@/components/layout/Footer";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center w-full bg-background overflow-x-hidden">
      <Navbar />
      <Hero />

      <SectionReveal>
        <TechnicalHUD />
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <TheVibe />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <Features />
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <Process />
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <Gallery />
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <div className="h-px bg-border/5 w-full max-w-7xl mx-auto my-12" />
        <Pricing />
      </SectionReveal>

      <SectionReveal delay={0.4}>
        <FinalCTA />
      </SectionReveal>

      <Footer />
    </main>
  );
}
