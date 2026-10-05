"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import treatments from "@/data/treatments.json";
import { treatmentCategories } from "@/data/treatment-categories";

const categories = [
 { id: "skin", title: "Facials & Skin", note: "Care that begins with your skin.", number: "01" },
 { id: "body", title: "Body & Wellness", note: "Make room for a slower moment.", number: "02" },
 { id: "brows", title: "Brows & Lashes", note: "Definition, shaped around you.", number: "03" },
 { id: "nails", title: "Nail Care", note: "A considered finish, down to the details.", number: "04" },
 { id: "waxing", title: "Waxing", note: "Choose the area you would like treated.", number: "05" },
];
const descriptions: Record<string,string> = {
 skin: "Discuss your skin, preferences and appointment preparation with our team.",
 body: "Choose your session and contact our team to confirm availability and preparation.",
 brows: "Let us know your preferred finish. Our team can advise on your appointment and upkeep.",
 nails: "Tell us your preferred nail finish when booking. Ask our team about available colours and designs.",
 waxing: "Select the area you would like treated and ask our team about preparation and aftercare.",
};
const book = (name: string) => `https://wa.me/254743364717?text=${encodeURIComponent(`Hi Ginamu Aesthetics, I'd like to enquire about ${name}. Please help me with availability.`)}`;

export default function TreatmentMenu() {
 const [category, setCategory] = useState("all");
 const menuRef = useRef<HTMLDivElement>(null);
 useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("menuInView"); observer.unobserve(entry.target); } });
  }, { threshold: .08 });
  menuRef.current?.querySelectorAll(".menuGroup").forEach(group => observer.observe(group));
  return () => observer.disconnect();
 }, [category]);
 const shown = treatments.filter(item => category === "all" || item.category === category).length;
 return <section className="treatmentMenu" id="treatment-menu" aria-label="Treatments and prices">
  <div className="menuToolbar"><div><p className="menuEyebrow">Choose your focus</p><h2>Find your <em>next ritual.</em></h2></div><p>Prices in Kenyan shillings.<br />Select a treatment for booking details.</p></div>
  <div className="menuLayout">
   <aside className="menuCategoryNav" aria-label="Filter treatments by category">
    <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>All treatments <span>{treatments.length}</span></button>
    {categories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.title}<span>{treatments.filter(t => t.category === item.id).length}</span></button>)}
    <a className="menuAsideDownload" href="/downloads/ginamu-price-list.pdf" download="Ginamu-Price-List.pdf">Keep a copy of the menu <span aria-hidden="true">↓</span></a>
   </aside>
   <div className="menuGroups" ref={menuRef} key={category}>
    <p className="menuResultCount" role="status" aria-live="polite">{shown} treatments · {category === "all" ? "The complete menu" : categories.find(c => c.id === category)?.title}</p>
    {categories.filter(item => category === "all" || item.id === category).map(group => <section className="menuGroup" key={group.id} aria-labelledby={`category-${group.id}`}>
     <div className="menuGroupHeader"><span className="menuGroupNumber">{group.number}</span><div><h3 id={`category-${group.id}`}>{group.title}</h3><p>{group.note}</p><a className="menuCategoryGuide" href={`/treatments/${treatmentCategories.find(item => item.id === group.id)!.slug}`}>Explore {group.title.toLowerCase()} <span aria-hidden="true">↗</span></a></div></div>
     <div className="menuRows">{treatments.filter(item => item.category === group.id).map((item, index) => <details className="menuTreatment" name="ginamu-treatment-details" key={item.id} style={{ "--row-delay": `${index * 45}ms` } as CSSProperties}>
      <summary><span className="menuTreatmentName">{item.name}{item.duration && <small>{item.duration}</small>}</span><span className="menuTreatmentPrice">{item.price}</span><span className="menuTreatmentToggle" aria-hidden="true" /></summary>
      <div className="menuTreatmentDetails"><p>{item.name === "Skin tag removal" ? "Pricing is confirmed after assessment. Contact our team to arrange a consultation." : item.name === "Skin care products" ? "Ask our team about available products, stock and individual prices." : descriptions[item.category]}</p><a href={book(`${item.name}${item.duration ? ` (${item.duration})` : ""}`)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${item.name}${item.duration ? ` ${item.duration}` : ""} on WhatsApp`}>{item.name === "Skin care products" ? "Ask about products" : item.name === "Skin tag removal" ? "Arrange an assessment" : "Book this treatment"}<span aria-hidden="true">↗</span></a></div>
     </details>)}</div>
    </section>)}
   </div>
  </div>
 </section>;
}
