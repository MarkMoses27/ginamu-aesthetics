import Hero from "@/components/Hero";
import TreatmentFinder from "@/components/TreatmentFinder";
import SignatureTreatments from "@/components/SignatureTreatments";
import VisitGinamu from "@/components/VisitGinamu";
import SiteMotion from "@/components/SiteMotion";

export default function Home() {
  return (
    <main>
      <Hero />
      <TreatmentFinder />
      <SignatureTreatments />
      <VisitGinamu />
      <SiteMotion />
    </main>
  );
}
