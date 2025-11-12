"use client";

import LeadForm from "./LeadForm";

export default function LeadFormSection() {
  return (
    <section id="lead-form" className="relative py-20 px-4 bg-gradient-to-b from-background via-muted-custom to-background scroll-mt-[90px]">
      {/* Dot grid background pattern */}
      <div 
        className="absolute inset-0 opacity-55 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="bg-card p-8 md:p-12 rounded-2xl shadow-2xl border border-border/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              השאר פרטים ונחזור אליך
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              מלא את הפרטים ונצור איתך קשר תוך 24 שעות
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
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

