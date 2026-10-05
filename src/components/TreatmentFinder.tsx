"use client";

import MotionWords from "./MotionWords";
import { useRef, useState } from "react";

type Goal = {
  label: string;
  treatment: string;
  note: string;
};

type RitualCategory = {
  label: string;
  descriptor: string;
  image: string;
  goals: Goal[];
};

const bookingNumber = "254743364717";

const categories: RitualCategory[] = [
  {
    label: "Skin & Glow",
    descriptor: "Facials · analysis · skin refinement",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/ba27b39b-94dd-4880-8354-a8cbdf91c8e7.png",
    goals: [
      {
        label: "Glow & hydration",
        treatment: "Signature Facial",
        note: "A tailored facial ritual focused on freshness, hydration and a visibly renewed complexion.",
      },
      {
        label: "Clarity & smoother texture",
        treatment: "Targeted Facial",
        note: "A focused skin ritual selected around texture, congestion and overall skin clarity.",
      },
      {
        label: "Understand my skin",
        treatment: "Professional Skin Analysis",
        note: "A closer look at your skin before choosing the most suitable treatment and home-care direction.",
      },
      {
        label: "Skin tag concerns",
        treatment: "Skin Tag Removal",
        note: "Begin with a consultation to discuss assessment, suitability and next steps.",
      },
    ],
  },
  {
    label: "Body & Wellness",
    descriptor: "Massage · body ritual · sauna & steam",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/d09aadd5-d46f-418a-b64f-3792232ff1d6.jpg",
    goals: [
      {
        label: "De-bloat & feel lighter",
        treatment: "Lymphatic Massage",
        note: "A gentle body ritual designed to support circulation, relaxation and a lighter, less congested feeling.",
      },
      {
        label: "Smooth & renew my skin",
        treatment: "Moroccan Body Scrub",
        note: "A deeply cleansing exfoliation ritual for smoother, softer and freshly renewed skin.",
      },
      {
        label: "Relax & reset",
        treatment: "Sauna / Steam Ritual",
        note: "Unhurried heat therapy designed to help you decompress, unwind and reset.",
      },
    ],
  },
  {
    label: "Brows & Lashes",
    descriptor: "Microblading · lash enhancement",
    image:
      "/images/brow-detail.webp",
    goals: [
      {
        label: "Define my brows",
        treatment: "Microblading",
        note: "A precision brow service designed for natural-looking definition, structure and confidence.",
      },
      {
        label: "Enhance my lashes",
        treatment: "Eyelash Extensions",
        note: "A refined lash enhancement tailored to your features and preferred level of softness or definition.",
      },
    ],
  },
  {
    label: "Nails",
    descriptor: "Clean · polished · beautifully finished",
    image:
      "/images/nail-care.webp",
    goals: [
      {
        label: "A clean, polished finish",
        treatment: "Nail Care",
        note: "Considered nail care with close attention to preparation, finish and the details that make the result feel complete.",
      },
    ],
  },
  {
    label: "Hair Removal",
    descriptor: "Smooth · maintained · confident",
    image:
      "/images/smooth-skin.webp",
    goals: [
      {
        label: "Smooth, maintained skin",
        treatment: "Waxing",
        note: "Professional waxing with careful preparation and finishing for smooth, well-maintained skin.",
      },
    ],
  },
];

export default function TreatmentFinder() {
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [goalIndex, setGoalIndex] = useState<number | null>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const category = categoryIndex === null ? null : categories[categoryIndex];
  const goal = category && goalIndex !== null ? category.goals[goalIndex] : null;
  const step = goal ? 3 : category ? 2 : 1;
  const visualIndex = hoveredCategory ?? categoryIndex ?? 0;
  const visualCategory = categories[visualIndex];

  const chooseCategory = (index: number) => {
    setCategoryIndex(index);
    setGoalIndex(null);
  };

  const reset = () => {
    setCategoryIndex(null);
    setGoalIndex(null);
  };

  const moveCursor = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !imagePanelRef.current ||
      !cursorRef.current
    ) {
      return;
    }

    const bounds = imagePanelRef.current.getBoundingClientRect();
    cursorRef.current.style.opacity = "1";
    cursorRef.current.style.transform = `translate3d(${
      event.clientX - bounds.left - 18
    }px, ${event.clientY - bounds.top - 18}px, 0)`;
  };

  const hideCursor = () => {
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
  };

  const bookingHref = goal
    ? `https://wa.me/${bookingNumber}?text=${encodeURIComponent(
        `Hi Ginamu Aesthetics, I'd like to book ${goal.treatment}. Please help me with availability.`
      )}`
    : `https://wa.me/${bookingNumber}?text=${encodeURIComponent(
        "Hi Ginamu Aesthetics, I'd like help choosing and booking a treatment."
      )}`;

  return (
    <section
      className="ritualFinder"
      id="treatments"
      aria-labelledby="ritual-finder-title"
    >
      <div className="ritualFinderIntro" data-reveal="header">
        <p className="ritualEyebrow">Find your ritual</p>
        <h2 id="ritual-finder-title" aria-label="A more personal place to begin.">
          <MotionWords>A more personal place</MotionWords>{" "}<em><MotionWords>to begin.</MotionWords></em>
        </h2>
        <p>
          Not sure what to book? Choose your focus and goal for a suggested
          treatment, then speak with our team.
        </p>
      </div>

      <div className="ritualFinderShell" data-reveal="shell">
        <div className="ritualFinderPanel">
          <div className="ritualFinderMeta">
            <span>Ginamu treatment concierge</span>
            <span>0{step} / 03</span>
          </div>

          <div className="ritualFinderStage" key={`${step}-${categoryIndex}-${goalIndex}`}>
            {step === 1 && (
              <>
                <p className="ritualStepLabel">First, choose your focus</p>
                <h3>What would you like to care for today?</h3>

                <div className="ritualChoiceList" >
                  {categories.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      className="ritualChoice"
                      onClick={() => chooseCategory(index)}
                      onMouseEnter={() => setHoveredCategory(index)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      onFocus={() => setHoveredCategory(index)}
                      onBlur={() => setHoveredCategory(null)}
                    >
                      <span className="ritualChoiceNo">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="ritualChoiceCopy">
                        <strong>{item.label}</strong>
                        <small>{item.descriptor}</small>
                      </span>
                      <span className="ritualChoiceArrow" aria-hidden="true">
                        ↗
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && category && (
              <>
                <button
                  type="button"
                  className="ritualBack"
                  onClick={reset}
                >
                  ← Change focus
                </button>

                <p className="ritualStepLabel">{category.label}</p>
                <h3>What would you most like to achieve?</h3>

                <div className="ritualGoalGrid" >
                  {category.goals.map((item, index) => (
                    <button
                      key={item.label}
                      type="button"
                      className="ritualGoal"
                      onClick={() => setGoalIndex(index)}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 3 && category && goal && (
              <div className="ritualResult">
                <button
                  type="button"
                  className="ritualBack"
                  onClick={() => setGoalIndex(null)}
                >
                  ← Back
                </button>

                <p className="ritualStepLabel">Your Ginamu ritual</p>
                <h3>{goal.treatment}</h3>
                <p className="ritualResultText">{goal.note}</p>

                <div className="ritualResultRule" />

                <div className="ritualResultMeta">
                  <span>Selected focus</span>
                  <strong>
                    {category.label} · {goal.label}
                  </strong>
                </div>

                <div className="ritualResultActions">
                  <a
                    className="ritualBook"
                    href={bookingHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book this ritual
                    <span aria-hidden="true">↗</span>
                  </a>
                  <button type="button" className="ritualRestart" onClick={reset}>
                    Start again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="ritualFinderFooter">
            <span>Prefer a human recommendation?</span>
            <a href={bookingHref} target="_blank" rel="noopener noreferrer">
              Ask Ginamu on WhatsApp
            </a>
          </div>
        </div>

        <div
          className="ritualFinderVisual"
          data-parallax="6"
          ref={imagePanelRef}
          onPointerMove={moveCursor}
          onPointerLeave={hideCursor}
        >
          {categories.map((item, index) => (
            <img
              key={item.image}
              src={item.image}
              alt=""
              aria-hidden="true"
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
              style={item.label === "Hair Removal" ? { objectFit: "contain", background: "#e7e7e7" } : undefined}
              className={
                visualIndex === index
                  ? "ritualVisualImage active"
                  : "ritualVisualImage"
              }
            />
          ))}

          <div className="ritualVisualShade" aria-hidden="true" />

          <div className="ritualVisualCaption" key={visualCategory.label}>
            <span>{visualCategory.label}</span>
            <p>{visualCategory.descriptor}</p>
          </div>

          <div className="ritualVisualMark" aria-hidden="true">
            GA
          </div>

          <div className="ritualCursor" ref={cursorRef} aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
