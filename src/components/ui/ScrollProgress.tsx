"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentSection, setCurrentSection] = useState("MANIFESTO");
  const scrollValue = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return scrollValue.onChange((latest) => {
      setDisplayValue(Math.round(latest));
      
      // Basic section detection based on percentage
      if (latest < 20) setCurrentSection("MANIFESTO");
      else if (latest < 45) setCurrentSection("BLUEPRINT");
      else if (latest < 70) setCurrentSection("GALLERY");
      else if (latest < 90) setCurrentSection("TELEMETRY");
      else setCurrentSection("SYNC");
    });
  }, [scrollValue]);

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-end gap-12 pointer-events-none">
      {/* Structural Data HUD */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-[10px] font-black tracking-[0.3em] text-primary/40 uppercase">Structural_Progress</span>
        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-3xl font-black tracking-tighter text-foreground tabular-nums">
            {displayValue.toString().padStart(3, "0")}
          </span>
          <span className="text-[10px] font-bold text-primary opacity-60">%_SYNC</span>
        </div>
      </div>

      {/* The Gauge - Compact Structural Track */}
      <div className="h-40 w-[2px] bg-primary/10 relative rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-primary origin-top"
          style={{ scaleY }}
        />
        
        {/* Subtle Markers */}
        {[0, 25, 50, 75, 100].map((marker) => (
          <div 
            key={marker}
            className="absolute left-0 w-4 h-[1px] bg-primary/20"
            style={{ top: `${marker}%` }}
          />
        ))}
      </div>

      {/* Active Module Reference */}
      <div className="flex flex-col items-end">
        <span className="text-[8px] font-black tracking-[0.4em] text-muted-foreground/30 uppercase mb-1">Active_Module</span>
        <motion.div
          key={currentSection}
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-[11px] font-black tracking-widest text-primary uppercase italic"
        >
          {currentSection}
        </motion.div>
      </div>

      {/* Coordinate Reference */}
      <div className="flex flex-col items-end opacity-20 group">
        <span className="text-[7px] font-bold uppercase tracking-tighter">Lat: 00.243.09</span>
        <span className="text-[7px] font-bold uppercase tracking-tighter">Lng: 12.001.AF</span>
      </div>
    </div>
  );
}
