"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackFAQOpen } from "@/lib/analytics";
import { pageContent } from "@/config/pageContent";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { createVariants } from "@/utils/animationVariants";

export default function FAQ() {
  const content = pageContent.faq;
  const faqItems = content.items;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="relative py-20 px-4 bg-gradient-to-b from-background via-primary/3 to-background">
      {/* Dot grid background pattern */}
      <div 
        className="absolute inset-0 opacity-55 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={createVariants({ type: "fadeUp", duration: 0.9, delay: 0.3 })}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={createVariants({ type: "slideUp", duration: 0.7, delay: 0.5 + index * 0.15 })}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-card px-6 py-2 rounded-lg border"
              >
              <AccordionTrigger
                className="text-right hover:no-underline"
                onClick={() => trackFAQOpen(item.question)}
              >
                <span className="font-semibold text-foreground">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

