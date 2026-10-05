import Image from "next/image";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import { treatmentCategories } from "@/data/treatment-categories";
import prices from "@/data/treatments.json";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import MotionWords from "@/components/MotionWords";
import TreatmentPageMotion from "@/components/TreatmentPageMotion";

type Props = { params: Promise<{ category: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return treatmentCategories.map(item => ({ category: item.slug })); }
export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const item = treatmentCategories.find(item => item.slug === category);
  if (!item) notFound();
  return pageMetadata(`${item.title} | Ginamu Aesthetics`, `${item.intro} View prices and plan your visit to Ginamu Aesthetics in Westlands, Nairobi.`, `/treatments/${item.slug}`);
}
const book = (name: string) => `https://wa.me/254743364717?text=${encodeURIComponent(`Hi Ginamu Aesthetics, I'd like to enquire about ${name}. Please confirm availability and preparation.`)}`;
export default async function TreatmentPage({ params }: Props) {
  const { category } = await params;
  const item = treatmentCategories.find(item => item.slug === category);
  if (!item) notFound();
  const treatments = prices.filter(price => price.category === item.id);
  return <><SiteHeader solid /><main className={`servicePage servicePage-${item.id}`} id="main-content"><span id="top" aria-hidden="true" />
    <section className="serviceHero" aria-labelledby="service-title">
      <Image className="serviceHeroImage" src={item.image} alt={item.alt} fill priority sizes="100vw" quality={90} style={{ objectPosition: item.position }} />
      <div className="serviceHeroShade" aria-hidden="true" /><div className="serviceHeroCopy"><a className="serviceBreadcrumb" href="/treatments">Treatments &amp; prices <span aria-hidden="true">/</span> {item.title}</a><p className="serviceEyebrow">{item.title} · Ginamu Aesthetics</p><h1 id="service-title" aria-label={`${item.headline} ${item.accent}`}><MotionWords>{item.headline}</MotionWords><br /><em><MotionWords>{item.accent}</MotionWords></em></h1><p className="serviceHeroIntro">{item.intro}</p><a className="serviceButton serviceButtonLight" href="#service-options">Explore treatments <span aria-hidden="true">↓</span></a></div>
    </section>
    <section className="serviceIntroduction serviceSection" data-service-reveal><div><p className="serviceEyebrow">Your ritual, your way</p><h2 aria-label={`${item.heading} ${item.headingAccent}`}><MotionWords>{item.heading}</MotionWords><br /><em><MotionWords>{item.headingAccent}</MotionWords></em></h2></div><div><p>{item.copy}</p><p>{item.planning}</p><a className="serviceTextLink" href="/contact">Ask our team <span aria-hidden="true">↗</span></a></div></section>
    <section className="serviceOptions serviceSection" id="service-options" aria-labelledby="service-options-title" data-service-reveal><div className="serviceOptionsHeading"><div><p className="serviceEyebrow">Treatments &amp; prices</p><h2 id="service-options-title"><MotionWords>Choose your</MotionWords>{" "}<em><MotionWords>next ritual.</MotionWords></em></h2></div><p>Prices in Kenyan shillings.<br />Enquire to confirm availability.</p></div>
      <div className="servicePriceRows">{treatments.map(treatment => <article className="servicePriceRow" key={treatment.id}><div><h3>{treatment.name}</h3>{treatment.duration && <p>{treatment.duration}</p>}{treatment.name === "Skin tag removal" && <p>Arrange an assessment for your quote.</p>}{treatment.name === "Skin care products" && <p>Ask about available products and stock.</p>}</div><p className="servicePrice">{treatment.price}</p><a href={book(`${treatment.name}${treatment.duration ? ` (${treatment.duration})` : ""}`)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${treatment.name}${treatment.duration ? ` ${treatment.duration}` : ""} on WhatsApp`}>Enquire <span aria-hidden="true">↗</span></a></article>)}</div>
    </section>
    <section className="serviceFaq serviceSection" aria-labelledby="service-faq-title" data-service-reveal><div><p className="serviceEyebrow">Before your visit</p><h2 id="service-faq-title"><MotionWords>A little</MotionWords>{" "}<em><MotionWords>clarity.</MotionWords></em></h2></div><div className="serviceFaqList">{item.faq.map(([question, answer]) => <details key={question} name="service-faq"><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
    <section className="serviceBooking serviceSection" data-service-reveal><p className="serviceEyebrow">Westlands, Nairobi</p><h2><MotionWords>Let’s make time</MotionWords>{" "}<em><MotionWords>for you.</MotionWords></em></h2><p>Message us about {item.title.toLowerCase()} and plan your appointment.</p><a className="serviceButton" href={book(item.title)} target="_blank" rel="noopener noreferrer">Plan your visit <span aria-hidden="true">↗</span></a></section>
    <nav className="serviceRelated serviceSection" aria-label="Explore other treatment categories"><p className="serviceEyebrow">More from Ginamu</p><div>{treatmentCategories.filter(other => other.id !== item.id).map(other => <a key={other.id} href={`/treatments/${other.slug}`}>{other.title} <span aria-hidden="true">↗</span></a>)}</div></nav>
  </main><Footer /><TreatmentPageMotion /></>;
}
