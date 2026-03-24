"use client";

import { motion } from "framer-motion";

export function GrainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] opacity-[0.03] select-none">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
