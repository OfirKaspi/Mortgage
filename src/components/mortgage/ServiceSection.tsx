"use client";

import { Button } from "@/components/ui/button";
import type { MortgageType } from "@/types/types";
import { trackCTAClick } from "@/lib/analytics";
import { scrollToSection } from "@/lib/utils";
import Image from "next/image";
import { AlertCircle, TrendingDown, TrendingUp, Home, Calculator, Users } from "lucide-react";

interface ServiceSectionProps {
  mortgageType: MortgageType;
  textAlignment: "right" | "left";
}

const segmentContent = {
  new: {
    id: "new-mortgage",
    title: "הרוכש המודאג - משכנתא חדשה",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    imageAlt: "בית מודרני חדש",
    icon: Home,
    problem: {
      headline: "מתלבטים איזה תמהיל משכנתא נכון?",
      description:
        "טעות אחת יכולה לעלות מאות אלפי שקלים. הבנקים מציעים מה שנוח להם, לא מה שנכון לכם. ב-30 השנים הקרובות, תשלמו את המחיר.",
    },
    agitate: {
      headline: "החלטה שגויה עולה לכם ביוקר",
      description:
        "הבנקים מציעים מה שנוח להם, לא מה שנכון לכם. ב-30 השנים הקרובות, תשלמו את המחיר. ללא ייעוץ מקצועי, אתם עלולים לבחור בתמהיל יקר מדי, לא גמיש, או לא מתאים למצב הפיננסי שלכם.",
    },
    solve: {
      headline: "אנחנו בונים תמהיל מותאם אישית",
      description:
        "תמהיל שעמיד לשינויים בשוק ומגן עליכם פיננסית לטווח ארוך. נלווה אתכם בכל שלב ונבנה יחד את הפתרון המושלם עבורכם.",
    },
    cta: "בנו לי תמהיל מיטבי עכשיו",
    ctaSecondary: "בדיקה ללא עלות וללא התחייבות",
  },
  refinance: {
    id: "refinance-mortgage",
    title: "הממחזר במלכוד - מחזור משכנתא",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    imageAlt: "מחשבון וניירות פיננסיים",
    icon: Calculator,
    problem: {
      headline: "ריבית הפריים זינקה ב-10 העלאות רצופות",
      description:
        "ההחזר החודשי שלכם קפץ באלפי שקלים. אתם לא לבדכם - אלפי משפחות מתמודדות עם אותה בעיה.",
    },
    agitate: {
      headline: "הלחץ הפיננסי שוחק את איכות חייכם",
      description:
        "הלחץ הפיננסי הזה שוחק את איכות חייכם ומכריח אותכם לוותר על דברים חיוניים. הפתרון אינו למכור את הבית - הפתרון הוא למחזר את המשכנתא נכון.",
    },
    solve: {
      headline: "אנחנו מתמחים בבנייה מחדש של משכנתאות שנראות אבודות",
      description:
        "הניסיון שלנו בעסקאות מורכבות מחזיר לכם שליטה ושקט נפשי. נבנה לכם משכנתא חדשה שתקטין את ההחזר החודשי ותחזיר לכם את השליטה.",
    },
    cta: "אני רוצה להקטין את ההחזר עכשיו",
    ctaSecondary: "הפחיתו את ההחזר החודשי מיידית",
    urgency: "כל יום שעובר עולה לכם כסף",
  },
  reverse: {
    id: "reverse-mortgage",
    title: "הגמלאי המחפש כבוד - משכנתא הפוכה",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    imageAlt: "זוג מבוגר בבית",
    icon: Users,
    problem: {
      headline: "הפנסיה לא מספיקה, והבית שלכם מלא בערך שלא ניתן לגעת בו",
      description:
        "צריכים כסף לטיפולים רפואיים, לשיפוץ, או לעזור לילדים? הבית שלכם יכול להיות הפתרון - בלי למכור, בלי לעזוב.",
    },
    agitate: {
      headline: "אל תוותרו על העצמאות שלכם",
      description:
        "אין צורך להיות תלויים בילדים או לוותר על איכות החיים. משכנתא הפוכה היא דרך מכובדת להפוך את הנכס שלכם להון נזיל.",
    },
    solve: {
      headline: "משכנתא הפוכה - פתרון מכובד לעצמאות פיננסית",
      description:
        "תוך שמירה על הבית וללא החזרים חודשיים. נסביר לכם את כל הפרטים, כולל ההשפעה על הירושה, ונעזור לכם לקבל החלטה מושכלת.",
    },
    cta: "בדקו כמה כסף אפשר לקבל מהבית",
    ctaSecondary: "שיחת ייעוץ ללא עלות - עם או בלי הילדים",
    disclaimer:
      "חשוב: משכנתא הפוכה משפיעה על הירושה. אנו ממליצים לכלול את בני המשפחה בדיון.",
  },
};

export default function ServiceSection({ mortgageType, textAlignment }: ServiceSectionProps) {
  const content = segmentContent[mortgageType];
  const isRightAligned = textAlignment === "right";
  const IconComponent = content.icon;

  // Alternate background colors for visual variety
  const bgClass = mortgageType === "new" || mortgageType === "reverse" 
    ? "bg-gradient-to-b from-background via-primary/5 to-background"
    : "bg-gradient-to-b from-background via-muted-custom/30 to-background";

  return (
    <section id={content.id} className={`relative py-20 px-4 scroll-mt-20 ${bgClass}`}>
      {/* Dot grid background pattern */}
      <div 
        className="absolute inset-0 opacity-30 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className={`flex flex-col lg:flex-row gap-12 items-start ${
          !isRightAligned ? "lg:flex-row-reverse" : ""
        }`}>
          {/* Image Column - Sticky */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24 self-start">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={content.imageUrl}
                alt={content.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="p-3 bg-primary/90 backdrop-blur-sm rounded-lg">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{content.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className={`w-full lg:w-1/2 space-y-6 ${isRightAligned ? "text-right" : "text-left"}`}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {content.title}
              </h2>
            </div>

            {/* Problem */}
            <div className="bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 p-6 rounded-xl border border-red-200/50 dark:border-red-800/30 shadow-md hover:shadow-lg transition-shadow">
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
            </div>

            {/* Agitate */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 p-6 rounded-xl border border-orange-200/50 dark:border-orange-800/30 shadow-md hover:shadow-lg transition-shadow">
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
            </div>

            {/* Solve */}
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 p-6 rounded-xl border-2 border-primary/30 dark:border-primary/40 shadow-lg hover:shadow-xl transition-shadow">
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
            </div>

            {/* Urgency (for refinance) */}
            {'urgency' in content && content.urgency && (
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 p-5 rounded-xl border-2 border-yellow-300 dark:border-yellow-700 text-center shadow-md">
                <p className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  {content.urgency}
                </p>
              </div>
            )}

            {/* Disclaimer (for reverse mortgage) */}
            {'disclaimer' in content && content.disclaimer && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-5 rounded-xl border border-blue-300/50 dark:border-blue-700/50 shadow-md">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {content.disclaimer}
                </p>
              </div>
            )}

            {/* CTA Button */}
            <div className="pt-4" style={{ overflow: 'visible' }}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
