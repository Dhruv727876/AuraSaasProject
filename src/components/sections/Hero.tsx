"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import dashboardMockup from "../../../public/dashboard_mockup.png";
import { TextReveal } from "../ui/TextReveal";
import { useWaitlist, WaitlistTrigger } from "@/components/providers/WaitlistProvider";
import { AuraBackground } from "../ui/AuraBackground";
import { Magnetic } from "../ui/Magnetic";
import { Button } from "@/components/ui/button";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const { open } = useWaitlist();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="manifesto" ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-background">
      <AuraBackground />
      <div className="container-vault relative z-10 text-center flex flex-col items-center">

        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
          </span>
          Engine v4.0 Active
        </motion.div>

        {/* SEO-focused H1 with Split-Text Animation */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tighter leading-[0.9] mb-8 text-foreground text-center">
          <span className="sr-only">The Ultimate NextJS SaaS Template</span>
          <span aria-hidden="true" className="flex flex-col items-center justify-center">
            <TextReveal text="Ship Your Next" className="block" delay={0.2} /> 
            <TextReveal text="SaaS Product" className="block italic text-primary" delay={0.4} /> 
            <TextReveal text="In Minutes." className="block" delay={0.6} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed px-4 text-balance"
        >
          A masterfully crafted, high-performance architectural foundation for your next digital platform. Beautifully engineered, completely customizable, and ready to scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-20 px-4"
        >
          {/* Replaced existing buttons with the new structure */}
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Magnetic strength={0.4}>
                <WaitlistTrigger>
                  <Button size="lg" className="rounded-full px-12 py-8 text-lg font-black bg-primary text-primary-foreground hover:scale-110 shadow-2xl transition-all duration-500 uppercase tracking-tighter">
                    Join Waitlist
                  </Button>
                </WaitlistTrigger>
              </Magnetic>
              
              <Magnetic strength={0.2}>
                <button
                  aria-label="Watch the Aura manifesto video"
                  className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-foreground hover:text-primary transition-colors cursor-pointer px-6"
                >
                  <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                    <PlayCircle className="w-5 h-5" />
                  </div>
                  Watch Manifesto
                </button>
              </Magnetic>
            </div>
        </motion.div>

        {/* Dashboard Mockup - SEO Priority Image */}
        <motion.div
          style={{ y: y1, scale, opacity }}
          className="relative max-w-6xl mx-auto px-4 md:px-0"
        >
          <div className="relative aspect-[16/10] w-full rounded-[2.5rem] overflow-hidden border border-border shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] bg-zinc-900 group">
            <Image
              src={dashboardMockup}
              alt="Aura Architectural Analytics Dashboard"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover opacity-90 transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

            {/* Functional Spotlight Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary),0.15),transparent_50%)]" />
          </div>

          {/* Decorative UI elements */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.5 }}
            className="absolute -left-12 top-1/4 hidden lg:block w-48 p-4 rounded-2xl bg-background/80 backdrop-blur-xl border border-border shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">Node Health</span>
            </div>
            <div className="h-1 w-full bg-border/20 rounded-full overflow-hidden">
              <div className="h-full w-[85%] bg-emerald-500" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle,rgba(var(--primary),0.03)_0%,transparent_70%)] rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(var(--secondary),0.03)_0%,transparent_70%)] rounded-full blur-3xl opacity-30" />
      </div>
    </section>
  );
}
