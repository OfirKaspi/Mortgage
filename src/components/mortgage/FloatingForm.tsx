"use client";

import LeadForm from "./LeadForm";

export default function FloatingForm() {
	return (
		<section id="floating-form" className="pb-[20px] px-4 bg-gradient-to-b from-primary/10 via-primary/15 to-primary/10">
			<div className="relative container mx-auto max-w-2xl">
				<div className="pb-[100px] -mt-[100px] bg-card p-6 md:p-10 lg:p-12 rounded-2xl shadow-2xl border border-border/50">
					<div className="text-center mb-6 md:mb-8">
						<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
							השאר פרטים ונחזור אליך
						</h2>
						<p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
							מלא את הפרטים ונצור איתך קשר תוך 24 שעות
						</p>
						<div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm mb-4 md:mb-6">
							<div className="flex items-center gap-2 text-muted-foreground">
								<div className="w-2 h-2 bg-primary rounded-full" />
								<span>ללא עלות</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<div className="w-2 h-2 bg-primary rounded-full" />
								<span>ללא התחייבות</span>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground">
								<div className="w-2 h-2 bg-primary rounded-full" />
								<span>שיחה ראשונית חינם</span>
							</div>
						</div>
					</div>
					<LeadForm showTitle={false} />
				</div>
			</div>
		</section>
	);
}

