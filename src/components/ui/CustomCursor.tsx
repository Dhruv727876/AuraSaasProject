"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='view']")) {
        setCursorType("view");
      } else if (target.closest("[data-cursor='drag']")) {
        setCursorType("drag");
      } else if (target.closest("button, a, [role='button']") || (target instanceof HTMLElement && window.getComputedStyle(target).cursor === "pointer")) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (!isMounted || isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: !isVisible ? 0 : cursorType === "pointer" ? 1.5 : cursorType === "view" ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-300 border backdrop-blur-[2px] ${
          cursorType === "pointer" 
          ? "bg-primary/20 border-primary/40" 
          : cursorType === "view"
          ? "bg-white/80 border-white text-black"
          : "bg-primary/10 border-primary/30"
        }`}
      >
        <AnimatePresence mode="wait">
          {cursorType === "view" && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[8px] font-black uppercase tracking-tighter"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Secondary trailing cursor (subtle) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 0.3 : 0,
        }}
        className="w-1.5 h-1.5 bg-primary rounded-full"
      />
    </div>
  );
}
