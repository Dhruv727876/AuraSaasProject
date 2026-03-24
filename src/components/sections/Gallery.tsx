"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Magnetic } from "../ui/Magnetic";
import { ArrowUpRight } from "lucide-react";

import infraImg from "../../../public/gallery/infra.png";
import uiFixedImg from "../../../public/gallery/ui-fixed.png";
import monolithImg from "../../../public/gallery/monolith.png";
import blueprintImg from "../../../public/gallery/blueprint.png";
import atriumImg from "../../../public/gallery/atrium.png";
import coreImg from "../../../public/gallery/core.png";

const items = [
  {
    title: "Project Alpha: Atrium",
    category: "Infrastructure",
    image: infraImg,
    details: ["Global Node Mesh", "99.9% Uptime", "Pro-Active Rendering"],
    className: "md:col-span-1"
  },
  {
    title: "Aura v4.0 UI",
    category: "Visual Identity",
    image: uiFixedImg,
    details: ["Fluid Interaction", "Stanza Motion", "Dynamic Docking"],
    className: "md:col-span-1"
  },
  {
    title: "The Monolith",
    category: "Storage Architecture",
    image: monolithImg,
    details: ["Cold S3 Tiers", "Immutable Nodes", "Global Deduplication"],
    className: "md:col-span-1"
  },
  {
    title: "Blueprint Engine",
    category: "Core Systems",
    image: blueprintImg,
    details: ["Low-Level Rust Engine", "Multi-Phase Commit", "Real-Time Sync"],
    className: "md:col-span-1"
  },
  {
    title: "Atrium Studio",
    category: "Workspaces",
    image: atriumImg,
    details: ["Collaborative Vellum", "Voice Integrations", "Shared Design Layers"],
    className: "md:col-span-1"
  },
  {
    title: "Core Node Sync",
    category: "Edge Computing",
    image: coreImg,
    details: ["15ms Latency", "512-Bit Encryption", "Direct peering"],
    className: "md:col-span-1"
  }
];

import { useTouchDevice } from "@/hooks/useTouchDevice";

function GalleryCard({ item, idx }: { item: any; idx: number }) {
  const isTouch = useTouchDevice();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileTap={isTouch ? { scale: 0.98 } : {}}
      transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-start cursor-pointer"
    >
      <div className="relative w-full aspect-[3/4] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black/5 border border-border/10 shadow-xl transition-all duration-700 md:hover:scale-[1.02] md:hover:-translate-y-2">
        <motion.div style={{ y, scale: 1.25 }} className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover opacity-90 transition-opacity duration-700 md:group-hover:opacity-100"
            sizes="(max-width: 768px) 92vw, 30vw"
          />
        </motion.div>
        
        {/* Subtle Overlay Shadow */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-700 ${isTouch ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`} />
        
        {/* Metadata Overlay - Polished Glassmorphism */}
        <div className={`absolute inset-x-4 md:inset-x-6 top-4 md:top-6 flex items-center justify-between transition-all duration-700 pointer-events-none ${isTouch ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0'}`}>
          <Badge variant="outline" className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-primary border-primary/20 bg-primary/20 backdrop-blur-xl py-1 px-3 md:py-1.5 md:px-4 rounded-full">
            {item.category}
          </Badge>
          <span className="text-[10px] text-white/40 font-black italic">v1.{idx}</span>
        </div>
      </div>

      <div className="mt-6 px-2 md:px-4 w-full">
        <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 md:group-hover:text-primary transition-all duration-500 uppercase leading-none">
          {item.title}
        </h3>
        
        {/* Details List */}
        <div className={`space-y-2 mb-6 h-auto md:h-20 transition-all duration-700 delay-100 ${isTouch ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100 translate-y-2 md:group-hover:translate-y-0'}`}>
          {item.details.map((detail: string) => (
            <div key={detail} className="flex items-center gap-2">
              <div className="w-1.5 h-[1px] bg-primary/40" />
              <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">{detail}</span>
            </div>
          ))}
        </div>

        <Magnetic strength={isTouch ? 0 : 0.2}>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary group/link pb-1 border-b border-primary/0 md:hover:border-primary/20 transition-all">
            <span>Explore Document</span>
            <ArrowUpRight className="w-4 h-4 translate-y-0.5 md:group-hover/link:translate-x-0.5 md:group-hover/link:-translate-y-0 transition-transform" />
          </div>
        </Magnetic>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="py-48 bg-background px-4">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 text-center"
        >
          <span className="text-secondary font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">The Monograph</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-[0.85] uppercase">
            Selected <span className="text-primary italic">Works.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/60 font-medium leading-relaxed max-w-3xl mx-auto">
            A high-fidelity archive of engineered digital atmospheres. Each entry represents a structural milestone in the Aura v4.0 ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {items.map((item, idx) => (
            <GalleryCard key={item.title} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
