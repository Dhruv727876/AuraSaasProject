"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Database, Globe, Share2, Terminal, Layers } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { title: "Engine", links: ["Distillation", "Vellum", "Stanza", "Aura v4.0"] },
    { title: "Network", links: ["Edge Nodes", "Global Mesh", "Protocol X", "Integrity"] },
    { title: "Studio", links: ["Manifesto", "Case Studies", "Laboratory", "Privacy"] },
  ];

  const genericIcons = [
    { icon: Share2, label: "Share" },
    { icon: Globe, label: "Network" },
    { icon: Terminal, label: "Console" },
  ];

  return (
    <footer className="w-full bg-background pt-32 pb-12 px-6 border-t border-border/5 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <a href="/" className="text-2xl font-black uppercase tracking-tighter mb-8 block">
              Aura<span className="text-primary italic">.</span>
            </a>
            <p className="text-sm text-muted-foreground/60 leading-relaxed font-medium mb-10 max-w-xs">
              Architecting the boundaries of digital infrastructure through high-fidelity distillation.
            </p>
            <div className="flex gap-4">
              {genericIcons.map((s, i) => (
                <Magnetic key={i} strength={0.3}>
                  <div className="w-10 h-10 rounded-full border border-border/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/20 transition-all hover:bg-primary/5 cursor-pointer">
                    <s.icon className="w-4 h-4" />
                  </div>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {links.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 underline decoration-primary/20 underline-offset-8">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm font-medium text-muted-foreground/60 hover:text-primary transition-colors flex items-center gap-1 group">
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border/5 flex items-center justify-center text-center">
          <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 flex flex-wrap items-center justify-center gap-4">
            <span>© {currentYear} Designed and Developed by Dhruv</span>
            <span className="opacity-20 hidden md:inline">|</span>
            <span className="hover:text-primary transition-colors cursor-help">Powered by HRILAX</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
