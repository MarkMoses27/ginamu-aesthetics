"use client";

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
      "data:image/webp;base64,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",
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
        note: "A precise consultation-led service for safe, considered skin tag removal.",
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
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/e733f789-5158-437e-8efe-de10bd5a883b.jpg",
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
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/f44e8006-c5f2-49c7-8679-c24d1e4257fd.jpg",
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
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/41f0a9e7-41c5-404b-b56b-a8f5face4e65.jpg",
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
      <div className="ritualFinderIntro">
        <p className="ritualEyebrow">Find your ritual</p>
        <h2 id="ritual-finder-title">
          A more personal place <em>to begin.</em>
        </h2>
        <p>
          Two simple choices. We’ll guide you towards the Ginamu ritual that
          best matches what you want to feel or refine.
        </p>
      </div>

      <div className="ritualFinderShell">
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

                <div className="ritualChoiceList" role="list">
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

                <div className="ritualGoalGrid" role="list">
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
