"use client";

import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { scrollToSection } from "@/lib/utils";
import { pageContent } from "@/config/pageContent";
import OptimizedImage from "@/components/common/OptimizedImage";
import { motion } from "framer-motion";
import { createVariants } from "@/utils/animationVariants";

export default function FixedBanner() {
  const content = pageContent.fixedBanner;
  
  const handleClick = () => {
    trackCTAClick("leave_details", "fixed_banner");
    scrollToSection("lead-form");
  };

  return (
    <motion.div 
      data-fixed-banner 
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t-2 border-primary/20 shadow-2xl"
      initial="hidden"
      animate="visible"
      variants={createVariants({ type: "slideUp", duration: 0.8, delay: 0.8 })}
    >
      <div className="container mx-auto max-w-6xl px-3 py-2 sm:px-4 sm:py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
        <div className="block flex-shrink-0">
              <OptimizedImage
                src={pageContent.images.logo.url}
                alt={pageContent.images.logo.alt}
                width={80}
                height={40}
                className="h-8 w-auto sm:h-10 md:h-12 object-contain"
                priority
              />
            </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-foreground mb-0.5 sm:mb-1">
              {content.title}
            </h3>
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">
              {content.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">

            <div className="hidden sm:flex items-center gap-2 md:gap-4 text-[10px] sm:text-xs text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full" />
                <span>{content.trustIndicators.noCost}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full" />
                <span>{content.trustIndicators.noCommitment}</span>
              </div>
            </div>
            <div className="form-button-container auto-width">
              <Button
                onClick={handleClick}
                data-banner-trigger
                className="whitespace-nowrap"
                style={{ width: 'auto', padding: '0.6em 0.8em' }}
              >
                {content.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

