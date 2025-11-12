"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LeadForm from "./LeadForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function StickyCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);

  useEffect(() => {
    // Show mobile bar after user scrolls down
    const handleScroll = () => {
      setShowMobileBar(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mobile: Sticky bottom bar only
  if (!showMobileBar) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-2xl">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4">
          <div className="form-button-container">
            <DialogTrigger asChild>
              <Button
                className="w-full"
              >
                השאר פרטים עכשיו
              </Button>
            </DialogTrigger>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            ללא עלות | ללא התחייבות
          </p>
        </div>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>השאר פרטים ונחזור אליך</DialogTitle>
          </DialogHeader>
          <LeadForm
            onSuccess={() => setIsOpen(false)}
            showTitle={false}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

