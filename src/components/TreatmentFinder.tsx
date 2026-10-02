"use client";

import { useRef, useState } from "react";

const decode = (value: string) => atob(value);

const finderImage = decode(
  "aHR0cHM6Ly9kMm9sN29lNTFtcjRuOS5jbG91ZGZyb250Lm5ldC91c2VyXzNIdWVUZzI1Q3VGcnVOODZTM3k0eXlza1FsWi9kMDlhYWRkNS1kNDZmLTQxOGEtYjY0Zi0zNzkyMjMyZmYxZDYuanBn"
);

const options = [
  {
    label: "Skin & Glow",
    services: "Facials · Skin Analysis · Skin Tag Removal",
  },
  {
    label: "Body & Wellness",
    services: "Lymphatic Massage · Moroccan Body Scrubs · Sauna / Steam",
  },
  {
    label: "Brows & Lashes",
    services: "Microblading · Eyelash Extensions",
  },
  {
    label: "Nails",
    services: "Nail Care",
  },
  {
    label: "Hair Removal",
    services: "Waxing",
  },
];

export default function TreatmentFinder() {
  const [active, setActive] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const moveCursor = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !cardRef.current || !cursorRef.current) return;

    const bounds = cardRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    cursorRef.current.style.opacity = "1";
    cursorRef.current.style.transform = `translate3d(${x - 17}px, ${y - 17}px, 0)`;
  };

  const hideCursor = () => {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  };

  return (
    <section className="finderSection" id="treatments" aria-labelledby="finder-title">
      <div
        className="finderCard"
        ref={cardRef}
        onPointerMove={moveCursor}
        onPointerLeave={hideCursor}
      >
        <img
          className="finderImage"
          src={finderImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <div className="finderOverlay" aria-hidden="true" />

        <div className="finderContent">
          <p className="finderKicker">
            <span aria-hidden="true" />
            Treatment finder
          </p>

          <h2 id="finder-title">
            Where would you like to <em>begin?</em>
          </h2>

          <p className="finderLead">
            Tell us what you’d like to focus on and we’ll guide you to the right ritual.
          </p>

          <div className="finderOptions" role="group" aria-label="Treatment interests">
            {options.map((option, index) => (
              <button
                key={option.label}
                type="button"
                className={index === active ? "active" : ""}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                {option.label}
              </button>
            ))}
          </div>


          <a className="finderLink" href="#services">
            Explore all treatments <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="finderCursor" ref={cursorRef} aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
