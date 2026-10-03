import Hero from "@/components/Hero";
import TreatmentFinder from "@/components/TreatmentFinder";
import SignatureTreatments from "@/components/SignatureTreatments";
import SiteMotion from "@/components/SiteMotion";

export default function Home() {
  return (
    <main>
      <Hero />
      <TreatmentFinder />
      <SignatureTreatments />
      <SiteMotion />
    </main>
  );
}
