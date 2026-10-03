"use client";

import { useEffect } from "react";

export default function SiteMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.classList.add("is-visible");
      });
      return;
    }

    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          revealObserver.unobserve(el);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const vh = window.innerHeight;

      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > vh + 120) return;

        const center = rect.top + rect.height / 2;
        const normalized = (center - vh / 2) / vh;
        const strength = Number(el.dataset.parallax || "18");
        const y = Math.max(-strength, Math.min(strength, -normalized * strength * 2));
        el.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
      });
    };

    const requestParallax = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);

    const magneticEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]")
    );

    const magneticCleanups = magneticEls.map((el) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        el.style.setProperty("--mag-x", `${(dx * 0.16).toFixed(2)}px`);
        el.style.setProperty("--mag-y", `${(dy * 0.16).toFixed(2)}px`);
      };

      const reset = () => {
        el.style.setProperty("--mag-x", "0px");
        el.style.setProperty("--mag-y", "0px");
      };

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);

      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
      };
    });

    const imageEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spotlight]")
    );

    const spotlightCleanups = imageEls.map((el) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = el.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--spot-x", `${x.toFixed(1)}%`);
        el.style.setProperty("--spot-y", `${y.toFixed(1)}%`);
        el.classList.add("spotlight-active");
      };

      const reset = () => el.classList.remove("spotlight-active");

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);

      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
      };
    });

    return () => {
      revealObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      magneticCleanups.forEach((cleanup) => cleanup());
      spotlightCleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return null;
}
