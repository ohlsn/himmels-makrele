import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";
import { aboutData } from "../../../content/about";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Lerne den 11-jährigen Künstler hinter Himmels Makrele kennen — seine Geschichte, Inspiration und Mission.",
};

export default function UeberMichPage() {
  return (
    <PageTransition>
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <SectionHeading>Über mich</SectionHeading>

          {/* Intro with avatar */}
          <div className="flex flex-col items-center mb-12">
            <div
              className="w-40 h-40 rounded-full shadow-xl border-4 border-sky/30 flex items-center justify-center mb-6"
              style={{
                background: "linear-gradient(135deg, #38BDF8, #0369A1)",
              }}
            >
              <span className="text-5xl">🎨</span>
            </div>
            <p className="text-xl text-ocean/80 text-center leading-relaxed max-w-xl">
              {aboutData.intro}
            </p>
          </div>

          {/* Story sections */}
          <div className="space-y-10">
            {aboutData.story.map((section, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-sky/10">
                  <h3 className="font-heading text-xl font-bold text-sky-deep mb-3">
                    {section.title}
                  </h3>
                  <p className="text-ocean/70 leading-relaxed">{section.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
