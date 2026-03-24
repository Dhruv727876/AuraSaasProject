"use client";

import { motion, animate, useMotionValue, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { TextReveal } from "../ui/TextReveal";

function Counter({ value, duration = 2, decimals = 0 }: { value: number, duration?: number, decimals?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [value, duration, count, inView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { label: "Uptime Efficiency", value: 99.9, decimals: 1, suffix: "%", sub: "Architectural Precision" },
  { label: "Engineered Nodes", value: 450, decimals: 0, suffix: "+", sub: "Global Edge Network" },
  { label: "Asset Throughput", value: 12, decimals: 0, suffix: "M", sub: "Processed Daily" },
  { label: "Core Latency", value: 15, decimals: 0, suffix: "ms", sub: "Predictable Sync" }
];

export function TechnicalHUD() {
  return (
    <section id="telemetry" className="py-32 w-full bg-background relative border-y border-border/5 overflow-hidden">
      {/* Dynamic Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
           animate={{ y: ["0%", "100%", "0%"] }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="w-full h-px bg-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.5)]"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              className="text-center sm:text-left group relative flex flex-col items-center sm:items-start"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 group-hover:text-primary/60 transition-colors duration-500">
                  Telemetry {stat.label}
                </h4>
              </div>

              <div 
                className="text-4xl xs:text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter mb-4 flex items-baseline justify-center sm:justify-start text-foreground"
                aria-live="polite"
                aria-atomic="true"
              >
                <Counter value={stat.value} duration={2.5} decimals={stat.decimals} />
                <span className="text-primary text-3xl lg:text-5xl ml-1">{stat.suffix}</span>
              </div>

              <div className="flex items-center justify-center sm:justify-between gap-4 mb-2">
                <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">{stat.sub}</p>
                <span className="hidden sm:inline-block text-[9px] font-black text-primary/40 uppercase tracking-tighter">Live_Stream_0{idx+1}</span>
              </div>

              <div className="mt-6 h-[2px] w-full bg-border/10 relative overflow-hidden rounded-full">
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
