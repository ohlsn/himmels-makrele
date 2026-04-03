import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import ShopPreview from "@/components/home/ShopPreview";
import WaveDivider from "@/components/ui/WaveDivider";
import FishAnimation from "@/components/ui/FishAnimation";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Fish swimming between sections */}
      <div className="relative h-12 bg-cloud overflow-hidden">
        <FishAnimation className="top-2" delay={0} size={50} />
        <FishAnimation className="top-6" delay={7} size={35} />
      </div>

      <AboutPreview />

      <WaveDivider colorFrom="#F8FAFC" colorTo="#E0F2FE" />

      <GalleryPreview />

      <WaveDivider colorFrom="#E0F2FE" colorTo="#F8FAFC" flip />

      <ShopPreview />
    </>
  );
}
