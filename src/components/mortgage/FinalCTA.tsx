"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import { CONFIG } from "@/config/config";
import { pageContent } from "@/config/pageContent";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { createVariants } from "@/utils/animationVariants";

export default function FinalCTA() {
  const { phoneNumber } = CONFIG;
  const formattedPhone = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  const content = pageContent.finalCTA;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-b from-primary/10 via-primary/15 to-primary/10">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={createVariants({ type: "fadeUp", duration: 0.9, delay: 0.3 })}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {content.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              content.trustIndicators.noCost,
              content.trustIndicators.noCommitment,
              content.trustIndicators.freeConsultation
            ].map((indicator, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-muted-foreground"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={createVariants({ type: "fadeUp", duration: 0.7, delay: 0.5 + index * 0.15 })}
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>{indicator}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Phone CTA */}
          <motion.div 
            className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground p-8 rounded-2xl shadow-2xl group"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={createVariants({ type: "slideInLeft", duration: 0.9, delay: 0.5 })}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
            <div className="relative z-10">
              <div className="mb-6 p-3 bg-white/20 rounded-xl w-fit backdrop-blur-sm">
                <Phone className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                {content.phone.title}
              </h3>
              <p className="mb-8 opacity-95 text-lg">
                {content.phone.description}
              </p>
              <div className="form-button-container">
                <Button
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    trackCTAClick("phone_call", "final_cta");
                    window.location.href = `tel:${phoneNumber}`;
                  }}
                  aria-label={content.phone.buttonLabel}
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  <span>{formattedPhone}</span>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Why Now */}
          <motion.div 
            className="bg-card p-8 rounded-2xl shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300 group"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={createVariants({ type: "slideInRight", duration: 0.9, delay: 0.6 })}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <motion.div 
              className="mb-6 p-3 bg-primary/10 rounded-xl w-fit"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={createVariants({ type: "fadeUp", duration: 0.8, delay: 0.8 })}
            >
              <h3 className="text-2xl font-semibold text-foreground">
                {content.whyNow.title}
              </h3>
            </motion.div>
            <ul className="space-y-4">
              {content.whyNow.items.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={createVariants({ type: "slideUp", duration: 0.7, delay: 0.9 + index * 0.15 })}
                >
                  <div className="mt-1 p-1.5 bg-primary/20 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed flex-1">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
