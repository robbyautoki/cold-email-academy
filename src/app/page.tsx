import HeroSection27 from "@/components/shadcn-studio/blocks/hero-section-27/hero-section-27";
import BentoGrid01 from "@/components/shadcn-studio/blocks/bento-grid-01/bento-grid-01";
import FooterComponent03 from "@/components/shadcn-studio/blocks/footer-component-03/footer-component-03";
import { HeroNavigation01, HeroNavigation01SmallScreen, type Navigation } from "@/components/shadcn-studio/blocks/hero-navigation-01";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Navigation Data für Landing Page
const navData: Navigation[] = [
  { title: 'Kurse', href: '/kurse' },
  { title: 'Templates', href: '/templates' },
  { title: 'Tools', href: '/tools' },
  { title: 'Knowledge Base', href: '/knowledge-base' },
  { title: 'Checklisten', href: '/checklisten' },
];


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/logo-new.svg" alt="Academy" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-semibold">Academy</span>
          </a>
          <HeroNavigation01 navigationData={navData} />
          <div className="flex items-center gap-3">
            <HeroNavigation01SmallScreen navigationData={navData} />
            <Button asChild>
              <a href="/login">Login</a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <HeroSection27 />
        <BentoGrid01 />
      </main>
      <FooterComponent03 />
    </div>
  );
}
