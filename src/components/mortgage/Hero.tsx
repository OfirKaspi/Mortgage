"use client";

import { Home, RefreshCw, Users } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { trackPathSelection } from "@/lib/analytics";
import OptimizedImage from "@/components/common/OptimizedImage";
import { pageContent } from "@/config/pageContent";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createVariants } from "@/utils/animationVariants";

export default function Hero() {
  const content = pageContent.hero;
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [glowReady, setGlowReady] = useState(false);
  
  // Ensure component is mounted before animating to prevent stuck animations on refresh
  useEffect(() => {
    // Use double requestAnimationFrame to ensure DOM and styles are ready
    const rafId1 = requestAnimationFrame(() => {
      const rafId2 = requestAnimationFrame(() => {
        setIsMounted(true);
        // Delay glow effects slightly to prevent animation conflicts
        setTimeout(() => {
          setGlowReady(true);
        }, 100);
      });
      return () => cancelAnimationFrame(rafId2);
    });
    return () => cancelAnimationFrame(rafId1);
  }, []);
  
  const handlePathSelect = (sectionId: string, mortgageType: "new" | "refinance" | "reverse") => {
    trackPathSelection(mortgageType);
    scrollToSection(sectionId);
  };

  // For Hero section, always animate once mounted (since it's always visible on page load)
  const shouldAnimate = isMounted;

  return (
    <section ref={ref} className="relative min-h-[800px] flex flex-col overflow-hidden bg-gray-50">
      {/* Dot grid background pattern */}
      <div 
        className="absolute inset-0 opacity-55 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-6xl text-center space-y-8 relative z-10 pt-[80px] lg:pt-[120px] px-4 mb-12 md:mb-16 lg:mb-20">
          {/* Main Headline */}
        <motion.div 
          className="space-y-6"
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          variants={createVariants({ type: "fadeUp", duration: 1.0, delay: 0.3 })}
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={createVariants({ type: "fadeUp", duration: 1.0, delay: 0.4 })}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {content?.headline ? content.headline.split(':').filter(part => part.trim()).map((part, index) => {
              if (index === 0) {
                // First row - previous color (foreground) with glow
                return (
                  <span 
                    key={index} 
                    className="text-foreground block"
                    style={{
                      textShadow: glowReady ? '0 0 15px rgba(0, 0, 0, 0.2), 0 0 30px rgba(0, 0, 0, 0.15), 0 0 45px rgba(0, 0, 0, 0.1)' : 'none',
                      marginBottom: '0.5rem',
                      transition: 'text-shadow 0.3s ease-in-out',
                      willChange: 'transform, opacity',
                      transform: 'translateZ(0)'
                    }}
                  >
                    {part.trim()}
                  </span>
                );
              } else {
                // Second row - green gradient with glow
                return (
                  <span 
                    key={index} 
                    className={`block ${glowReady ? 'hero-second-row-glow' : ''}`}
                    style={{
                      background: 'linear-gradient(to right, hsl(155, 45%, 35%), hsl(155, 45%, 50%), hsl(155, 45%, 35%))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginTop: '0.5rem',
                      willChange: 'transform, opacity, filter',
                      transform: 'translateZ(0)',
                      transition: 'filter 0.3s ease-in-out'
                    }}
                  >
                    {part.trim()}
                  </span>
                );
              }
            }) : null}
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed"
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={createVariants({ type: "fadeUp", duration: 0.9, delay: 0.7 })}
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
          >
            {content.subheadline}
          </motion.p>
        </motion.div>

        {/* Path Selection Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-16">
          {[
            { id: "new-mortgage", type: "new" as const, label: content.buttons.new, icon: Home },
            { id: "refinance-mortgage", type: "refinance" as const, label: content.buttons.refinance, icon: RefreshCw },
            { id: "reverse-mortgage", type: "reverse" as const, label: content.buttons.reverse, icon: Users }
          ].map((button, index) => (
            <motion.button
              key={button.id}
              onClick={() => handlePathSelect(button.id, button.type)}
              className={`hero-button hero-button-variant-${index + 1} hero-button-large`}
              aria-label={button.label}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              variants={createVariants({ type: "fadeUp", duration: 0.8, delay: 0.9 + index * 0.15 })}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <span>
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                  <button.icon className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                </div>
                {button.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
          {[
            content.trustIndicators.noCost,
            content.trustIndicators.noCommitment,
            content.trustIndicators.freeConsultation
          ].map((indicator, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 text-foreground"
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              variants={createVariants({ type: "fadeUp", duration: 0.8, delay: 1.1 + index * 0.15 })}
            >
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>{indicator}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Home Image Section - Centered at bottom of hero section */}
      <motion.div 
        className="relative z-10 w-full mt-auto flex justify-center items-end px-4 pb-4"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={createVariants({ type: "scaleIn", duration: 1.2, delay: 1.5 })}
      >
        <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[600px]">
          {/* Logo behind person image */}
          <div className="absolute inset-0 flex items-center justify-center z-0 opacity-30">
            <OptimizedImage
              src={content.images.logo.url}
              alt={content.images.logo.alt}
              width={400}
              height={400}
              className="w-full h-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] object-contain"
              priority
            />
          </div>
          {/* Person image in front */}
          <div className="relative z-10 w-full" style={{ minHeight: 0 }}>
            <OptimizedImage
              src={content.images.person.url}
              alt={content.images.person.alt}
              width={1920}
              height={1080}
              className="w-full h-auto max-h-none object-contain"
              style={{ objectPosition: 'bottom' }}
              priority
              crop="fit"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

