"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const links = ["Treatments", "Rituals", "About", "Journal", "Contact"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let raf = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        hero.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      });
    };

    hero.addEventListener("pointermove", onMove);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero" id="top">
      <div className="livingLight" aria-hidden="true" />

      <header className={`navWrap ${scrolled ? "navScrolled" : ""}`}>
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Ginamu Aesthetics home">
            <span className="brandMark">
              <Image src="/ginamu-logo.webp" alt="" width={80} height={80} priority />
            </span>
            <span className="brandType">
              <strong>GINAMU</strong>
              <small>AESTHETICS</small>
            </span>
          </a>

          <div className="navLinks">
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}>
                {link}
              </a>
            ))}
          </div>

          <a className="navCta" href="#book">
            Book your ritual <span aria-hidden="true">↗</span>
          </a>

          <button className="menuButton" type="button" aria-label="Open menu">
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div className="heroGrid">
        <div className="heroCopy">
          <p className="eyebrow">WESTLANDS · NAIROBI</p>
          <h1>
            A ritual of
            <span>beauty &amp; wellbeing.</span>
          </h1>
          <p className="heroText">
            Elevated skin, body and beauty treatments — created to make every
            visit feel personal, polished and memorable.
          </p>

          <div className="heroActions">
            <a className="primaryButton" href="#book">
              Book your ritual
              <span className="buttonArrow" aria-hidden="true">↗</span>
            </a>
            <a className="textButton" href="#treatments">
              Explore treatments <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="heroMeta">
            <div>
              <span className="metaNo">01</span>
              <p>Bricks Court, 2nd Floor<br />Mpaka Road, Westlands</p>
            </div>
            <div>
              <span className="metaNo">02</span>
              <p>Skin · Body · Nails<br />Lashes · Brows · Wellness</p>
            </div>
          </div>
        </div>

        <div className="heroVisual" aria-label="Ginamu beauty editorial">
          <div className="mainPortrait imageReveal">
            <Image
              src="/images/hero-red.webp"
              alt="Beauty portrait"
              fill
              priority
              sizes="(max-width: 900px) 80vw, 42vw"
            />
            <div className="portraitWash" />
          </div>

          <div className="floatingCard flowerCard imageReveal delay1">
            <Image
              src="/images/hero-flower.webp"
              alt="Beauty portrait with floral styling"
              fill
              sizes="(max-width: 900px) 28vw, 16vw"
            />
          </div>

          <div className="floatingCard creamCard imageReveal delay2">
            <Image
              src="/images/hero-cream.webp"
              alt="Skincare portrait"
              fill
              sizes="(max-width: 900px) 26vw, 14vw"
            />
          </div>

          <div className="ritualStamp" aria-hidden="true">
            <span>GINAMU · BEAUTY · WELLBEING ·</span>
            <b>✦</b>
          </div>
          <span className="spark sparkOne" aria-hidden="true">✦</span>
          <span className="spark sparkTwo" aria-hidden="true">✧</span>
        </div>
      </div>

      <div className="heroBottom">
        <span>Scroll to discover</span>
        <span className="scrollLine" aria-hidden="true" />
        <span>A ritual, not just a treatment.</span>
      </div>
    </section>
  );
}
