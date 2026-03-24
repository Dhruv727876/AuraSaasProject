"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  stagger?: number;
  ariaHidden?: boolean;
}

export function TextReveal({ 
  text, 
  className = "", 
  delay = 0, 
  wordDelay = 0.05,
  stagger = 0.02,
  ariaHidden = false
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const words = text.split(" ");
  
  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      aria-hidden={ariaHidden}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          style={{ marginRight: "0.25em" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: delay + (i * wordDelay),
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function CharacterReveal({ 
  text, 
  className = "", 
  delay = 0,
  stagger = 0.01 
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const letters = text.split("");
  
  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          className="inline-block whitespace-pre"
          initial={{ y: "100%", opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: delay + (i * stagger),
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
