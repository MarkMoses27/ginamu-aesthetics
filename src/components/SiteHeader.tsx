"use client";
import { useEffect, useRef, useState } from "react";
const links = [{ label: "Home", href: "/#top" }, { label: "Treatments & Prices", href: "/treatments" }, { label: "About Us", href: "/about" }, { label: "Contact", href: "/contact" }];
const bookingUrl = "https://wa.me/254743364717?text=Hi%20Ginamu%20Aesthetics%2C%20I%27d%20like%20to%20book%20a%20treatment.%20Please%20help%20me%20with%20availability.";
export default function SiteHeader({ solid = false, onMenuChange }: { solid?: boolean; onMenuChange?: (open: boolean) => void }) {
 const [scrolled, setScrolled] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const menuButtonRef = useRef<HTMLButtonElement>(null);
 const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
 useEffect(() => { onMenuChange?.(menuOpen); }, [menuOpen, onMenuChange]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const focusTimer = menuOpen
      ? window.setTimeout(() => firstMenuLinkRef.current?.focus(), 80)
      : undefined;

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
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);
return (<>
      <header
        className={`navWrap ${(solid || scrolled) ? "navScrolled" : ""} ${menuOpen ? "navMenuOpen" : ""}`}
      >
        <nav className="nav editorialNav" aria-label="Main navigation">
          <a className="brand" href="/#top" aria-label="Ginamu Aesthetics home">
            <span className="brandWord">GINAMU</span>
            <span className="brandSub">AESTHETICS</span>
          </a>

          <div className="navLinks">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
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
        inert={!menuOpen}
        aria-label="Main menu"
      >
        <div className="mobileMenuInner">
          <div className="mobileMenuLinks">
            {links.map((link, index) => (
              <a
                ref={index === 0 ? firstMenuLinkRef : undefined}
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
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

</>);
}
