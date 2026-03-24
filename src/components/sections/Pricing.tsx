"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Shield, Layout, Users } from "lucide-react";
import { TextReveal } from "../ui/TextReveal";
import { Magnetic } from "../ui/Magnetic";

const plans = [
  {
    name: "Architect",
    price: { monthly: 99, yearly: 89 },
    description: "For individual draftsmen and high-performance solo projects.",
    features: [
      "100k Monthly Node Transitions",
      "Global Mesh Access (Edge)",
      "Standard Shard Encryption",
      "Private Asset Registry",
      "Community Technical Support"
    ],
    cta: "Start Drafting",
    icon: Zap
  },
  {
    name: "Studio",
    price: { monthly: 249, yearly: 199 },
    description: "For elite architectural teams requiring deep collaboration.",
    popular: true,
    features: [
      "Unlimited Node Transitions",
      "Priority Global Mesh (Edge+)",
      "512-bit Military Shard Encryption",
      "Shared Workflow Analytics",
      "Direct Engineer Line (24h)",
      "Custom Asset Schemas"
    ],
    cta: "Go Pro Studio",
    icon: Layout
  },
  {
    name: "Monolith",
    price: { monthly: 899, yearly: 749 },
    description: "Tailored infrastructure for enterprise-scale global operations.",
    features: [
      "Full Monolith Infrastructure",
      "Isolated Private Core",
      "Dedicated Technical Strategist",
      "White-label Technical HUD",
      "SLA 99.999% Guarantee",
      "On-premise Shard Proxy"
    ],
    cta: "Contact Strategy",
    icon: Shield
  }
];

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-32 bg-background relative overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(var(--primary),0.02)_0%,transparent_70%)] rounded-full blur-3xl opacity-50" />

      <div className="container-vault relative z-10">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <span className="text-secondary font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Tiered Infrastructure</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 text-foreground overflow-hidden">
            <TextReveal text="Precision pricing" className="block" />
            <TextReveal text="at any scale." className="block italic" delay={0.2} />
          </h2>

          {/* Advanced Billing Toggle */}
          <div className="flex items-center justify-center gap-6 mt-12 bg-primary/5 p-1.5 rounded-full border border-primary/10 w-fit mx-auto backdrop-blur-3xl">
            <button
              onClick={() => setBilling("monthly")}
              className={`relative px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-500 cursor-pointer overflow-hidden ${billing === "monthly" ? "text-white" : "text-muted-foreground/60 hover:text-primary"}`}
            >
              {billing === "monthly" && (
                <motion.div layoutId="billing-pill" className="absolute inset-0 bg-primary z-0" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`relative px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-500 cursor-pointer overflow-hidden ${billing === "yearly" ? "text-white" : "text-muted-foreground/60 hover:text-primary"}`}
            >
              {billing === "yearly" && (
                <motion.div layoutId="billing-pill" className="absolute inset-0 bg-primary z-0" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10 flex items-center gap-2">
                Yearly
                <span className="text-[9px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20">-20%</span>
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative p-8 md:p-12 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border transition-all duration-700 hover:scale-[1.02] flex flex-col group ${plan.popular ? "border-primary/40 shadow-[0_20px_50px_-20px_rgba(var(--primary),0.3)] bg-white dark:bg-black" : "border-border/10 shadow-xl"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-white text-[9px] font-black uppercase tracking-[0.3em] shadow-xl z-20">
                  Recommended Studio
                </div>
              )}

              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-inner ${plan.popular ? "bg-primary text-white" : "bg-primary/5 text-primary"}`}>
                  <plan.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold tracking-tighter text-foreground">{plan.name}</h3>
              </div>

              <p className="text-sm text-muted-foreground/80 mb-10 font-medium leading-relaxed min-h-[50px]">
                {plan.description}
              </p>

              <div className="flex items-baseline gap-2 mb-10 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={billing}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl font-black tracking-tighter text-foreground"
                  >
                    ${plan.price[billing as keyof typeof plan.price]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-muted-foreground/50 font-bold uppercase tracking-widest text-[10px]">/ period</span>
              </div>

              <ul className="space-y-5 mb-12 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-4 text-sm font-medium text-foreground/80 group/feature">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 group-hover/feature:scale-125 transition-transform" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Magnetic strength={0.2}>
                <button className={`w-full py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 cursor-pointer group/cta ${plan.popular ? "bg-primary text-white shadow-xl hover:bg-primary/90" : "bg-zinc-200 dark:bg-zinc-800 text-foreground hover:bg-primary hover:text-white"}`}>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-2 transition-transform" />
                </button>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
