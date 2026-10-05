"use client";

import { useEffect } from "react";

export default function AboutMotion() {
  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setup = async () => {
      if (media.matches) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || media.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const entrance = gsap.timeline({ defaults: { ease: "power4.out" } });
        entrance.fromTo(".aboutHeroContent .motionWord", { yPercent: 110, rotateX: 15, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.2, stagger: .075, clearProps: "transform,opacity" }, .1)
          .fromTo(".aboutHeroContent > p, .aboutHeroExplore", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .85, stagger: .1, clearProps: "transform,opacity" }, .4);
        gsap.fromTo(".aboutHeroImage", { scale: 1.045 }, { scale: 1, duration: 1.8, ease: "power2.out" });
        document.querySelectorAll<HTMLElement>("[data-about-reveal]").forEach(section => {
          const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 85%", once: true } });
          timeline.fromTo(section.querySelectorAll(".aboutEyebrow"), { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .6, clearProps: "transform,opacity" }, 0)
            .fromTo(section.querySelectorAll("h2 .motionWord"), { yPercent: 110, rotateX: 12, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 1, stagger: .055, ease: "power4.out", clearProps: "transform,opacity" }, .1)
            .fromTo(section.querySelectorAll(".aboutStoryCopy, .aboutValue, .aboutJourneySteps > li, .aboutInvitation > p:not(.aboutEyebrow), .aboutBookButton"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: .85, stagger: .1, ease: "power3.out", clearProps: "transform,opacity" }, .3);
          const visual = section.querySelector(".aboutJourneyVisual");
          if (visual) timeline.fromTo(visual, { clipPath: "inset(0 0 12% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power4.out", clearProps: "clipPath" }, 0);
        });
      });
      dispose = () => context.revert();
    };
    const onPreferenceChange = () => { if (media.matches) dispose(); };
    media.addEventListener("change", onPreferenceChange);
    setup().catch(() => dispose());
    return () => { cancelled = true; dispose(); media.removeEventListener("change", onPreferenceChange); };
  }, []);
  return null;
}
