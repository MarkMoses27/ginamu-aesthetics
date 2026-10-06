"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import treatments from "@/data/treatments.json";
import { treatmentCategories } from "@/data/treatment-categories";

const categoryIcons: Record<string, string> = {
  all: "M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4 18.4 5.6",
  skin: "M8 4c-3 2-4 6-3 10 1 4 4 7 7 7s6-3 7-7c1-4 0-8-3-10M8 10h1m6 0h1M9 16c2 1 4 1 6 0M9 3h6",
  body: "M5 17c-2-3 2-5 0-8M12 17c-2-3 2-5 0-8M19 17c-2-3 2-5 0-8M3 21h18M12 3v2",
  brows: "M2 12c5-6 15-6 20 0-5 6-15 6-20 0ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M5 6 3 3m9 2V2m7 4 2-3",
  nails: "M7 21V8a5 5 0 0 1 10 0v13M7 11h10M10 4v4m4-4v4M7 17h10",
  waxing: "M6 3c-3 6 1 9 5 11s7 4 6 7M18 3c-2 4-1 7 2 10M5 19h6m-3-3v6",
};
const categoryNotes: Record<string, string> = {
  skin: "Care that begins with your skin.",
  body: "Make room for a slower moment.",
  brows: "Definition, shaped around you.",
  nails: "A considered finish, down to the details.",
  waxing: "Smooth care, on your terms.",
};
const book = (name: string) => `https://wa.me/254741174816?text=${encodeURIComponent(`Hi Ginamu Aesthetics, I'd like to enquire about ${name}. Please help me with availability.`)}`;

function CategoryIcon({ id }: { id: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={categoryIcons[id]} /></svg>;
}

export default function TreatmentMenu() {
  const [category, setCategory] = useState("all");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("priceInView");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    menuRef.current?.querySelectorAll(".priceGroup").forEach(group => observer.observe(group));
    return () => observer.disconnect();
  }, [category]);

  const visibleCategories = treatmentCategories.filter(item => category === "all" || item.id === category);
  const shown = treatments.filter(item => category === "all" || item.category === category).length;

  return <section className="treatmentMenu" id="treatment-menu" aria-label="Treatments and prices">
    <div className="priceMenuHeading">
      <div><p className="menuEyebrow">Considered care. Clearly priced.</p><h2>Your time. <em>Your ritual.</em></h2></div>
      <p>Explore by category.<br />All prices are in Kenyan shillings.</p>
    </div>
    <div className="priceCategoryBar" role="group" aria-label="Filter treatments by category">
      <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}><CategoryIcon id="all" /><span>All treatments</span><small>{treatments.length}</small></button>
      {treatmentCategories.map(item => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}><CategoryIcon id={item.id} /><span>{item.id === "skin" ? "Facials & Skin" : item.title}</span><small>{treatments.filter(t => t.category === item.id).length}</small></button>)}
    </div>
    <p className="priceResultCount" role="status" aria-live="polite">{shown} treatments <span aria-hidden="true">/</span> {category === "all" ? "The complete menu" : treatmentCategories.find(item => item.id === category)?.title}</p>
    <div className="priceGroups" ref={menuRef} key={category}>
      {visibleCategories.map(group => <section className="priceGroup" key={group.id} aria-labelledby={`category-${group.id}`}>
        <div className="priceCategoryStory">
          <div className="priceCategoryPhoto"><Image src={group.image} alt={group.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 30vw, 25vw" style={{ objectPosition: group.position }} /><span className="pricePhotoNumber" aria-hidden="true">0{treatmentCategories.indexOf(group) + 1}</span></div>
          <p>{categoryNotes[group.id]}</p>
          <a href={`/treatments/${group.slug}`}>Explore the treatments <span aria-hidden="true">↗</span></a>
        </div>
        <div className="priceCategoryContent">
          <div className="priceCategoryHeading"><h3 id={`category-${group.id}`}>{group.title}</h3><span>{treatments.filter(item => item.category === group.id).length} offerings</span></div>
          <div className="priceServiceGrid">
            {treatments.filter(item => item.category === group.id).map((item, index) => <article className="priceService" key={item.id} style={{ "--price-delay": `${Math.min(index, 7) * 55}ms` } as CSSProperties}>
              <div className="priceServiceInfo">
                <h4>{item.name}</h4>
                <p className="priceServiceAmount">{item.price}</p>
                {item.duration && <span className="priceDuration">{item.duration}</span>}
              </div>
              <a className="priceServiceBook" href={book(`${item.name}${item.duration ? ` (${item.duration})` : ""}`)} target="_blank" rel="noopener noreferrer" aria-label={`${item.name === "Skin care products" ? "Ask about" : item.name === "Skin tag removal" ? "Arrange an assessment for" : "Enquire about"} ${item.name}${item.duration ? ` ${item.duration}` : ""} on WhatsApp`}><span aria-hidden="true">↗</span></a>
            </article>)}
          </div>
          <p className="priceCategoryFootnote">{group.id === "skin" ? "Skin tag removal is quoted after assessment. Ask us about available skin care products." : group.id === "body" ? "Sauna and steam bath are priced per hour. Confirm your preferred session when booking." : "Prices marked ‘From’ depend on your chosen service. Confirm your final quote when booking."}</p>
        </div>
      </section>)}
    </div>
  </section>;
}
