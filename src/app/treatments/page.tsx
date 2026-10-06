import { pageMetadata } from "@/lib/site";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import TreatmentMenu from "@/components/TreatmentMenu";
import MotionWords from "@/components/MotionWords";

export const metadata = pageMetadata("Treatments & Prices | Ginamu Aesthetics", "Explore Ginamu Aesthetics treatment prices in Westlands, Nairobi. Facials, body care, sauna, steam bath, brows, lashes, nails and waxing. Book on WhatsApp.", "/treatments");

export default function TreatmentsPage() {
 return <><SiteHeader solid /><main className="treatmentPage" id="main-content"><span id="top" aria-hidden="true" />
  <section className="menuHero" aria-labelledby="menu-title">
   <div className="menuHeroCopy">
    <a className="menuBreadcrumb" href="/#top">Home <span aria-hidden="true">/</span> Treatments &amp; prices</a>
    <p className="menuEyebrow">The Ginamu treatment menu</p>
    <h1 id="menu-title" aria-label="A ritual for every part of you."><MotionWords>A ritual for</MotionWords><br /><em><MotionWords>every part of you.</MotionWords></em></h1>
    <p className="menuHeroDescription">Explore our treatments and prices, then choose a little time for yourself. Our team is here to help you plan your visit.</p>
    <div className="menuHeroActions">
     <a className="menuPrimary" href="#treatment-menu">Explore the menu <span aria-hidden="true">↓</span></a>
     <a className="menuDownload" href="/downloads/ginamu-price-list.pdf" download="Ginamu-Price-List.pdf">Download price list <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5" /></svg><span className="menuFileType">PDF</span></a>
    </div>
   </div>
   <div className="menuHeroVisual"><Image src="/images/brow-detail.webp" alt="Close-up beauty portrait with defined brows" fill priority sizes="(max-width: 760px) 100vw, 38vw" /><div className="menuImageCaption"><span>Ginamu Aesthetics</span><span>Westlands, Nairobi</span></div></div>
  </section>
  <TreatmentMenu />
  <section className="menuHelp" aria-labelledby="menu-help-title"><p className="menuEyebrow">A little guidance</p><h2 id="menu-help-title">Let’s find <em>your ritual.</em></h2><p>Tell us what you have in mind. We’ll help you choose a treatment and confirm availability.</p><a className="menuPrimary" href="https://wa.me/254741174816?text=Hi%20Ginamu%20Aesthetics%2C%20please%20help%20me%20choose%20a%20treatment." target="_blank" rel="noopener noreferrer">Speak with our team <span aria-hidden="true">↗</span></a></section>
 </main><Footer /></>;
}
