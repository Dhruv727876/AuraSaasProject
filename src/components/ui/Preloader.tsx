"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 200); // Snappy exit delay
          return 100;
        }
        // Organic curve aiming for ~1000ms
        const diff = Math.random() * (100 - prev) * 0.15;
        return Math.min(prev + Math.max(diff, 1.5), 100);
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[999999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Background Grid for Preloader */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="w-[200%] h-full bg-[linear-gradient(to_right,#e1e9ee_1px,transparent_1px),linear-gradient(to_bottom,#e1e9ee_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative flex flex-col items-center gap-12 w-full max-w-xs sm:max-w-md px-10">
            {/* Logo Mark Animation */}
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl sm:text-6xl font-black tracking-tighter text-primary uppercase"
              >
                Aura
              </motion.div>
              {/* Spinning Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40%] rounded-full border-t border-r border-primary/20"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-60%] rounded-full border-b border-l border-primary/10"
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40">Initialising Core</span>
                <span className="text-xl font-mono font-black tabular-nums tracking-tighter text-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              
              {/* Progress Bar Track */}
              <div className="h-1.5 w-full bg-primary/5 rounded-full overflow-hidden border border-primary/5 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-primary relative"
                >
                  {/* Glowing end of progress bar */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent shadow-[0_0_20px_rgba(var(--primary),0.8)]" />
                </motion.div>
              </div>

              <div className="flex justify-between mt-4">
                <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">v4.0.26 Build</span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">Monolith Sync Active</span>
              </div>
            </div>
          </div>

          {/* Large Background Word */}
          <motion.div 
            style={{ x: "-20%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
            className="absolute bottom-10 left-0 text-[15rem] leading-none font-black text-primary/[0.02] uppercase select-none pointer-events-none whitespace-nowrap"
          >
            Structural Integrity
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
