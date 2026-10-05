"use client";
import { useEffect } from "react";
export default function ContactMotion() {
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
        gsap.fromTo(".contactPageHero .motionWord", { yPercent: 110, opacity: 0, rotateX: 14 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: .07, ease: "power4.out", clearProps: "transform,opacity" });
        gsap.fromTo(".contactHeroAside", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .9, delay: .35, ease: "power3.out", clearProps: "transform,opacity" });
        document.querySelectorAll("[data-contact-reveal]").forEach(section => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 88%", once: true } });
          tl.fromTo(section.querySelectorAll("h2 .motionWord"), { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, stagger: .065, ease: "power4.out", clearProps: "transform,opacity" }, 0)
            .fromTo(section.querySelectorAll(".contactChannelList > a, .contactBookingCard, .contactVisitInfo, .contactMap"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .1, ease: "power3.out", clearProps: "transform,opacity" }, .2);
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
