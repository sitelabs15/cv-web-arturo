import { useEffect, useState } from "react";
import type { Variants } from "framer-motion";

// Shared easing constants from reference design
export const easeSnappy = [0.16, 1, 0.3, 1];
export const easeOutQuint = [0.22, 1, 0.36, 1];
export const easeInOutExpo = [0.87, 0, 0.13, 1];
export const PREMIUM_EASE = easeSnappy;

/**
 * Hook to check if the user has enabled prefers-reduced-motion in their OS.
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}

// Reusable motion variants (prefers-reduced-motion adaptive)

export const fadeIn = (reduced: boolean = false): Variants => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.35, ease: easeSnappy }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: easeSnappy }
  }
});

export const fadeUp = (reduced: boolean = false): Variants => ({
  initial: { 
    opacity: 0, 
    y: reduced ? 0 : 24,
    filter: reduced ? "none" : "blur(4px)" 
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeOutQuint }
  },
  exit: {
    opacity: 0,
    y: reduced ? 0 : -16,
    filter: reduced ? "none" : "blur(3px)",
    transition: { duration: 0.35, ease: easeSnappy }
  }
});

export const fadeDown = (reduced: boolean = false): Variants => ({
  initial: { 
    opacity: 0, 
    y: reduced ? 0 : -24,
    filter: reduced ? "none" : "blur(4px)" 
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: easeOutQuint }
  },
  exit: {
    opacity: 0,
    y: reduced ? 0 : 16,
    filter: reduced ? "none" : "blur(3px)",
    transition: { duration: 0.35, ease: easeSnappy }
  }
});

export const scaleIn = (reduced: boolean = false): Variants => ({
  initial: { 
    opacity: 0, 
    scale: reduced ? 1 : 0.96,
    filter: reduced ? "none" : "blur(4px)" 
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: easeSnappy }
  },
  exit: {
    opacity: 0,
    scale: reduced ? 1 : 0.98,
    filter: reduced ? "none" : "blur(3px)",
    transition: { duration: 0.3, ease: easeSnappy }
  }
});

export const blurIn = (reduced: boolean = false): Variants => ({
  initial: { 
    opacity: 0, 
    filter: reduced ? "none" : "blur(8px)" 
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: easeOutQuint }
  },
  exit: {
    opacity: 0,
    filter: reduced ? "none" : "blur(6px)",
    transition: { duration: 0.3, ease: easeSnappy }
  }
});

// Stagger variants
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12, // Replicates Crafto's 120ms stagger delay
      delayChildren: 0.05
    }
  }
};

export const staggerItem = (reduced: boolean = false): Variants => ({
  initial: { 
    opacity: 0, 
    y: reduced ? 0 : 20,
    filter: reduced ? "none" : "blur(4px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: easeOutQuint }
  }
});

// Route / page transition variants
export const pageTransition = (reduced: boolean = false): Variants => ({
  initial: {
    opacity: 0,
    y: reduced ? 0 : 8,
    filter: reduced ? "none" : "blur(6px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: easeSnappy }
  },
  exit: {
    opacity: 0,
    y: reduced ? 0 : -6,
    filter: reduced ? "none" : "blur(4px)",
    transition: { duration: 0.35, ease: easeSnappy }
  }
});
