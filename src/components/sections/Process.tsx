"use client";

import { motion } from "framer-motion";
import { PenTool, Box, HardHat } from "lucide-react";

const steps = [
  {
    title: "Drafting",
    description: "Map your structural nodes on our infinite vellum canvas.",
    icon: PenTool,
    delay: 0.1
  },
  {
    title: "Vellum Sync",
    description: "Our core engine optimizes every byte for the architectural mesh.",
    icon: Box,
    delay: 0.2
  },
  {
    title: "Monograph",
    description: "Export your masterpiece with automated compliance and slas.",
    icon: HardHat,
    delay: 0.3
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-background px-4">
      <div className="container-vault">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="text-secondary font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 leading-tight">
            Structure from Chaos.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step.delay, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-center text-center p-8 rounded-3xl transition-colors duration-500 hover:bg-secondary/20"
              >
                <div className="w-16 h-16 rounded-full bg-white border border-border/10 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium italic">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
