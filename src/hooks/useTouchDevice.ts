"use client";

import { useState, useEffect } from "react";

export function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          (navigator as any).msMaxTouchPoints > 0
      );
    };

    checkTouch();
    window.addEventListener("touchstart", () => setIsTouch(true), { once: true });
    
    return () => {
      window.removeEventListener("touchstart", () => setIsTouch(true));
    };
  }, []);

  return isTouch;
}
