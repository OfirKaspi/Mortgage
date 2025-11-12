/**
 * Main Landing Page Component
 * 
 * This page showcases mortgage consultation services with:
 * - Hero section with background image and service selection
 * - Trust indicators and benefits
 * - Three service sections (new, refinance, reverse mortgage) with sticky images
 * - Customer testimonials
 * - FAQ section
 * - Final call-to-action
 * - Lead form section (inline, scrolls to on CTA clicks)
 * - Fixed bottom banner for lead capture
 * 
 * Design features:
 * - Soft mint/sage green theme throughout
 * - Modern card-based UI with gradients and shadows
 * - Real Unsplash images in service sections
 * - Responsive design with RTL support (Hebrew)
 */
import Hero from "@/components/mortgage/Hero";
import FloatingForm from "@/components/mortgage/FloatingForm";
import TrustSection from "@/components/mortgage/TrustSection";
import ServiceSection from "@/components/mortgage/ServiceSection";
import Testimonials from "@/components/mortgage/Testimonials";
import FAQ from "@/components/mortgage/FAQ";
import FinalCTA from "@/components/mortgage/FinalCTA";
import LeadFormSection from "@/components/mortgage/LeadFormSection";
import FixedBanner from "@/components/mortgage/FixedBanner";
import BannerSpacer from "@/components/mortgage/BannerSpacer";
import ScrollTracker from "@/components/mortgage/ScrollTracker";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" role="main" dir="rtl">
      <ScrollTracker />
      <Hero />
      <FloatingForm />
      <TrustSection />
      {/* Service sections with alternating layouts and sticky images */}
      <ServiceSection mortgageType="new" textAlignment="right" />
      <ServiceSection mortgageType="refinance" textAlignment="left" />
      <ServiceSection mortgageType="reverse" textAlignment="right" />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      {/* Inline form section - all CTAs scroll to here */}
      <LeadFormSection />
      <Footer />
      <BannerSpacer />
      {/* Fixed bottom banner for lead capture */}
      <FixedBanner />
      <Toaster />
    </main>
  );
}
