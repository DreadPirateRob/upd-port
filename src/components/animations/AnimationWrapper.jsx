"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, animationVariants } from "@/hooks/useAnimations";

// Generic animation wrapper component
export function AnimationWrapper({ 
  children, 
  variant = "fadeInUp", 
  delay = 0,
  className = "",
  ...props 
}) {
  const animation = useScrollAnimation(variant);
  
  return (
    <motion.div
      {...animation}
      transition={{ ...animation.variants.visible.transition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Fade in animation component
export function FadeIn({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6,
  className = "",
  ...props 
}) {
  const variantMap = {
    up: "fadeInUp",
    down: "fadeInDown",
    left: "fadeInLeft",
    right: "fadeInRight",
    in: "fadeIn"
  };

  const animation = useScrollAnimation(variantMap[direction] || "fadeInUp");
  
  return (
    <motion.div
      {...animation}
      transition={{ 
        ...animation.variants.visible.transition, 
        delay,
        duration 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Scale animation component
export function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className = "",
  ...props 
}) {
  const animation = useScrollAnimation("scaleIn");
  
  return (
    <motion.div
      {...animation}
      transition={{ 
        ...animation.variants.visible.transition, 
        delay,
        duration 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for animating multiple children
export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1,
  className = "",
  ...props 
}) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger item for use within StaggerContainer
export function StaggerItem({ 
  children, 
  className = "",
  ...props 
}) {
  return (
    <motion.div
      variants={animationVariants.staggerItem}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Hover animation component
export function HoverEffect({ 
  children, 
  effect = "scale", 
  className = "",
  ...props 
}) {
  const hoverVariants = {
    scale: { scale: 1.05 },
    lift: { y: -8 },
    rotate: { rotate: 5 },
    glow: { boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)" }
  };

  return (
    <motion.div
      whileHover={hoverVariants[effect] || hoverVariants.scale}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Page transition component
export function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      variants={animationVariants.pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation
export function TextReveal({ 
  children, 
  delay = 0,
  className = "",
  ...props 
}) {
  const animation = useScrollAnimation("textReveal");
  
  return (
    <motion.div
      {...animation}
      transition={{ 
        ...animation.variants.visible.transition, 
        delay 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Counter animation component
export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2,
  className = "",
  ...props 
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
      {...props}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CounterContent from={from} to={to} duration={duration} />
      </motion.span>
    </motion.span>
  );
}

// Helper component for counter animation
function CounterContent({ from, to, duration }) {
  const [count, setCount] = React.useState(from);
  
  React.useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(from + (to - from) * easeOutQuart));
      
      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [from, to, duration]);
  
  return count;
}
