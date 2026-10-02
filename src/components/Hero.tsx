"use client";

import { useEffect, useState } from "react";

const links = ["Treatments", "Rituals", "About", "Journal", "Contact"];
const decode = (value: string) => atob(value);

const slides = [
  {
    image: decode("aHR0cHM6Ly9kMm9sN29lNTFtcjRuOS5jbG91ZGZyb250Lm5ldC91c2VyXzNIdWVUZzI1Q3VGcnVOODZTM3k0eXlza1FsWi9mNDRlODAwNi1jNWYyLTQ5YzctODY3OS1jMjRkMWU0MjU3ZmQuanBn"),
    position: "68% 42%",
  },
  {
    image: decode("aHR0cHM6Ly9kMm9sN29lNTFtcjRuOS5jbG91ZGZyb250Lm5ldC91c2VyXzNIdWVUZzI1Q3VGcnVOODZTM3k0eXlza1FsWi80MWYwYTllNy00MWM1LTQwNGItYjU2Yi1hOGY1ZmFjZTRlNjUuanBn"),
    position: "62% 50%",
  },
  {
    image: decode("aHR0cHM6Ly9kMm9sN29lNTFtcjRuOS5jbG91ZGZyb250Lm5ldC91c2VyXzNIdWVUZzI1Q3VGcnVOODZTM3k0eXlza1FsWi9kMDlhYWRkNS1kNDZmLTQxOGEtYjY0Zi0zNzkyMjMyZmYxZDYuanBn"),
    position: "58% 50%",
  },
];

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero heroEditorial" id="top">
      <div className="heroSlides" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            className={`heroSlide ${index === active ? "isActive" : ""}`}
            key={slide.image}
          >
            <img
              src={slide.image}
              alt=""
              style={{ objectPosition: slide.position }}
            />
          </div>
        ))}
      </div>

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
        <h1 className="editorialTitle">
          The art of feeling
          <span>beautifully yourself.</span>
        </h1>

        <p className="editorialCopy">
          Refined skin, body and beauty rituals created around care, detail and
          visible results.
        </p>

        <div className="heroActions editorialActions">
          <a className="primaryButton heroPrimary" href="#book">
            Book your ritual
          </a>
          <a className="heroSecondary" href="#treatments">
            Explore treatments
          </a>
        </div>
      </div>

      <div className="sliderControls" aria-label="Hero slides">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show hero image ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            className={index === active ? "active" : ""}
          >
            <span />
          </button>
        ))}
      </div>

      <div className="heroBottom editorialBottom">
        <span className="scrollLabel">Scroll</span>
        <span className="scrollLine" aria-hidden="true" />
      </div>
    </section>
  );
}
