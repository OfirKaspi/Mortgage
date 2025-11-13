"use client";

import LeadForm from "./LeadForm";
import { pageContent } from "@/config/pageContent";
import OptimizedImage from "@/components/common/OptimizedImage";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { createVariants } from "@/utils/animationVariants";

export default function LeadFormSection() {
  const content = pageContent.leadFormSection;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} id="lead-form" className="relative py-20 px-4 bg-gradient-to-b from-background via-muted-custom to-background scroll-mt-[90px]">
      {/* Dot grid background pattern */}
      <div 
        className="absolute inset-0 opacity-55 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div 
          className="bg-card p-8 md:p-12 rounded-2xl shadow-2xl border border-border/50"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={createVariants({ type: "scaleIn", duration: 1.0, delay: 0.3 })}
        >
          <motion.div 
            className="text-center mb-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={createVariants({ type: "fadeUp", duration: 0.9, delay: 0.5 })}
          >
            <div className="flex justify-center mb-6">
              <OptimizedImage
                src="https://res.cloudinary.com/dudwjf2pu/image/upload/c_crop,w_2800/v1763052733/BishvilHamashkanta/%D7%9C%D7%95%D7%92%D7%95_daxkfc.png"
                alt="Logo"
                width={320}
                height={160}
                className="h-24 w-auto sm:h-28 md:h-32 lg:h-36 object-contain"
                priority
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {content.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {content.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
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
                  variants={createVariants({ type: "fadeUp", duration: 0.7, delay: 0.7 + index * 0.15 })}
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>{indicator}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <LeadForm showTitle={false} />
        </motion.div>
      </div>
    </section>
  );
}

