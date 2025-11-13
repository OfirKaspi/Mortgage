import { Variants, Easing } from 'framer-motion';
import type { AnimationConfig } from '@/types/animation';

// Create animation variants based on config
export const createVariants = (config: AnimationConfig): Variants => {
  const {
    type,
    duration = 0.6,
    delay = 0,
    ease = [0.22, 1, 0.36, 1] as Easing
  } = config;
  const baseVariants: Record<string, Variants> = {
    slideUp: {
      hidden: { opacity: 0, y: 60, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration, delay, ease }
      }
    },
    slideDown: {
      hidden: { opacity: 0, y: -60, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration, delay, ease }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: -60, scale: 0.95 },
      visible: { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: { duration, delay, ease }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: 60, scale: 0.95 },
      visible: { 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: { duration, delay, ease }
      }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay, ease }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease }
      }
    },
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease }
      }
    },
    fadeDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease }
      }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay, ease }
      }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease }
      }
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease }
      }
    },
    slideInRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration, delay, ease }
      }
    }
  };

  // Return the variant if it exists, otherwise return a safe fallback
  const variant = baseVariants[type];
  if (!variant) {
    console.warn(`Animation variant type "${type}" not found. Using fallback.`);
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay, ease }
      }
    };
  }

  return variant;
};