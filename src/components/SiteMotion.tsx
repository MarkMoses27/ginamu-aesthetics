"use client";

import { useEffect } from "react";

export default function SiteMotion() {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    const setup = async () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const [{ gsap }, scrollModule, lenisModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (cancelled) return;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      const Lenis = lenisModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const isDesktop = window.matchMedia("(min-width: 821px) and (pointer: fine)").matches;
      const lenis = isDesktop
        ? new Lenis({
            duration: 1.15,
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 0.92,
          })
        : null;

      const ticker = (time: number) => {
        if (lenis) lenis.raf(time * 1000);
      };

      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
      }

      const heroContext = gsap.context(() => {
        const entrance = gsap.timeline({ defaults: { ease: "power4.out" } });
        entrance.fromTo(".editorialTitle .motionWord", { yPercent: 115, rotateX: 18, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.2, stagger: .09, clearProps: "transform,opacity,visibility" }, .25)
          .fromTo(".heroSlides", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.55, ease: "power4.inOut" }, 0)
          .fromTo(".editorialCopy, .editorialActions, .sliderControls", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .8, stagger: .08 }, .9);
        gsap.to(".heroSlides", { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".heroEditorial", start: "top top", end: "bottom top", scrub: 1 } });
        gsap.to(".heroContent", { y: -65, ease: "none", scrollTrigger: { trigger: ".heroEditorial", start: "top top", end: "bottom top", scrub: 1 } });
        document.querySelectorAll<HTMLElement>(".ritualFinderIntro, .signatureHeader, .ginamuAbout, .ginamuContact, .signatureMoreIntro").forEach(section => {
          const title = section.querySelector("h2");
          const words = title?.querySelectorAll(".motionWord");
          const eyebrow = section.querySelector(".ritualEyebrow, .signatureKicker, .sectionLabel");
          const copy = section.querySelector(".signatureIntro, .aboutCopy, .contactAction, .signatureMoreCopy, :scope > p:last-child");
          const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 82%", once: true } });
          if (eyebrow) tl.fromTo(eyebrow, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .65, ease: "power3.out" }, 0);
          if (words?.length) tl.fromTo(words, { yPercent: 115, rotateX: 14, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.05, stagger: .075, ease: "power4.out", clearProps: "transform,opacity,visibility" }, .12);
          if (copy) tl.fromTo(copy, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .8, ease: "power3.out" }, .6);
          const principles = section.querySelectorAll(".aboutPrinciples > div");
          if (principles.length) tl.fromTo(principles, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: .12, duration: .85, ease: "power3.out" }, .75);
        });
      });
      const mm = gsap.matchMedia();

      mm.add("(min-width: 821px)", () => {
        const finderShell = document.querySelector<HTMLElement>(".ritualFinderShell");
        if (finderShell) {
          const panel = finderShell.querySelector<HTMLElement>(".ritualFinderPanel");
          const visual = finderShell.querySelector<HTMLElement>(".ritualFinderVisual");
          const image = visual?.querySelector<HTMLElement>(".ritualVisualImage.active");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: finderShell,
              start: "top 80%",
              once: true,
            },
          });

          tl.fromTo(
            finderShell,
            { clipPath: "inset(0 0 0 100%)" },
            {
              clipPath: "inset(0 0 0 0%)",
              duration: 1.05,
              ease: "power4.inOut",
            }
          );

          if (panel) {
            tl.fromTo(
              panel,
              { x: -34, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, duration: 0.78, ease: "power3.out" },
              "-=0.45"
            );
          }

          if (visual) {
            tl.fromTo(
              visual,
              { scale: 1.04 },
              { scale: 1, duration: 1.15, ease: "power3.out" },
              "-=0.72"
            );
          }

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.12 },
              {
                scale: 1.02,
                ease: "none",
                scrollTrigger: {
                  trigger: finderShell,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.15,
                },
              }
            );
          }
        }

        const cards = gsap.utils.toArray<HTMLElement>(".signatureCard");

        cards.forEach((card, index) => {
          const imageWrap = card.querySelector<HTMLElement>(".signatureImageWrap");
          const image = imageWrap?.querySelector<HTMLElement>("img");
          const copy = card.querySelector<HTMLElement>(".signatureCardCopy");
          const top = card.querySelector<HTMLElement>(".signatureImageTop");

          const direction = index % 2 === 0 ? -1 : 1;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
              once: true,
            },
          });

          if (imageWrap) {
            tl.fromTo(
              imageWrap,
              { clipPath: direction < 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" },
              {
                clipPath: "inset(0 0 0 0)",
                duration: 1.08,
                ease: "power4.inOut",
              }
            );
          }

          if (image) {
            tl.fromTo(
              image,
              { scale: 1.13, xPercent: direction * 2.2 },
              {
                scale: 1.02,
                xPercent: 0,
                duration: 1.28,
                ease: "power3.out",
              },
              "-=0.82"
            );

            gsap.fromTo(
              image,
              { yPercent: -3.5 },
              {
                yPercent: 3.5,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              }
            );
          }

          if (top) {
            tl.fromTo(
              top,
              { y: -10, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, ease: "power2.out" },
              "-=0.68"
            );
          }

          if (copy) {
            tl.fromTo(
              copy.children,
              { y: 24, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.72,
                stagger: 0.085,
                ease: "power3.out",
              },
              "-=0.48"
            );
          }
        });

        const moreRows = gsap.utils.toArray<HTMLElement>(".signatureMoreList .serviceDetail");
        if (moreRows.length) {
          gsap.fromTo(
            moreRows,
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.62,
              stagger: 0.07,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".signatureMore",
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        gsap.utils.toArray<HTMLElement>(".signatureImageWrap").forEach((wrap) => {
          const image = wrap.querySelector<HTMLElement>("img");
          if (!image) return;

          const enter = () =>
            gsap.to(image, {
              scale: 1.045,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });

          const leave = () =>
            gsap.to(image, {
              scale: 1.02,
              duration: 0.9,
              ease: "power3.out",
              overwrite: "auto",
            });

          wrap.addEventListener("mouseenter", enter);
          wrap.addEventListener("mouseleave", leave);

          (wrap as any).__ginamuCleanup = () => {
            wrap.removeEventListener("mouseenter", enter);
            wrap.removeEventListener("mouseleave", leave);
          };
        });


      });

      mm.add("(max-width: 820px)", () => {
        gsap.utils.toArray<HTMLElement>(".ritualFinderShell, .signatureCard, .signatureMore").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.78,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
      });

      const refreshOnToggle = () => ScrollTrigger.refresh();
      document.querySelectorAll<HTMLDetailsElement>(".serviceDetail").forEach(detail => detail.addEventListener("toggle", refreshOnToggle));
      ScrollTrigger.refresh();

      cleanup = () => {
        document.querySelectorAll<HTMLDetailsElement>(".serviceDetail").forEach(detail => detail.removeEventListener("toggle", refreshOnToggle));
        document.querySelectorAll<HTMLElement>(".signatureImageWrap").forEach((wrap) => {
          (wrap as any).__ginamuCleanup?.();
        });
        heroContext.revert();
        mm.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        if (lenis) {
          lenis.destroy();
          gsap.ticker.remove(ticker);
        }
      };
    };

    setup().catch(() => cleanup());

    return () => { cancelled = true; cleanup(); };
  }, []);

  return null;
}
