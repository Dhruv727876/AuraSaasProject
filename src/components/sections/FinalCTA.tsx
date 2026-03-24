"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowRight, Terminal, Globe, Cpu } from "lucide-react";
import { WaitlistTrigger } from "@/components/providers/WaitlistProvider";
import { useTouchDevice } from "@/hooks/useTouchDevice";

export function FinalCTA() {
  const isTouch = useTouchDevice();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isTouch) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-24 px-4 md:px-6 bg-background relative w-full flex flex-col items-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[80vw] md:h-[80vw] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] opacity-50" />
      </div>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 w-full max-w-6xl group p-0.5 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent shadow-2xl"
      >
        <div className="relative rounded-[1.9rem] md:rounded-[2.9rem] bg-zinc-950/90 backdrop-blur-3xl p-8 md:p-16 overflow-hidden border border-white/5 flex flex-col items-center text-center">
          
          {/* Scanning Beam Effect */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute top-0 bottom-0 w-64 bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12 pointer-events-none"
          />

          {/* Internal Grid - Architectural Detail */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div 
            style={{ transform: isTouch ? "none" : "translateZ(60px)" }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Architectural Status HUD */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 md:gap-6 mb-10 overflow-x-auto max-w-full pb-2 no-scrollbar"
            >
              {[
                { icon: Globe, label: "Global Node", status: "Active" },
                { icon: Cpu, label: "Core Sync", status: "99.9%" },
                { icon: Terminal, label: "Manifest", status: "v4.0" }
              ].map((hud, i) => (
                <div key={i} className={`flex items-center gap-2 transition-opacity ${isTouch ? 'opacity-80' : 'opacity-40 group-hover:opacity-100'}`}>
                  <hud.icon className="w-3 h-3 text-primary shrink-0" />
                  <div className="flex flex-col items-start leading-none text-left shrink-0">
                    <span className="text-[7px] font-black uppercase tracking-widest text-white/40">{hud.label}</span>
                    <span className="text-[8px] font-bold text-primary">{hud.status}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            <h2 className="text-4xl xs:text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.85] uppercase italic">
              Ready to <br /> 
              <span className="text-primary not-italic">Synchronize?</span>
            </h2>

            <p className="text-xs md:text-sm lg:text-lg text-white/40 mb-10 leading-relaxed font-medium max-w-xl px-4 uppercase tracking-[0.2em] md:tracking-[0.3em]">
              Draft your architectural legacy within the Aura mesh. <br className="hidden md:block" />
              Join the elite builders of the fluid internet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 items-center justify-center w-full sm:w-auto">
              <Magnetic strength={isTouch ? 0 : 0.4}>
                <WaitlistTrigger>
                  <Button size="lg" className="rounded-full w-full sm:w-auto px-10 md:px-16 py-7 md:py-9 text-lg md:text-xl font-black bg-primary text-primary-foreground transition-all duration-700 uppercase tracking-tighter shadow-[0_10px_50px_rgba(var(--primary),0.3)]">
                    Join Waitlist <ArrowRight className="ml-4 w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                </WaitlistTrigger>
              </Magnetic>
              
              <Magnetic strength={isTouch ? 0 : 0.2}>
                <Button variant="outline" size="lg" className="rounded-full w-full sm:w-auto px-10 md:px-16 py-7 md:py-9 text-lg md:text-xl font-black text-white/50 border-white/5 hover:bg-white/5 transition-all duration-700 uppercase tracking-tighter backdrop-blur-md">
                  View Docs
                </Button>
              </Magnetic>
            </div>
          </div>

          {/* Telemetry Annotations */}
          <div className="absolute bottom-6 md:bottom-10 inset-x-8 md:inset-x-16 flex justify-between items-end opacity-20 pointer-events-none">
            <div className="flex flex-col items-start gap-1">
              <span className="text-[6px] md:text-[7px] font-mono font-black text-white uppercase tracking-widest">Protocol: AURA_SYNC_v4.0.1</span>
              <span className="text-[6px] md:text-[7px] font-mono font-black text-white uppercase tracking-widest">Lat: 00.243.09 // Lng: 12.001.AF</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[6px] md:text-[7px] font-mono font-black text-white uppercase tracking-widest">Status: Ready_For_Migration</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
