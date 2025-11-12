"use client";

import { Home, RefreshCw, Users } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { trackPathSelection } from "@/lib/analytics";
import Image from "next/image";

export default function Hero() {
  const handlePathSelect = (sectionId: string, mortgageType: "new" | "refinance" | "reverse") => {
    trackPathSelection(mortgageType);
    scrollToSection(sectionId);
  };

  return (
    <section className="relative min-h-[800px] flex flex-col overflow-hidden bg-gray-50">
      {/* Dot grid background pattern */}
      <div 
        className="absolute inset-0 opacity-30 z-0"
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
      <div className="container mx-auto max-w-6xl text-center space-y-8 relative z-10 pt-[100px] lg:pt-[150px] px-4">
        {/* Main Headline */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            נמאס לכם להיות בני ערובה של הריבית?
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed">
            ייעוץ משכנתאות מקצועי שיחסוך לכם עשרות אלפי שקלים ויחזיר לכם שליטה על העתיד הפיננסי שלכם
          </p>
        </div>

        {/* Path Selection Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-16">
          <button
            onClick={() => handlePathSelect("new-mortgage", "new")}
            className="hero-button hero-button-variant-1 hero-button-large"
            aria-label="משכנתא חדשה"
          >
            <span>
              <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <Home className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
              </div>
              משכנתא חדשה
            </span>
          </button>

          <button
            onClick={() => handlePathSelect("refinance-mortgage", "refinance")}
            className="hero-button hero-button-variant-2 hero-button-large"
            aria-label="מחזור משכנתא"
          >
            <span>
              <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <RefreshCw className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
              </div>
              מחזור משכנתא
            </span>
          </button>

          <button
            onClick={() => handlePathSelect("reverse-mortgage", "reverse")}
            className="hero-button hero-button-variant-3 hero-button-large"
            aria-label="משכנתא הפוכה"
          >
            <span>
              <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                <Users className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
              </div>
              משכנתא הפוכה
            </span>
          </button>
        </div>

        {/* Trust Indicator */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-foreground">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>ללא עלות</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>ללא התחייבות</span>
          </div>
          <div className="flex items-center gap-2 text-foreground">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>שיחה ראשונית חינם</span>
          </div>
        </div>
      </div>

      {/* Home Image Section - Part of flex column, 200px from bottom, full width */}
      <div className="relative z-10 w-full mb-[200px] mt-[30px] lg:mt-[0px]">
        <Image
          src="https://res.cloudinary.com/dudwjf2pu/image/upload/v1762968448/BishvilHamashkanta/hero_2_no_bg_2_tihmmy.png"
          alt="Home"
          width={1920}
          height={1080}
          className="w-full h-auto object-contain"
          priority
          sizes="100vw"
        />
      </div>
    </section>
  );
}

