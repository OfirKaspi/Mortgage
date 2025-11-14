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
import { pageContent } from "@/config/pageContent";
import OptimizedImage from "@/components/common/OptimizedImage";

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
  const content = pageContent.leadForm;
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
          website: "", // Honeypot field - should always be empty
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
        title: content.messages.success.title,
        description: content.messages.success.description,
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
        title: content.messages.error.title,
        description:
          error instanceof Error
            ? error.message
            : content.messages.error.description,
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
        <>
          <div className="flex justify-center mb-4">
            <OptimizedImage
              src="https://res.cloudinary.com/dudwjf2pu/image/upload/c_crop,w_2800/v1763052733/BishvilHamashkanta/%D7%9C%D7%95%D7%92%D7%95_daxkfc.png"
              alt="Logo"
              width={320}
              height={160}
              className="h-24 w-auto sm:h-28 md:h-32 lg:h-36 object-contain"
              priority
            />
          </div>
          <h3 className="text-2xl font-bold text-center mb-6">
            {content.title}
          </h3>
        </>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">{content.labels.fullName}</Label>
          <Input
            id="fullName"
            placeholder={content.placeholders.fullName}
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
          <Label htmlFor="phone">{content.labels.phone}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder={content.placeholders.phone}
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
          <Label htmlFor="email">{content.labels.email}</Label>
          <Input
            id="email"
            type="email"
            placeholder={content.placeholders.email}
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
          <Label htmlFor="mortgageType">{content.labels.mortgageType}</Label>
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
              <SelectValue placeholder={content.placeholders.mortgageType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">{content.mortgageTypeOptions.new}</SelectItem>
              <SelectItem value="refinance">{content.mortgageTypeOptions.refinance}</SelectItem>
              <SelectItem value="reverse">{content.mortgageTypeOptions.reverse}</SelectItem>
            </SelectContent>
          </Select>
          {errors.mortgageType && (
            <p className="text-sm text-destructive">{errors.mortgageType}</p>
          )}
        </div>

        {/* Honeypot field for bot protection - hidden from users but visible to bots */}
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
          <label htmlFor="website">Website (leave blank)</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value=""
            onChange={() => {}} // No-op to prevent React warnings
          />
        </div>

        <div className="form-button-container">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            aria-label={content.button.submit}
          >
            {loading ? content.button.submitting : content.button.submit}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {content.privacy}
        </p>
      </form>
    </div>
  );
}

