"use client";

import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { scrollToSection } from "@/lib/utils";

export default function FixedBanner() {
  const handleClick = () => {
    trackCTAClick("leave_details", "fixed_banner");
    scrollToSection("lead-form");
  };

  return (
    <div data-fixed-banner className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t-2 border-primary/20 shadow-2xl">
      <div className="container mx-auto max-w-6xl px-4 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              מוכנים להתחיל?
            </h3>
            <p className="text-sm text-muted-foreground">
              השאירו פרטים עכשיו וניצור איתכם קשר תוך 24 שעות
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>ללא עלות</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span>ללא התחייבות</span>
              </div>
            </div>
            <div className="form-button-container auto-width">
              <Button
                onClick={handleClick}
                data-banner-trigger
                className="whitespace-nowrap"
                style={{ width: 'auto', padding: '0.6em 0.8em' }}
              >
                השאר פרטים
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

