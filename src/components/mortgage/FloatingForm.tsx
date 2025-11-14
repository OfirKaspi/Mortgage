"use client";

import LeadForm from "./LeadForm";
import { pageContent } from "@/config/pageContent";
import OptimizedImage from "@/components/common/OptimizedImage";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { createVariants } from "@/utils/animationVariants";

export default function FloatingForm() {
	const content = pageContent.floatingForm;
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	
	return (
		<section ref={ref} id="floating-form" className="pb-[20px] px-4 bg-gradient-to-b from-primary/10 via-primary/15 to-primary/10">
			<div className="relative container mx-auto max-w-2xl z-30">
				<motion.div 
					className="pb-[100px] -mt-[100px] bg-card p-6 md:p-10 lg:p-12 rounded-2xl shadow-2xl border border-border/50"
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					variants={createVariants({ type: "slideUp", duration: 1.0, delay: 0.3 })}
				>
					<motion.div 
						className="text-center mb-6 md:mb-8"
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						variants={createVariants({ type: "fadeUp", duration: 0.9, delay: 0.5 })}
					>
						<div className="flex justify-center mb-4 md:mb-6">
							<OptimizedImage
								src={pageContent.images.logo.url}
								alt={pageContent.images.logo.alt}
								width={320}
								height={160}
								className="h-24 w-auto sm:h-28 md:h-32 lg:h-36 object-contain"
								priority
							/>
						</div>
						<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
							{content.title}
						</h2>
						<p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
							{content.subtitle}
						</p>
						<div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm mb-4 md:mb-6">
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

