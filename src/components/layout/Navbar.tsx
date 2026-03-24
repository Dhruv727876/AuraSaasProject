"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { useSoundEffects } from "@/hooks/useSoundEffects";

import { Menu, X } from "lucide-react";

export function Navbar() {
  const { scrollY } = useScroll();
  const { playHover, playClick } = useSoundEffects();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const width = useTransform(scrollY, [0, 50], ["100%", "94%"]);
  const padding = useTransform(scrollY, [0, 50], ["1.25rem 1.5rem", "0.6rem 1rem"]);
  const borderRadius = useTransform(scrollY, [0, 50], ["0px", "50px"]);
  const backgroundColor = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.6)"]);
  const border = useTransform(scrollY, [0, 50], ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0.1)"]);
  const top = useTransform(scrollY, [0, 50], ["0px", "12px"]);

  const navItems = [
    { name: "Manifesto", id: "manifesto" },
    { name: "Telemetry", id: "telemetry" },
    { name: "Studio", id: "studio" },
    { name: "Method", id: "process" },
    { name: "Gallery", id: "gallery" },
  ];

  return (
    <>
      <motion.nav 
        style={{
          width,
          padding,
          borderRadius,
          backgroundColor,
          border,
          top,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-50 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex items-center justify-between pointer-events-auto"
      >
        <div className="flex items-center gap-6 lg:gap-12">
          <Link 
            href="/" 
            onMouseEnter={() => playHover(880)}
            onClick={() => playClick()}
            className="text-xl lg:text-2xl font-black tracking-tighter text-primary group transition-all duration-300"
          >
            <motion.span whileTap={{ scale: 0.9 }} className="inline-block uppercase">AURA</motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navItems.map((item) => (
              <Link 
                key={item.id} 
                href={`#${item.id}`} 
                onMouseEnter={() => playHover(660)}
                onClick={() => playClick()}
                className="text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 relative group overflow-hidden"
              >
                {item.name}
                <span className="absolute bottom-[-2px] left-0 w-full h-[1.5px] bg-primary translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden sm:flex items-center gap-2 lg:gap-4">
            <Magnetic>
              <Button 
                variant="ghost" 
                onMouseEnter={() => playHover(440)}
                onClick={() => playClick()}
                className="rounded-full px-4 lg:px-6 text-[10px] lg:text-xs font-black uppercase tracking-widest hover:bg-transparent"
              >
                Login
              </Button>
            </Magnetic>
            <Magnetic>
              <Button 
                onMouseEnter={() => playHover(330)}
                onClick={() => playClick()}
                className="rounded-full px-4 lg:px-6 text-[10px] lg:text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/10"
              >
                Join Waitlist
              </Button>
            </Magnetic>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              playClick();
            }}
            className="md:hidden p-2 text-primary bg-primary/5 rounded-full"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[49] bg-background/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-8 pt-24"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-xs">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={`#${item.id}`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      playClick();
                    }}
                    className="block w-full text-center text-4xl font-black tracking-tighter text-foreground hover:text-primary transition-colors py-4 border-b border-primary/5"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-4 w-full mt-8">
                <Button className="w-full py-8 text-lg font-black uppercase tracking-widest rounded-3xl">Join Waitlist</Button>
                <Button variant="outline" className="w-full py-8 text-lg font-black uppercase tracking-widest rounded-3xl">Login</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
