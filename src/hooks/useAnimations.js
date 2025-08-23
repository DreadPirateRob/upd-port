"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

// Hook for detecting when an element is in view
export function useInViewAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    ...options
  });

  return { ref, isInView };
}

// Common animation variants
export const animationVariants = {
  // Fade animations
  fadeIn: {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 60 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  fadeInDown: {
    hidden: { 
      opacity: 0, 
      y: -60 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  fadeInLeft: {
    hidden: { 
      opacity: 0, 
      x: -60 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  fadeInRight: {
    hidden: { 
      opacity: 0, 
      x: 60 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  // Scale animations
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },

  scaleInUp: {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },

  // Hover animations
  hoverScale: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },

  hoverLift: {
    y: -8,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },

  // Stagger animations
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },

  // Page transitions
  pageTransition: {
    hidden: { 
      opacity: 0, 
      x: -200 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: 200,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  },

  // Button animations
  buttonPress: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  },

  // Loading animations
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },

  // Text animations
  textReveal: {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
};

// Hook for stagger animations
export function useStaggerAnimation(delay = 0.1) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2
      }
    }
  };
}

// Hook for scroll-triggered animations
export function useScrollAnimation(variant = "fadeInUp") {
  const { ref, isInView } = useInViewAnimation();
  
  return {
    ref,
    animate: isInView ? "visible" : "hidden",
    variants: animationVariants[variant],
    initial: "hidden"
  };
}
