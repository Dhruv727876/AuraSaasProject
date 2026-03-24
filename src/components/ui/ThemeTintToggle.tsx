"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Check, LayoutDashboard } from "lucide-react";
import { useBlueprint } from "@/components/providers/BlueprintProvider";

const TINTS = [
  { name: "Aura Prime", hue: 243, color: "#4f46e5", label: "Standard Build" },
  { name: "Vellum Gold", hue: 38, color: "#d97706", label: "Premium Drafting" },
  { name: "Crimson Sync", hue: 345, color: "#be123c", label: "Critical Analysis" },
  { name: "Emerald Mesh", hue: 160, color: "#059669", label: "Core Ecosystem" },
  { name: "Amber Archive", hue: 25, color: "#ea580c", label: "Solar Array" },
  { name: "Slate Monolith", hue: 215, color: "#475569", label: "Structural" },
];

export function ThemeTintToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHue, setActiveHue] = useState(38);
  const { isBlueprint, toggleBlueprint } = useBlueprint();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHue = localStorage.getItem("aura-tint");
    if (savedHue) {
      const hue = parseInt(savedHue);
      setActiveHue(hue);
      document.documentElement.style.setProperty("--primary-hue", hue.toString());
    } else {
      // Ensure Vellum Gold is explicitly set as default if no preference exists
      document.documentElement.style.setProperty("--primary-hue", "38");
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const setTint = (hue: number) => {
    setActiveHue(hue);
    document.documentElement.style.setProperty("--primary-hue", hue.toString());
    localStorage.setItem("aura-tint", hue.toString());
    setIsOpen(false);
  };

  return (
    <div className="fixed left-8 bottom-8 z-[100]" ref={containerRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            className="absolute bottom-16 left-0 bg-background/80 backdrop-blur-xl border border-border p-3 rounded-2xl shadow-2xl flex flex-col gap-2 min-w-[180px]"
          >
            <div className="flex flex-col gap-1 mb-2 px-2">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                Architectural Mode
              </div>
              <button
                onClick={() => { toggleBlueprint(); setIsOpen(false); }}
                className={`group flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-all duration-300 transform active:scale-95 text-left border ${isBlueprint ? "bg-primary text-white border-primary" : "bg-primary/5 hover:bg-primary/10 border-primary/20"}`}
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className={`w-3.5 h-3.5 ${isBlueprint ? "text-white" : "text-primary"}`} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">
                    Blueprint Mode
                  </span>
                </div>
                {isBlueprint && <Check className="w-3 h-3 text-white" />}
              </button>
            </div>

            <div className="h-px bg-border/50 w-full mb-1" />

            <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 px-2">
              Environmental Preset
            </div>
            {TINTS.map((tint) => (
              <button
                key={tint.hue}
                onClick={() => setTint(tint.hue)}
                className="group flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-primary transition-all duration-300 transform active:scale-95 text-left"
              >
                <div className="flex flex-col items-start gap-0.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ring-offset-2 ring-transparent transition-all duration-500 ${activeHue === tint.hue && !isBlueprint ? "ring-2 ring-primary" : ""}`}
                      style={{ backgroundColor: tint.color }}
                    />
                    <span className={`text-[10px] font-black uppercase tracking-tighter transition-colors ${activeHue === tint.hue ? "text-white" : "group-hover:text-white"}`}>
                      {tint.name}
                    </span>
                  </div>
                  <span className={`text-[8px] font-bold opacity-40 uppercase tracking-widest ${activeHue === tint.hue ? "text-white" : "group-hover:text-white"}`}>
                    {tint.label}
                  </span>
                </div>
                {activeHue === tint.hue && <Check className="w-3 h-3 text-white ml-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme tint menu"
        className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95 group"
      >
        <Settings2 className={`w-5 h-5 transition-transform duration-500 ${isOpen ? "rotate-90" : "group-hover:rotate-180"}`} />
      </button>
    </div>
  );
}
