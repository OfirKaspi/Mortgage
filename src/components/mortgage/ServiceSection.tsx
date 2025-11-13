"use client";

import { Button } from "@/components/ui/button";
import type { MortgageType } from "@/types/types";
import { trackCTAClick } from "@/lib/analytics";
import { scrollToSection } from "@/lib/utils";
import OptimizedImage from "@/components/common/OptimizedImage";
import { AlertCircle, TrendingDown, TrendingUp, Home, Calculator, Users } from "lucide-react";
import { pageContent } from "@/config/pageContent";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { createVariants } from "@/utils/animationVariants";

interface ServiceSectionProps {
  mortgageType: MortgageType;
  textAlignment: "right" | "left";
}

const iconMap = {
  new: Home,
  refinance: Calculator,
  reverse: Users,
};

export default function ServiceSection({ mortgageType, textAlignment }: ServiceSectionProps) {
  const content = pageContent.serviceSections[mortgageType];
  const isRightAligned = textAlignment === "right";
  const IconComponent = iconMap[mortgageType];
  const imageTitle = ('imageTitle' in content && content.imageTitle) ? content.imageTitle : (content as { title: string }).title;
  const imageSubtitle = ('imageSubtitle' in content && content.imageSubtitle) ? content.imageSubtitle : undefined;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Alternate background colors for visual variety
  const bgClass = mortgageType === "new" || mortgageType === "reverse" 
    ? "bg-gradient-to-b from-background via-primary/5 to-background"
    : "bg-gradient-to-b from-background via-muted-custom/30 to-background";

  return (
    <section ref={ref} id={content.id} className={`relative py-8 md:py-20 px-4 scroll-mt-20 ${bgClass}`}>
      {/* Dot grid background pattern */}
      <div 
        className="absolute inset-0 opacity-55 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`flex flex-col md:flex-row gap-12 md:items-start ${
          !isRightAligned ? "md:flex-row-reverse" : ""
        }`}>
          {/* Image Column - Sticky */}
          <motion.div 
            className="w-full md:w-1/2 md:flex-shrink-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={createVariants({ 
              type: isRightAligned ? "slideInLeft" : "slideInRight", 
              duration: 1.0, 
              delay: 0.3 
            })}
          >
            <div className="sticky-image-wrapper">
              <div className="relative w-full aspect-[16/9] md:aspect-square rounded-2xl overflow-hidden shadow-2xl group">
                <OptimizedImage
                  src={content.imageUrl}
                  alt={content.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 text-white">
                    <div className="p-3 bg-primary/90 backdrop-blur-sm rounded-lg">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{imageTitle}</h3>
                      {imageSubtitle && (
                        <p className="text-sm mt-1 opacity-90">{imageSubtitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            className="w-full md:w-1/2 space-y-6 text-right"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={createVariants({ 
              type: isRightAligned ? "slideInRight" : "slideInLeft", 
              duration: 1.0, 
              delay: 0.4 
            })}
          >
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={createVariants({ type: "fadeUp", duration: 0.9, delay: 0.5 })}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {content.title}
              </h2>
            </motion.div>

            {/* Problem */}
            <motion.div 
              className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 p-6 rounded-xl border border-red-200/50 dark:border-red-800/30 shadow-md hover:shadow-lg transition-shadow"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={createVariants({ type: "slideUp", duration: 0.8, delay: 0.7 })}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground flex-1">
                {content.problem.headline}
              </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed pr-11">
                {content.problem.description}
              </p>
            </motion.div>

            {/* Agitate */}
            <motion.div 
              className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 p-6 rounded-xl border border-orange-200/50 dark:border-orange-800/30 shadow-md hover:shadow-lg transition-shadow"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={createVariants({ type: "slideUp", duration: 0.8, delay: 0.8 })}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground flex-1">
                {content.agitate.headline}
              </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed pr-11">
                {content.agitate.description}
              </p>
            </motion.div>

            {/* Solve */}
            <motion.div 
              className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-6 rounded-xl border-2 border-primary/30 dark:border-primary/40 shadow-lg hover:shadow-xl transition-shadow"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={createVariants({ type: "slideUp", duration: 0.8, delay: 0.9 })}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground flex-1">
                {content.solve.headline}
              </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed pr-11">
                {content.solve.description}
              </p>
            </motion.div>

            {/* Urgency (for refinance) */}
            {'urgency' in content && content.urgency && (
              <motion.div 
                className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 p-5 rounded-xl border-2 border-yellow-300 dark:border-yellow-700 text-center shadow-md"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={createVariants({ type: "scaleIn", duration: 0.8, delay: 1.1 })}
              >
                <p className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  {content.urgency}
                </p>
              </motion.div>
            )}

            {/* Disclaimer (for reverse mortgage) */}
            {'disclaimer' in content && content.disclaimer && (
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-5 rounded-xl border border-blue-300/50 dark:border-blue-700/50 shadow-md"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={createVariants({ type: "fadeUp", duration: 0.8, delay: 1.1 })}
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.disclaimer}
                </p>
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.div 
              className="pt-4" 
              style={{ overflow: 'visible' }}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={createVariants({ type: "fadeUp", duration: 0.8, delay: 1.2 })}
            >
              <div className="form-button-container">
                <Button
                  onClick={() => {
                    trackCTAClick(content.cta, `service-section-${mortgageType}`);
                    scrollToSection("lead-form");
                  }}
                  size="lg"
                  className="w-full"
                  aria-label={content.cta}
                >
                  {content.cta}
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-3">
                {content.ctaSecondary}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
