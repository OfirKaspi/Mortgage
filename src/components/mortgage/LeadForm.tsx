"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { leadFormSchema } from "@/lib/validations";
import { useUTMParams } from "@/hooks/useUTMParams";
import type { MortgageType } from "@/types/types";
import { trackFormFocus, trackFormSubmission } from "@/lib/analytics";

interface LeadFormProps {
  defaultMortgageType?: MortgageType;
  onSuccess?: () => void;
  className?: string;
  showTitle?: boolean;
}

export default function LeadForm({
  defaultMortgageType,
  onSuccess,
  className = "",
  showTitle = false,
}: LeadFormProps) {
  const { toast } = useToast();
  const utmParams = useUTMParams();
  const [formData, setFormData] = useState<{
    fullName: string;
    phone: string;
    email: string;
    mortgageType: MortgageType | "";
  }>({
    fullName: "",
    phone: "",
    email: "",
    mortgageType: defaultMortgageType || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultMortgageType) {
      setFormData((prev) => ({ ...prev, mortgageType: defaultMortgageType }));
    }
  }, [defaultMortgageType]);

  const validate = () => {
    const result = leadFormSchema.safeParse({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email || undefined,
      mortgageType: formData.mortgageType,
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // Get UTM params from sessionStorage if available
      const storedUtm = sessionStorage.getItem("utm_params");
      const utm = storedUtm ? JSON.parse(storedUtm) : utmParams;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || undefined,
          mortgageType: formData.mortgageType,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          source: utm.source || "website",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "אירעה שגיאה");
      }

      trackFormSubmission(true, formData.mortgageType);

      toast({
        title: "✅ תודה רבה!",
        description: "פרטייך התקבלו בהצלחה. ניצור עמך קשר בהקדם האפשרי.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        mortgageType: defaultMortgageType || "",
      });
      setErrors({});

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      trackFormSubmission(false, formData.mortgageType);
      toast({
        title: "❌ שגיאה",
        description:
          error instanceof Error
            ? error.message
            : "אופס, משהו קרה. אנא נסה שנית.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {showTitle && (
        <h3 className="text-2xl font-bold text-center mb-6">
          השאר פרטים ונחזור אליך
        </h3>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">שם מלא *</Label>
          <Input
            id="fullName"
            placeholder="ישראל ישראלי"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              if (errors.fullName) setErrors({ ...errors, fullName: "" });
            }}
            onFocus={() => trackFormFocus("fullName")}
            className={errors.fullName ? "border-destructive" : ""}
            dir="rtl"
            aria-required="true"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">טלפון *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="0501234567"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setFormData({ ...formData, phone: value });
              if (errors.phone) setErrors({ ...errors, phone: "" });
            }}
            onFocus={() => trackFormFocus("phone")}
            maxLength={10}
            className={errors.phone ? "border-destructive" : ""}
            dir="ltr"
            aria-required="true"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">אימייל (אופציונלי)</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            className={errors.email ? "border-destructive" : ""}
            dir="ltr"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mortgageType">סוג משכנתא *</Label>
          <Select
            value={formData.mortgageType}
            onValueChange={(value: MortgageType) => {
              setFormData({ ...formData, mortgageType: value });
              if (errors.mortgageType)
                setErrors({ ...errors, mortgageType: "" });
            }}
            dir="rtl"
          >
            <SelectTrigger
              id="mortgageType"
              className={errors.mortgageType ? "border-destructive" : ""}
            >
              <SelectValue placeholder="בחר סוג משכנתא" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">משכנתא חדשה</SelectItem>
              <SelectItem value="refinance">מחזור משכנתא</SelectItem>
              <SelectItem value="reverse">משכנתא הפוכה</SelectItem>
            </SelectContent>
          </Select>
          {errors.mortgageType && (
            <p className="text-sm text-destructive">{errors.mortgageType}</p>
          )}
        </div>

        <div className="form-button-container">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            aria-label="שלח פרטים"
          >
            {loading ? "שולח..." : "שלח פרטים"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          בלחיצה על כפתור זה, אתה מסכים למדיניות הפרטיות שלנו. הפרטים שלך
          יישמרו בצורה מאובטחת ולא יועברו לצדדים שלישיים.
        </p>
      </form>
    </div>
  );
}

