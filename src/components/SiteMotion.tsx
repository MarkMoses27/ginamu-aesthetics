"use client";

import { useEffect } from "react";

export default function SiteMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealEls.forEach((el) => observer.observe(el));

    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );

    let raf = 0;

    const updateParallax = () => {
      raf = 0;
      const vh = window.innerHeight;

      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) return;

        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const strength = Number(el.dataset.parallax || "8");
        const y = Math.max(-strength, Math.min(strength, -progress * strength * 1.4));
        el.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
      });
    };

    const requestParallax = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);

    return () => {
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
    };
  }, []);

  return null;
}
