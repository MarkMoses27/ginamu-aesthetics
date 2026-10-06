import prices from "@/data/treatments.json";
import MotionWords from "./MotionWords";
import type { CSSProperties } from "react";

const bookingNumber = "254743364717";

const treatments = [
  {
    number: "01",
    guide: "/treatments/facials-skin",
    name: "Skin Analysis",
    category: "Skin · Consultation",
    copy: "Understand your skin and discuss a suitable treatment and home care routine.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/ba27b39b-94dd-4880-8354-a8cbdf91c8e7.png",
    className: "signatureCardLarge",
    price: prices.find(item => item.name === "Skin analysis")!.price,
  },
  {
    number: "02",
    guide: "/treatments/facials-skin",
    name: "Facials",
    category: "Skin · Glow",
    copy: "Facial care selected around your skin’s hydration, texture and appearance.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/41f0a9e7-41c5-404b-b56b-a8f5face4e65.jpg",
    className: "signatureCardTall",
    price: "From " + prices.find(item => item.name === "Classic cleansing facial")!.price,
  },
  {
    number: "03",
    guide: "/treatments/body-wellness",
    name: "Moroccan Body Scrub",
    category: "Body · Renewal",
    copy: "An exfoliating body scrub for a softer, smoother skin finish.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/d09aadd5-d46f-418a-b64f-3792232ff1d6.jpg",
    className: "signatureCardWide",
    price: prices.find(item => item.name === "Moroccan body scrub")!.price,
  },
  {
    number: "04",
    guide: "/treatments/brows-lashes",
    name: "Microblading",
    category: "Brows · Definition",
    copy: "Brow shape and definition planned around your features and preferred look.",
    image:
      "/images/brow-detail.webp",
    className: "signatureCardPortrait",
    price: prices.find(item => item.name === "Microblading")!.price,
  },
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
          <h2 id="signature-title" aria-label="Treatments worth returning to.">
            <MotionWords>Treatments worth</MotionWords>{" "}<em><MotionWords>returning to.</MotionWords></em>
          </h2>
        </div>

        <div className="signatureIntro">
          <p>
            Explore four of our featured treatments, from your first skin
            consultation to body care and brow definition.
          </p>
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
            <div className="signatureImageWrap" data-parallax="7">
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
              <div className="signatureNamePrice"><h3>{treatment.name}</h3><span>{treatment.price}</span></div>
              <p>{treatment.copy}</p>
              <a href={treatment.guide} aria-label={`Explore ${treatment.name} treatments and prices`}>
                Explore treatment <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="signatureMenuLink"><p>Facials, body care, brows, lashes, nails and waxing.</p><a href="/treatments">Explore the complete treatment menu <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
