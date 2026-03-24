"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid architectural license or email."),
  interest: z.string().min(1, "Please select an interest area."),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

interface WaitlistContextType {
  open: () => void;
  close: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Waitlist data:", data);
    setIsSubmitted(true);
    toast.success("Synchronized successfully. Welcome to Aura.");
  };

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 500);
  };

  return (
    <WaitlistContext.Provider value={{ open: () => setIsOpen(true), close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-background border border-border rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Technical Gradient Header */}
              <div className="h-2 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
              
              <div className="p-8 sm:p-12">
                <button 
                  onClick={close}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {!isSubmitted ? (
                  <div className="flex flex-col gap-8">
                    <div className="space-y-2 text-center sm:text-left">
                      <h2 className="text-3xl font-black uppercase tracking-tighter">Enter the Aura</h2>
                      <p className="text-muted-foreground text-sm font-medium">Join the elite synchronization of architectural clarity. Priority builds start Q3 2026.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Registry Email</label>
                        <input
                          {...register("email")}
                          placeholder="dhruv@aura.build"
                          className="w-full px-6 py-4 bg-muted/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                        {errors.email && <p className="text-destructive text-[10px] font-bold uppercase ml-1">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Focus Area</label>
                        <select
                          {...register("interest")}
                          className="w-full px-6 py-4 bg-muted/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
                        >
                          <option value="">Select Structure</option>
                          <option value="parametric">Parametric Design</option>
                          <option value="analytics">Structural Analytics</option>
                          <option value="rendering">Neural Rendering</option>
                          <option value="enterprise">Enterprise OS</option>
                        </select>
                        {errors.interest && <p className="text-destructive text-[10px] font-bold uppercase ml-1">{errors.interest.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full relative px-10 py-5 bg-primary text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_-15px_rgba(var(--primary),0.3)] flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>Synchronize <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center gap-6 py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black uppercase tracking-tighter">Identity Verified</h2>
                      <p className="text-muted-foreground text-sm font-medium">You have been added to the high-integrity queue. We will contact your registry soon.</p>
                    </div>
                    <button
                      onClick={close}
                      className="mt-4 px-8 py-3 border border-border rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-colors"
                    >
                      Clear Terminal
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error("useWaitlist must be used within a WaitlistProvider");
  }
  return context;
}

export function WaitlistTrigger({ children }: { children: React.ReactNode }) {
  const { open } = useWaitlist();
  return (
    <span onClick={open} className="inline-block h-full cursor-pointer">
      {children}
    </span>
  );
}
