"use client";

import { useEffect, useRef, useState } from "react";

const links = ["Treatments", "Rituals", "About", "Journal", "Contact"];
const decode = (value: string) => atob(value);
const bookingUrl =
  "https://wa.me/254743364717?text=Hi%20Ginamu%20Aesthetics%2C%20I%27d%20like%20to%20book%20a%20treatment.%20Please%20help%20me%20with%20availability.";

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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    if (menuOpen) {
      window.setTimeout(() => firstMenuLinkRef.current?.focus(), 80);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menuOpen) return;

      const focusables = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".menuButton, #mobile-menu a[href]"
        )
      ).filter((element) => element.offsetParent !== null);

      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth > 1100) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
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

      <header
        className={`navWrap ${scrolled ? "navScrolled" : ""} ${menuOpen ? "navMenuOpen" : ""}`}
      >
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

          <a
            className="navCta editorialCta"
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book your ritual on WhatsApp"
          >
            Book your ritual
          </a>

          <button
            ref={menuButtonRef}
            className={`menuButton ${menuOpen ? "isOpen" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`mobileMenu ${menuOpen ? "isOpen" : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="mobileMenuInner">
          <div className="mobileMenuLinks">
            {links.map((link, index) => (
              <a
                ref={index === 0 ? firstMenuLinkRef : undefined}
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>

          <a
            className="mobileMenuCta"
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book your ritual on WhatsApp"
            onClick={() => setMenuOpen(false)}
          >
            Book your ritual
          </a>
        </div>
      </div>

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
    </section>
  );
}
