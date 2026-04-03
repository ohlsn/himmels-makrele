import Button from "@/components/ui/Button";
import FishAnimation from "@/components/ui/FishAnimation";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Swimming fish in background */}
      <div className="absolute inset-0 pointer-events-none">
        <FishAnimation className="top-[20%]" delay={0} size={80} />
        <FishAnimation className="top-[60%]" delay={5} size={50} />
      </div>

      <div className="relative z-10">
        <h1 className="font-heading text-8xl font-bold text-sky mb-4">404</h1>
        <h2 className="font-heading text-2xl text-ocean mb-2">Seite nicht gefunden</h2>
        <p className="text-ocean/60 mb-8 max-w-md">
          Diese Seite scheint im Ozean verschwunden zu sein.
          Vielleicht ist sie mit einer Makrele davongeschwommen?
        </p>
        <Button href="/">Zurück zur Startseite</Button>
      </div>
    </div>
  );
}
