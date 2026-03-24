"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useWaitlist } from "@/components/providers/WaitlistProvider";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useWaitlist();
  
  const navLinks = [
    { name: "Engine", href: "#" },
    { name: "Scale", href: "#" },
    { name: "Manifesto", href: "#vibe" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="/" className="text-xl font-black uppercase tracking-tighter">
            Aura<span className="text-primary prose-invert">.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={open}
            aria-label="Join waitlist"
            className="hidden md:block px-6 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            Start Project
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 text-foreground cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-background border-b border-border p-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-border" />
              <button 
                onClick={() => {
                  setIsOpen(false);
                  open();
                }}
                className="w-full py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Start Project <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
