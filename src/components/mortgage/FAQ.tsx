"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackFAQOpen } from "@/lib/analytics";

interface FAQItem {
  question: string;
  answer: string;
  segment?: "new" | "refinance" | "reverse";
}

const faqItems: FAQItem[] = [
  {
    question: "מה ההבדל בין משכנתא קבועה למשתנה?",
    answer:
      "משכנתא קבועה היא עם ריבית קבועה לכל תקופת ההלוואה - אתם יודעים בדיוק כמה תשלמו כל חודש. משכנתא משתנה היא עם ריבית שמשתנה לפי ריבית הפריים - היא יכולה להיות נמוכה יותר בהתחלה, אבל גם לעלות. התמהיל הנכון תלוי במצב הפיננסי שלכם, ביכולת לקחת סיכון, ובציפיות לשוק. אנחנו נבנה לכם תמהיל מותאם אישית.",
    segment: "new",
  },
  {
    question: "כמה זמן לוקח תהליך המחזור?",
    answer:
      "תהליך מחזור משכנתא לוקח בדרך כלל בין חודש לחודשיים, תלוי במורכבות העסקה. אנחנו מלווים אתכם בכל שלב - מאיסוף המסמכים, דרך מציאת הבנק המתאים, ועד לסגירת העסקה. המטרה שלנו היא להאיץ את התהליך ולחסוך לכם זמן וכסף.",
    segment: "refinance",
  },
  {
    question: "האם המשכנתא ההפוכה תפגע בילדים שלי?",
    answer:
      "משכנתא הפוכה משפיעה על הירושה - היא מקטינה את הערך שיועבר לילדים. אבל חשוב להבין: זה כסף שאתם מקבלים עכשיו, כשאתם צריכים אותו, ולא רק אחרי שתעברו. אנחנו ממליצים לכלול את הילדים בדיון כדי שכולם יבינו את ההחלטה. זה פתרון שמאפשר לכם לחיות בכבוד ובלי להיות תלויים.",
    segment: "reverse",
  },
  {
    question: "איך אני יודע איזה תמהיל משכנתא נכון לי?",
    answer:
      "זה בדיוק למה אנחנו כאן. כל אדם וכל משפחה הם שונים - יש לכם מצב פיננסי שונה, יכולת לקחת סיכון שונה, וציפיות שונות. אנחנו נבצע הערכה מקיפה של המצב שלכם, נסביר לכם את כל האפשרויות, ונבנה יחד את התמהיל המושלם עבורכם.",
    segment: "new",
  },
  {
    question: "מה אם הבנק שלי לא מסכים למחזר?",
    answer:
      "אם הבנק שלכם לא מסכים למחזר, יש לנו כמה אפשרויות: אנחנו יכולים לנסות למחזר בבנק אחר, למצוא פתרונות יצירתיים לקנסות, או לבנות תמהיל חדש שיתאים למצב. הניסיון שלנו בעסקאות מורכבות מאפשר לנו למצוא פתרונות גם במקרים שנראים אבודים.",
    segment: "refinance",
  },
  {
    question: "כמה כסף אני יכול לקבל במשכנתא הפוכה?",
    answer:
      "הסכום שתוכלו לקבל תלוי בגיל שלכם, בערך הבית, ובתנאי הבנק. בדרך כלל, אפשר לקבל בין 20% ל-50% מערך הבית, תלוי בגיל. אנחנו נסביר לכם בדיוק כמה תוכלו לקבל, מה התנאים, ומה ההשפעה על הירושה.",
    segment: "reverse",
  },
  {
    question: "כמה עולה ייעוץ משכנתאות?",
    answer:
      "השיחה הראשונית והבדיקה הראשונית שלנו הן ללא עלות וללא התחייבות. רק אחרי שתחליטו להמשיך, נגבש תשלום הוגן שמתבסס על הערך שאנחנו מביאים לכם. חשוב להבין: הייעוץ שלנו יכול לחסוך לכם עשרות אלפי שקלים - זה השקעה שמחזירה את עצמה.",
  },
  {
    question: "מה אם אני לא מרוצה מהשירות?",
    answer:
      "אנחנו מחויבים ל-100% שביעות רצון. אם לא תהיו מרוצים, נדבר ונתקן. אבל האמת היא שאנחנו כל כך בטוחים בשירות שלנו, שאנחנו יודעים שתצאו מרוצים. אלפי לקוחות כבר בחרו בנו - ואנחנו כאן כדי לעזור גם לכם.",
  },
];

export default function FAQ() {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-background via-primary/3 to-background">
      {/* Dot grid background pattern */}
      <div 
        className="absolute inset-0 opacity-30 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            שאלות נפוצות
          </h2>
          <p className="text-lg text-muted-foreground">
            כל מה שרציתם לדעת על משכנתאות וייעוץ פיננסי
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
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
          ))}
        </Accordion>
      </div>
    </section>
  );
}

