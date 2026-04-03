import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutData } from "../../../content/about";

export default function AboutPreview() {
  return (
    <section className="py-16 px-4 bg-cloud">
      <div className="max-w-4xl mx-auto">
        <SectionHeading>Über mich</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Placeholder avatar */}
          <div className="flex justify-center">
            <div
              className="w-64 h-64 rounded-full shadow-xl border-4 border-sky/30 flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #38BDF8, #0369A1)",
              }}
            >
              <span className="text-6xl">🎨</span>
            </div>
          </div>

          <div>
            <p className="text-lg text-ocean/80 leading-relaxed mb-6">
              {aboutData.intro}
            </p>
            <Button href="/ueber-mich" variant="secondary">
              Mehr erfahren
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
