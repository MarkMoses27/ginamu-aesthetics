import "./home-price-menu.css";
import { getTreatments } from "@/lib/treatment-content";
import HomePriceMenu from "@/components/HomePriceMenu";
import Hero from "@/components/Hero";
import TreatmentFinder from "@/components/TreatmentFinder";
import SignatureTreatments from "@/components/SignatureTreatments";
import VisitGinamu from "@/components/VisitGinamu";
import SiteMotion from "@/components/SiteMotion";

export default async function Home() {
  const treatments = await getTreatments();
  return (
    <main id="main-content">
      <Hero />
      <HomePriceMenu treatments={treatments} />
      <SignatureTreatments prices={treatments} />
      <TreatmentFinder />
      <VisitGinamu />
      <SiteMotion />
    </main>
  );
}
