"use client";

import { useCallback, useRef } from "react";

export function useSoundEffects() {
  const audioCtx = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playHover = useCallback((freq = 440, type: OscillatorType = "sine", duration = 0.1) => {
    initAudio();
    if (!audioCtx.current) return;

    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.current.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);

    gain.gain.setValueAtTime(0, audioCtx.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, audioCtx.current.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.current.currentTime + duration);

    osc.start();
    osc.stop(audioCtx.current.currentTime + duration);
  }, []);

  const playClick = useCallback(() => {
    playHover(220, "square", 0.05);
  }, [playHover]);

  return { playHover, playClick };
}
