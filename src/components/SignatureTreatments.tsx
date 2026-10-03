import type { CSSProperties } from "react";

const bookingNumber = "254743364717";

const treatments = [
  {
    number: "01",
    name: "Skin Analysis",
    category: "Skin · Consultation",
    copy: "A considered first step — understanding your skin before choosing what it truly needs.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/ba27b39b-94dd-4880-8354-a8cbdf91c8e7.png",
    className: "signatureCardLarge",
  },
  {
    number: "02",
    name: "Signature Facials",
    category: "Skin · Glow",
    copy: "Tailored facial rituals designed around hydration, clarity, texture and visible radiance.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/41f0a9e7-41c5-404b-b56b-a8f5face4e65.jpg",
    className: "signatureCardTall",
  },
  {
    number: "03",
    name: "Moroccan Body Scrub",
    category: "Body · Renewal",
    copy: "A deeply cleansing body ritual that leaves skin feeling polished, soft and renewed.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/d09aadd5-d46f-418a-b64f-3792232ff1d6.jpg",
    className: "signatureCardWide",
  },
  {
    number: "04",
    name: "Microblading",
    category: "Brows · Definition",
    copy: "Precision brow artistry shaped around your features for natural-looking definition.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/e733f789-5158-437e-8efe-de10bd5a883b.jpg",
    className: "signatureCardPortrait",
  },
];

const moreTreatments = [
  "Lymphatic Massage",
  "Eyelash Extensions",
  "Nail Care",
  "Sauna / Steam",
  "Waxing",
  "Skin Tag Removal",
];

const bookingHref = (name: string) =>
  `https://wa.me/${bookingNumber}?text=${encodeURIComponent(
    `Hi Ginamu Aesthetics, I'd like to book ${name}. Please help me with availability.`
  )}`;

export default function SignatureTreatments() {
  return (
    <section className="signatureTreatments" id="services" aria-labelledby="signature-title">
      <div className="signatureHeader" data-reveal="header">
        <div>
          <p className="signatureKicker">Signature rituals</p>
          <h2 id="signature-title">
            Treatments worth <em>returning to.</em>
          </h2>
        </div>

        <div className="signatureIntro">
          <p>
            Thoughtful beauty and wellbeing rituals, chosen for the way they
            make you look, feel and carry yourself afterwards.
          </p>
          <a href="#all-treatments">Explore every treatment <span aria-hidden="true">↗</span></a>
        </div>
      </div>

      <div className="signatureGallery">
        {treatments.map((treatment) => (
          <article
            className={`signatureCard ${treatment.className}`}
            key={treatment.name}
            data-reveal="card"
            style={{ "--reveal-delay": `${Number(treatment.number) * 90}ms` } as CSSProperties}
          >
            <div className="signatureImageWrap" data-parallax="16" data-spotlight>
              <img
                src={treatment.image}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="signatureImageShade" aria-hidden="true" />

              <div className="signatureImageTop">
                <span>{treatment.number}</span>
                <span>{treatment.category}</span>
              </div>

              <a
                className="signatureHoverAction"
                data-magnetic
                href={bookingHref(treatment.name)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Book ${treatment.name} on WhatsApp`}
              >
                <span>Book</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="signatureCardCopy">
              <h3>{treatment.name}</h3>
              <p>{treatment.copy}</p>
              <a
                href={bookingHref(treatment.name)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book this ritual <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="signatureMore" id="all-treatments" data-reveal="more">
        <p>More at Ginamu</p>
        <div className="signatureMoreList">
          {moreTreatments.map((item, index) => (
            <a
              data-reveal="row"
              style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
              href={bookingHref(item)}
              target="_blank"
              rel="noopener noreferrer"
              key={item}
            >
              <span>{String(index + 5).padStart(2, "0")}</span>
              <strong>{item}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
