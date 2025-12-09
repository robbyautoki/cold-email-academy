import Header from "@/components/shadcn-studio/blocks/hero-section-27/header";
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-13/hero-section-13";
import SocialProof from "@/components/shadcn-studio/blocks/social-proof-03/social-proof-03";
import BentoGrid from "@/components/shadcn-studio/blocks/bento-grid-02/bento-grid-02";
import FeaturesSection from "@/components/shadcn-studio/blocks/features-section-17/features-section-17";
import TestimonialsComponent from "@/components/shadcn-studio/blocks/testimonials-component-03/testimonials-component-03";
import CTASection from "@/components/shadcn-studio/blocks/cta-section-05/cta-section-05";
import Footer from "@/components/shadcn-studio/blocks/footer-component-02/footer-component-02";

// Navigation Data
const navigationData = [
  {
    title: "Kurse",
    items: [
      { title: "Cold Email Masterclass", href: "/kurse", description: "Lerne Cold Email von A-Z" },
      { title: "Module", href: "/kurse/cold-email-masterclass", description: "5+ Module mit 24 Lektionen" },
      { title: "Praxis-Übungen", href: "/kurse", description: "Direkt anwendbare Übungen" },
    ],
  },
  {
    title: "Ressourcen",
    items: [
      { title: "Knowledge Base", href: "/knowledge-base", description: "100+ Artikel zu Cold Email" },
      { title: "Tools", href: "/tools", description: "7 kostenlose Tools" },
      { title: "Vorlagen", href: "/knowledge-base", description: "Email-Templates" },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "SPF Generator", href: "/tools/spf-generator", description: "SPF Records erstellen" },
      { title: "DNS Checker", href: "/tools/dns-checker", description: "DNS Records prüfen" },
      { title: "Email Validator", href: "/tools/email-verifizierung", description: "Emails verifizieren" },
    ],
  },
];

// Features Section Data
const featuresSections = [
  {
    badge: "Exklusive Inhalte",
    title: "Strategien, die wirklich funktionieren",
    description:
      "Erhalte Zugang zu bewährten Cold Email Methoden und Insider-Wissen, das dir einen echten Vorsprung verschafft.",
    features: [
      {
        title: "Praxiserprobte Strategien",
        description: "– direkt anwendbar für schnelle Ergebnisse.",
      },
      {
        title: "Exklusive Vorlagen",
        description: "– spare Zeit mit fertigen Email-Templates.",
      },
      {
        title: "Insider-Wissen",
        description: "– lerne, was andere nicht wissen.",
      },
    ],
    image: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      alt: "Team arbeitet zusammen",
    },
  },
  {
    badge: "Sofortiger Zugang",
    title: "Starte noch heute durch",
    description:
      "Nach der Registrierung erhältst du sofort Zugriff auf alle Kurse, Tools und die Knowledge Base – ohne Wartezeit.",
    features: [
      {
        title: "Direkter Zugang",
        description: "– alle Inhalte sofort verfügbar.",
      },
      {
        title: "Lebenslanger Zugang",
        description: "– einmal registrieren, für immer nutzen.",
      },
      {
        title: "100% Kostenlos",
        description: "– keine versteckten Kosten.",
      },
    ],
    image: {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      alt: "Person am Laptop",
    },
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header navigationData={navigationData} />
      <main>
        <HeroSection />
        <SocialProof />
        <BentoGrid />
        <FeaturesSection sections={featuresSections} />
        <TestimonialsComponent />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
