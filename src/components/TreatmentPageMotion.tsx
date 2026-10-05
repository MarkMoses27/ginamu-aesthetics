"use client";
import { useEffect } from "react";
export default function TreatmentPageMotion() {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setup = async () => {
      if (preference.matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || preference.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.fromTo(".serviceHero .motionWord", { yPercent: 110, opacity: 0, rotateX: 15 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: .07, ease: "power4.out", clearProps: "transform,opacity" });
        gsap.fromTo(".serviceHeroImage", { scale: 1.05 }, { scale: 1, duration: 1.8, ease: "power2.out", clearProps: "transform" });
        document.querySelectorAll("[data-service-reveal]").forEach(section => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 86%", once: true } });
          const words = section.querySelectorAll("h2 .motionWord");
          if (words.length) tl.fromTo(words, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, stagger: .05, ease: "power4.out", clearProps: "transform,opacity" }, 0);
          const rows = section.querySelectorAll(".servicePriceRow, .serviceFaqList > details");
          if (rows.length) tl.fromTo(rows, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .75, stagger: .065, ease: "power3.out", clearProps: "transform,opacity" }, .15);
        });
      });
      cleanup = () => context.revert();
    };
    const onChange = () => { if (preference.matches) cleanup(); };
    preference.addEventListener("change", onChange);
    setup().catch(() => cleanup());
    return () => { cancelled = true; cleanup(); preference.removeEventListener("change", onChange); };
  }, []);
  return null;
}
