"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, Layout, Users, Shield, X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { TextReveal } from "../ui/TextReveal";
import { Magnetic } from "../ui/Magnetic";

import speedImg from "../../../../public/features_v4/speed.png";
import meshImg from "../../../../public/features_v4/mesh.png";
import studioImg from "../../../../public/features_v4/studio.png";
import integrityImg from "../../../../public/features_v4/integrity.png";

const items = [
  {
    id: "01",
    title: "Rapid Deployment",
    description: "Launch global nodes in sub-second intervals. Zero-buffer architecture for high-velocity teams.",
    icon: Zap,
    image: speedImg,
  },
  {
    id: "02",
    title: "Mesh Networking",
    description: "A liquid structural layer that adapts to load in real-time. Global distribution, local latency.",
    icon: Layout,
    image: meshImg,
  },
  {
    id: "03",
    title: "Collaborative Studio",
    description: "Shared mono-repo environments with synchronized architectural views. Parallel drafting.",
    icon: Users,
    image: studioImg,
  },
  {
    id: "04",
    title: "Core Integrity",
    description: "Multi-layered security protocols ensuring structural soundess at every node with encryption.",
    icon: Shield,
    image: integrityImg,
  }
];

import { useTouchDevice } from "@/hooks/useTouchDevice";

function FeatureCard({ item, idx, onClick }: { item: any; idx: number; onClick: () => void }) {
  const isTouch = useTouchDevice();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileTap={isTouch ? { scale: 0.98 } : {}}
      transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      style={{
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative min-h-[400px] md:min-h-[450px] w-full cursor-pointer flex flex-col items-stretch gap-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/50 border border-border/10 shadow-2xl transition-all duration-700 md:hover:scale-[1.03]"
    >
      <div 
        style={{ transform: isTouch ? "none" : "translateZ(50px)" }}
        className="w-full h-[220px] md:h-[320px] relative overflow-hidden"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-1000 scale-100 md:group-hover:scale-110 opacity-90 md:group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-50 dark:to-zinc-900" />
        <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white">
          <span className="text-[10px] font-black">{item.id}</span>
        </div>
      </div>

      <div 
        style={{ transform: isTouch ? "none" : "translateZ(30px)" }}
        className="flex-1 p-6 md:p-10 relative flex flex-col justify-start"
      >
        <div className="flex items-center gap-3 mb-4">
          <item.icon className="w-4 h-4 text-primary" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Phase {item.id}</span>
        </div>

        <h3 className="text-xl md:text-3xl font-black tracking-tighter mb-4 text-foreground md:group-hover:translate-x-2 transition-transform duration-700">
          {item.title}
        </h3>

        <p className="text-xs md:text-sm text-muted-foreground/80 font-medium leading-relaxed opacity-90 md:group-hover:opacity-100 transition-opacity duration-700">
          {item.description}
        </p>

        <div className="flex items-center gap-2 mt-auto pt-6 group/cta cursor-pointer">
          <Magnetic strength={isTouch ? 0 : 0.2}>
            <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-widest text-primary">
              <span>Explore Blueprint</span>
              <ArrowUpRight className="w-3 h-3 md:group-hover/cta:translate-x-0.5 md:group-hover/cta:-translate-y-0.5 transition-transform" />
            </div>
          </Magnetic>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  });

  return (
    <section id="studio" className="py-24 md:py-32 bg-background relative px-4 sm:px-6 md:px-12 overflow-hidden">
      {/* Background Blueprint Grid (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05]">
        <div className="w-full h-full bg-[size:30px_30px] md:bg-[size:60px_60px] bg-[linear-gradient(to_right,#e1e9ee_1px,transparent_1px),linear-gradient(to_bottom,#e1e9ee_1px,transparent_1px)]" />
      </div>

      <div className="container-vault relative z-10">
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto px-4">
          <span className="text-secondary font-bold uppercase tracking-[0.6em] text-[10px] mb-6 block">The Blueprint</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight text-foreground">
            <TextReveal text="Design without" className="block" delay={0.1} />
            <TextReveal text="boundaries." className="block text-primary italic" delay={0.3} />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {items.map((item, idx) => (
            <FeatureCard 
              key={item.id} 
              item={item} 
              idx={idx} 
              onClick={() => setSelectedIndex(idx)} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && mounted && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-3xl overflow-y-auto"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl rounded-3xl md:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[selectedIndex].image}
                alt={items[selectedIndex].title}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-16">
                <motion.div
                  key={`content-${selectedIndex}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-4 opacity-50">
                    <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white">Feature Reveal</span>
                  </div>
                  <h4 className="text-3xl md:text-6xl font-black tracking-tighter text-white mb-2 md:mb-6 uppercase italic">
                    {items[selectedIndex].title}
                  </h4>
                  <p className="text-sm md:text-lg text-white/60 max-w-2xl font-medium leading-relaxed">
                    {items[selectedIndex].description}
                  </p>
                </motion.div>
              </div>

              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 transition-all border border-white/10 cursor-pointer z-[100]"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between pointer-events-none">
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-xl hover:bg-white/20 transition-all border border-white/5 cursor-pointer pointer-events-auto"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-xl hover:bg-white/20 transition-all border border-white/5 cursor-pointer pointer-events-auto"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </section>
  );
}
