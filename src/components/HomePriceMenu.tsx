"use client";

import { useMemo, useState } from "react";
import type { Treatment } from "@/lib/treatment-content";

const steamIds = new Set(["body-7", "body-8", "body-9", "body-10"]);
const featured = ["body-swedish", "skin-express", "body-7", "body-9", "nails-16", "brows-28"];

const groups = [
  { id: "featured", title: "Popular choices", short: "Featured" },
  { id: "body-massage", title: "Massage & body", short: "Massage" },
  { id: "body-ritual", title: "Steam, sauna & Moroccan", short: "Spa rituals" },
  { id: "skin", title: "Facials & skin", short: "Facials" },
  { id: "nails", title: "Nails", short: "Nails" },
  { id: "brows", title: "Lashes & brows", short: "Lashes & brows" },
  { id: "waxing", title: "Waxing", short: "Waxing" },
] as const;

type GroupId = (typeof groups)[number]["id"];

function belongsToGroup(item: Treatment, group: GroupId): boolean {
  if (group === "featured") return featured.includes(item.id);
  if (group === "body-massage") return item.category === "body" && !steamIds.has(item.id);
  if (group === "body-ritual") return item.category === "body" && steamIds.has(item.id);
  return item.category === group;
}

function bookingLink(item: Treatment): string {
  const description = `${item.name}${item.duration ? ` (${item.duration})` : ""}`;
  const message = `Hi Ginamu Aesthetics, I'd like to enquire about ${description} at ${item.price}. Please confirm availability.`;
  return `https://wa.me/254741174816?text=${encodeURIComponent(message)}`;
}

export default function HomePriceMenu({ treatments }: { treatments: Treatment[] }) {
  const [selected, setSelected] = useState<GroupId>("featured");
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const matching = useMemo(() => {
    if (normalizedSearch) {
      return treatments.filter((item) =>
        `${item.name} ${item.category} ${item.duration ?? ""}`.toLocaleLowerCase().includes(normalizedSearch)
      );
    }
    if (selected === "featured") {
      return featured.map((id) => treatments.find((item) => item.id === id)).filter((item): item is Treatment => Boolean(item));
    }
    return treatments.filter((item) => belongsToGroup(item, selected));
  }, [treatments, selected, normalizedSearch]);

  const currentGroup = groups.find((group) => group.id === selected)!;
  const heading = normalizedSearch ? "Search results" : currentGroup.title;

  return (
    <section className="homePriceMenu" id="quick-prices" aria-labelledby="home-price-title">
      <div className="homePriceIntro">
        <div>
          <p className="homePriceEyebrow"><span aria-hidden="true" /> THE GINAMU MENU</p>
          <h2 id="home-price-title">Your treatment.<br /><em>Your time.</em></h2>
        </div>
        <p className="homePriceLead">Know what you want? Find it here, see the price and enquire directly. No lengthy forms, no guessing.</p>
      </div>

      <div className="homePriceShell">
        <div className="homePriceTopbar">
          <div className="homePriceTopbarCopy">
            <span>Explore the treatments</span>
            <strong>Choose your ritual</strong>
          </div>
          <label className="homePriceSearch">
            <span className="sr-only">Search treatments by name</span>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
            <input type="search" placeholder="Search treatments..." value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
        </div>

        <div className="homePriceTabs" role="group" aria-label="Browse by treatment category">
          {groups.map((group) => (
            <button
              key={group.id}
              type="button"
              className={group.id === selected && !normalizedSearch ? "homePriceTab isSelected" : "homePriceTab"}
              aria-pressed={group.id === selected && !normalizedSearch}
              onClick={() => { setSelected(group.id); setSearch(""); }}
            >
              {group.short}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        <div className="homePriceResultHeading">
          <div>
            <p>{normalizedSearch ? "MATCHING TREATMENTS" : "CONSIDERED CARE"}</p>
            <h3>{heading}</h3>
          </div>
          <span role="status" aria-live="polite">{matching.length} {matching.length === 1 ? "option" : "options"}</span>
        </div>

        <div className="homePriceRows" key={normalizedSearch ? "search" : selected}>
          {matching.length === 0 && (
            <p className="homePriceEmpty">We could not find that treatment. Try another name or ask our team for guidance.</p>
          )}
          {matching.map((item, index) => (
            <article className="homePriceRow" key={item.id} style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}>
              <div className="homePriceRowMain">
                <h4>{item.name}</h4>
                {item.duration && <span>{item.duration}</span>}
              </div>
              <span className="homePriceAmount">{item.price}</span>
              <a href={bookingLink(item)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${item.name} on WhatsApp`}>
                Enquire <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <div className="homePriceFooter">
          <div><span>Transparent pricing</span><p>Prices marked “From” are confirmed after assessment. Booking is subject to availability.</p></div>
          <a href="/treatments">Full treatments & prices <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
