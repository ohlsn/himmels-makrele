import Button from "@/components/ui/Button";
import CloudAnimation from "@/components/ui/CloudAnimation";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-light via-sky/20 to-cloud">
      {/* Clouds */}
      <CloudAnimation className="top-10 left-[5%] opacity-60" />
      <CloudAnimation className="top-24 right-[10%] opacity-40" slow />
      <CloudAnimation className="top-40 left-[30%] opacity-30" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-ocean mb-4 drop-shadow-sm">
          {SITE_NAME}
        </h1>
        <p className="font-heading text-xl sm:text-2xl text-sky-deep/80 mb-8">
          {SITE_TAGLINE}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/galerie">Galerie entdecken</Button>
          <Button href="/ueber-mich" variant="secondary">
            Über mich
          </Button>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="w-full h-16 sm:h-24">
          <path
            d="M0 40C360 80 720 0 1080 40C1260 60 1380 80 1440 40V100H0V40Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
}
