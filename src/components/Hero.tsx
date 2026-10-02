"use client";

import { useEffect, useState } from "react";

const links = ["Treatments", "Rituals", "About", "Journal", "Contact"];
const decode = (value: string) => atob(value);

const heroImage = decode(
  "aHR0cHM6Ly9kMm9sN29lNTFtcjRuOS5jbG91ZGZyb250Lm5ldC91c2VyXzNIdWVUZzI1Q3VGcnVOODZTM3k0eXlza1FsWi9mNDRlODAwNi1jNWYyLTQ5YzctODY3OS1jMjRkMWU0MjU3ZmQuanBn"
);

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero heroEditorial" id="top">
      <img className="heroBackdrop" src={heroImage} alt="" aria-hidden="true" />
      <div className="heroOverlay" aria-hidden="true" />
      <div className="heroGlow" aria-hidden="true" />

      <header className={`navWrap ${scrolled ? "navScrolled" : ""}`}>
        <nav className="nav editorialNav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Ginamu Aesthetics home">
            <span className="brandWord">GINAMU</span>
            <span className="brandSub">AESTHETICS</span>
          </a>

          <div className="navLinks">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}>
                {link}
              </a>
            ))}
          </div>

          <a className="navCta editorialCta" href="#book">
            Book your ritual
          </a>

          <button className="menuButton" type="button" aria-label="Open menu">
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div className="heroContent">
        <div className="heroEyebrow">
          <span className="eyebrowLine" />
          <span>Beauty · Aesthetics · Wellbeing · Westlands</span>
        </div>

        <h1 className="editorialTitle">
          A ritual of
          <span>beauty &amp; wellbeing.</span>
        </h1>

        <p className="editorialCopy">
          Elevated skin, body and beauty treatments in a refined space where
          care, detail and visible results come first.
        </p>

        <div className="heroActions editorialActions">
          <a className="primaryButton heroPrimary" href="#book">
            Book your ritual
          </a>
          <a className="heroSecondary" href="#treatments">
            Explore treatments <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="heroTrust">
          <span>Bricks Court · 2nd Floor · Mpaka Road</span>
          <span className="trustDot">•</span>
          <span>Westlands, Nairobi</span>
        </div>
      </div>

      <div className="heroSideNote" aria-hidden="true">
        <span>GINAMU</span>
        <span>01 / 01</span>
      </div>

      <div className="heroBottom editorialBottom">
        <span>Scroll</span>
        <span className="scrollLine" aria-hidden="true" />
        <span>A ritual, not just a treatment.</span>
      </div>
    </section>
  );
}
