import LegalInfo from "@/components/legal/LegalInfo";
import Contact from "@/components/layout/Contact";
import SocialMedia from "@/components/layout/SocialMedia";
import { CONFIG } from "@/config/config";
import OptimizedImage from "@/components/common/OptimizedImage";
import Link from "next/link";

export default function Footer() {
  const year = CONFIG.year;
  return (
    <footer className="bg-gradient-to-b from-primary/10 via-primary/15 to-primary/10 border-t border-primary/10 py-8 sm:py-12 px-4 sm:px-6 w-full">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Contact Info */}
          <div className="w-full">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">
              צור קשר
            </h3>
            {CONFIG.contactName && (
              <p className="text-sm font-medium text-foreground mb-3">
                {CONFIG.contactName}
              </p>
            )}
            <div className="space-y-2">
              <Contact />
            </div>
          </div>

          {/* Social Media */}
          <div className="w-full">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">
              עקבו אחרינו
            </h3>
            <SocialMedia />
          </div>

          {/* Legal Links */}
          <div className="w-full sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">
              מידע משפטי
            </h3>
            <LegalInfo />
          </div>
        </div>

        <div className="border-t pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            כל הזכויות שמורות &copy; {year} LEVEL UP - סוכנות דיגיטל
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            LEVEL UP | סוכנות דיגיטל מתקדמת
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link 
              href="https://thelevelupagency.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <span className="text-base text-foreground">LEVEL UP</span>
              <OptimizedImage 
                src="/levelup_logo.png" 
                alt="Level Up" 
                width={120} 
                height={36}
                className="h-9 w-auto"
              />
              <span className="text-base text-foreground">POWERED BY</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
