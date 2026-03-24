"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const quotes = [
  "Form follows infrastructure.",
  "Elegance is not a luxury, but a necessity of high-performance scale.",
  "Minimalism is the ultimate sophistication of architectural integrity."
];

export function TheVibe() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background overflow-hidden border-y border-border/10 w-full relative">
      <div className="flex flex-col gap-12 md:gap-20 w-full">
        {/* Animated Marquee Row 1 */}
        <div className="w-full overflow-hidden whitespace-nowrap py-4">
           <motion.div style={{ x: x1 }} className="flex gap-20 w-max">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-6xl md:text-[8rem] font-black tracking-tighter opacity-[0.03] uppercase">
                  {quotes[0]} —
                </span>
              ))}
           </motion.div>
        </div>
        
        {/* Centered Main Quote - Decoupled from Scrolling width */}
        <div className="container mx-auto px-6 text-center relative z-10 w-full max-w-full">
           <motion.p 
             initial={{ opacity: 0, scale: 0.9, y: 30 }}
             whileInView={{ opacity: 1, scale: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight max-w-[90vw] md:max-w-5xl mx-auto leading-normal md:leading-relaxed text-foreground whitespace-normal break-words text-balance"
           >
              “We build software not as a tool, but as a structure that breathes. 
              <span className="text-primary italic"> Aura</span> is the monograph where code meets architectural clarity.”
           </motion.p>
        </div>

        {/* Animated Marquee Row 2 */}
        <div className="w-full overflow-hidden whitespace-nowrap py-4">
           <motion.div style={{ x: x2 }} className="flex gap-20 w-max">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-6xl md:text-[8rem] font-black tracking-tighter opacity-[0.03] uppercase">
                  {quotes[1]} —
                </span>
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
}
