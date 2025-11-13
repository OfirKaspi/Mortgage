import { Easing } from 'framer-motion';

export interface AnimationConfig {
  type: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'scale' | 'fadeUp' | 'fadeDown' | 'fadeIn' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  duration?: number;
  delay?: number;
  ease?: Easing | Easing[];
}