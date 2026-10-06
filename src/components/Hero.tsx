"use client";

import MotionWords from "./MotionWords";
import { useEffect, useState } from "react";
import SiteHeader from "./SiteHeader";

const decode = (value: string) => atob(value);
const bookingUrl =
  "https://wa.me/254741174816?text=Hi%20Ginamu%20Aesthetics%2C%20I%27d%20like%20to%20book%20a%20treatment.%20Please%20help%20me%20with%20availability.";

const slides = [
  {
    image: decode("aHR0cHM6Ly9kMm9sN29lNTFtcjRuOS5jbG91ZGZyb250Lm5ldC91c2VyXzNIdWVUZzI1Q3VGcnVOODZTM3k0eXlza1FsWi9mNDRlODAwNi1jNWYyLTQ5YzctODY3OS1jMjRkMWU0MjU3ZmQuanBn"),
    className: "slideBeauty",
  },
  {
    image: decode("aHR0cHM6Ly9kMm9sN29lNTFtcjRuOS5jbG91ZGZyb250Lm5ldC91c2VyXzNIdWVUZzI1Q3VGcnVOODZTM3k0eXlza1FsWi80MWYwYTllNy00MWM1LTQwNGItYjU2Yi1hOGY1ZmFjZTRlNjUuanBn"),
    className: "slideFacial",
  },
  {
    image: decode("aHR0cHM6Ly9kMm9sN29lNTFtcjRuOS5jbG91ZGZyb250Lm5ldC91c2VyXzNIdWVUZzI1Q3VGcnVOODZTM3k0eXlza1FsWi9kMDlhYWRkNS1kNDZmLTQxOGEtYjY0Zi0zNzkyMjMyZmYxZDYuanBn"),
    className: "slideBody",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(media.matches);
    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion || menuOpen) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActive((current) => (current + 1) % slides.length);
      }
    }, 6200);

    return () => window.clearInterval(timer);
  }, [reduceMotion, menuOpen]);



  return (
    <>
      <SiteHeader onMenuChange={setMenuOpen} />
    <section className="hero heroEditorial" id="top">
      <div className="heroSlides" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            className={`heroSlide ${slide.className} ${index === active ? "isActive" : ""}`}
            key={slide.image}
          >
            <img
              src={slide.image}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="heroOverlay" aria-hidden="true" />
      <div className="heroGlow" aria-hidden="true" />

      <div className="heroContent">
        <h1 className="editorialTitle" aria-label="The art of feeling beautifully yourself.">
          <MotionWords>The art of feeling</MotionWords>{" "}
          <span><MotionWords>beautifully yourself.</MotionWords></span>
        </h1>

        <p className="editorialCopy">
          Refined skin, body and beauty rituals created around care, detail and
          visible results.
        </p>

        <div className="heroActions editorialActions">
          <a
            className="primaryButton heroPrimary"
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book your ritual on WhatsApp"
          >
            Book your ritual
          </a>
          <a className="heroSecondary" href="#treatments">
            Explore treatments
          </a>
        </div>
      </div>

    </section>
    </>
  );
}
