import MotionWords from "./MotionWords";
import type { CSSProperties } from "react";

const bookingNumber = "254743364717";

const treatments = [
  {
    number: "01",
    name: "Skin Analysis",
    category: "Skin · Consultation",
    copy: "Understand your skin and discuss a suitable treatment and home care routine.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/ba27b39b-94dd-4880-8354-a8cbdf91c8e7.png",
    className: "signatureCardLarge",
  },
  {
    number: "02",
    name: "Signature Facials",
    category: "Skin · Glow",
    copy: "Facial care selected around your skin’s hydration, texture and appearance.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/41f0a9e7-41c5-404b-b56b-a8f5face4e65.jpg",
    className: "signatureCardTall",
  },
  {
    number: "03",
    name: "Moroccan Body Scrub",
    category: "Body · Renewal",
    copy: "An exfoliating body scrub for a softer, smoother skin finish.",
    image:
      "https://d2ol7oe51mr4n9.cloudfront.net/user_3HueTg25CuFruN86S3y4yyskQlZ/d09aadd5-d46f-418a-b64f-3792232ff1d6.jpg",
    className: "signatureCardWide",
  },
  {
    number: "04",
    name: "Microblading",
    category: "Brows · Definition",
    copy: "Brow shape and definition planned around your features and preferred look.",
    image:
      "/images/brow-detail.webp",
    className: "signatureCardPortrait",
  },
];

const moreTreatments = [
  { name: "Lymphatic Massage", note: "A gentle pause for your body.", copy: "Discuss your preferences with our team before choosing your massage session." },
  { name: "Eyelash Extensions", note: "Soft volume. Your preferred finish.", copy: "Choose a lash look with guidance on shape, upkeep and appointment preparation." },
  { name: "Nail Care", note: "The details, beautifully finished.", copy: "From everyday grooming to a polished finish, ask our team about available nail services." },
  { name: "Sauna / Steam", note: "Warmth and a moment to unwind.", copy: "Ask about available sauna and steam sessions and how to prepare for your visit." },
  { name: "Waxing", note: "Smooth skin, considered preparation.", copy: "Tell us the area you would like treated. We’ll help you plan your appointment and aftercare." },
  { name: "Skin Tag Removal", note: "Begin with a consultation.", copy: "Speak with our team about assessment, suitability and what to expect before arranging treatment." },
  { name: "Skin Care Products", note: "Continue your routine at home.", copy: "Ask about available products and guidance for your skin care routine. Our team can confirm stock and prices." },
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
          <a href="#all-treatments">Discover more services <span aria-hidden="true">↗</span></a>
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
              <h3>{treatment.name}</h3>
              <p>{treatment.copy}</p>
              <a
                href={bookingHref(treatment.name)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book this treatment <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="signatureMore" id="all-treatments" data-reveal="more">
        <div className="signatureMoreIntro">
          <p className="signatureKicker">Beyond the signature</p>
          <h2 aria-label="Complete your ritual."><MotionWords>Complete</MotionWords><br /><em><MotionWords>your ritual.</MotionWords></em></h2>
          <p className="signatureMoreCopy">Explore the finishing touches and quieter moments that make your visit your own.</p>
          <span className="signatureMoreHint">Select a service to find out more</span>
        </div>
        <div className="signatureMoreList">
          {moreTreatments.map((item, index) => (
            <details className="serviceDetail" name="ginamu-services" key={item.name}>
              <summary>
                <span className="serviceNumber">{String(index + 5).padStart(2, "0")}</span>
                <span className="serviceHeading"><strong>{item.name}</strong><span>{item.note}</span></span>
                <span className="serviceToggle" aria-hidden="true" />
              </summary>
              <div className="serviceExpanded">
                <p>{item.copy}</p>
                <a href={bookingHref(item.name)} target="_blank" rel="noopener noreferrer">{item.name === "Skin Care Products" ? "Ask about products" : `Book ${item.name}`}</a>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
