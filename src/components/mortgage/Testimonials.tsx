import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  segment: "new" | "refinance" | "reverse";
  before: string;
  after: string;
  savings?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "דני כהן",
    segment: "new",
    before:
      "הייתי מבולבל לגמרי. כל בנק הציע משהו אחר ולא ידעתי מה נכון. חששתי לעשות טעות שתעלה לי מאות אלפי שקלים.",
    after:
      "היועץ בנה לי תמהיל מושלם שמותאם בדיוק למצב שלי. עכשיו אני יודע בדיוק מה יש לי, כמה אני משלם, ומה קורה אם משהו משתנה. שקט נפשי אמיתי.",
    savings: "חסך צפוי: 120,000 ₪",
    rating: 5,
  },
  {
    name: "שרה לוי",
    segment: "refinance",
    before:
      "ההחזר החודשי שלנו קפץ מ-8,000 ל-12,000 שקלים. לא יכולנו להמשיך ככה. חששנו שנצטרך למכור את הבית.",
    after:
      "תוך חודשיים מחזרנו את המשכנתא. ההחזר חזר ל-7,500 שקלים. לא רק שחסכנו - גם קיבלנו תנאים טובים יותר. הצילו אותנו.",
    savings: "חסך חודשי: 4,500 ₪",
    rating: 5,
  },
  {
    name: "משה אברהם",
    segment: "reverse",
    before:
      "הפנסיה לא הספיקה, והילדים לא יכלו לעזור. רציתי לשפץ את הבית אבל לא היה לי איך. לא רציתי להיות תלוי.",
    after:
      "משכנתא הפוכה פתרה לי את הבעיה. קיבלתי כסף נזיל בלי למכור את הבית, בלי לעזוב, ובלי להיות תלוי. הילדים היו חלק מהתהליך והבינו שזה הפתרון הנכון.",
    savings: "קיבל: 800,000 ₪",
    rating: 5,
  },
  {
    name: "רותי דוד",
    segment: "new",
    before:
      "זה היה הבית הראשון שלי. לא ידעתי כלום על משכנתאות. כל מה שידעתי זה שצריך לקחת מהבנק שהציע הכי הרבה.",
    after:
      "היועץ הסביר לי הכל, בנה לי תמהיל שמותאם למצב שלי, וליווה אותי בכל התהליך. עכשיו אני יודעת שיש לי את הפתרון הנכון.",
    rating: 5,
  },
  {
    name: "יוסי מזרחי",
    segment: "refinance",
    before:
      "הבנק אמר לי שאי אפשר למחזר כי יש קנסות. הייתי תקוע עם ריבית גבוהה ולא היה לי מוצא.",
    after:
      "היועץ מצא פתרון יצירתי. מחזרנו את המשכנתא למרות הקנסות, ובסופו של דבר חסכנו עשרות אלפי שקלים. מומחיות אמיתית.",
    savings: "חסך כולל: 180,000 ₪",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary/10 via-primary/15 to-primary/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            מה הלקוחות שלנו אומרים
          </h2>
          <p className="text-lg text-muted-foreground">
            אלפי משפחות כבר בחרו בנו - הנה מה שיש להן לומר
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-background p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1"
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
                  {testimonial.segment === "new" && "משכנתא חדשה"}
                  {testimonial.segment === "refinance" && "מחזור משכנתא"}
                  {testimonial.segment === "reverse" && "משכנתא הפוכה"}
                </p>
              </div>

              {/* Before */}
              <div className="mb-6 pb-6 border-b border-red-200/50 dark:border-red-800/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
                    לפני:
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
                    אחרי:
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

