import About from "@/components/About";
import { GallerySection } from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <GallerySection/>
    </>
  );
}
