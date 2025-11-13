"use client";

import { Star } from "lucide-react";
import { pageContent } from "@/config/pageContent";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { createVariants } from "@/utils/animationVariants";

export default function Testimonials() {
  const content = pageContent.testimonials;
  const testimonials = content.items;
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
          <p className="text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={createVariants({ type: "slideUp", duration: 0.8, delay: 0.5 + index * 0.15 })}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                  />
                ))}
              </div>

              {/* Name and Segment */}
              <div className="mb-6 pb-4 border-b border-border/50">
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-primary font-medium">
                  {content.segmentLabels[testimonial.segment]}
                </p>
              </div>

              {/* Before */}
              <div className="mb-6 pb-6 border-b border-red-200/50 dark:border-red-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
                    {content.beforeLabel}
                  </p>
                </div>
                <p className="text-sm text-foreground leading-relaxed italic">
                  &ldquo;{testimonial.before}&rdquo;
                </p>
              </div>

              {/* After */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {content.afterLabel}
                  </p>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{testimonial.after}</p>
              </div>

              {/* Savings */}
              {testimonial.savings && (
                <div className="mt-6 pt-6 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-4">
                  <p className="text-base font-bold text-primary text-center">
                    {testimonial.savings}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

