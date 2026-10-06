import { pageMetadata } from "@/lib/site";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import MotionWords from "@/components/MotionWords";
import AboutMotion from "@/components/AboutMotion";

export const metadata = pageMetadata("About Us | Ginamu Aesthetics", "Discover Ginamu Aesthetics in Westlands, Nairobi. Our approach to skin care, beauty and wellbeing, and what to expect when planning your visit.", "/about");

const bookingUrl = "https://wa.me/254743364717?text=Hi%20Ginamu%20Aesthetics%2C%20I%27d%20like%20to%20plan%20my%20first%20visit.";
const principles = [
  { title: "Your preferences, first.", copy: "A facial, a fresh set of nails or time for body care — begin with what matters to you. Share your goals and ask our team which options to consider." },
  { title: "Clarity before you book.", copy: "Browse our treatment menu and prices, then message us about availability, preparation and any questions you have. Plan your appointment with the details in hand." },
  { title: "Care beyond the appointment.", copy: "Ask about aftercare and products for your home routine. Your visit is also a chance to understand how to look after your skin, nails or brows between appointments." },
];

export default function AboutPage() {
  return <>
    <SiteHeader solid />
    <main className="aboutPage" id="main-content"><span id="top" aria-hidden="true" />
      <section className="aboutPageHero" aria-labelledby="about-page-title">
        <Image className="aboutHeroImage" src="/images/beauty-blossom.jpg" alt="Woman holding a pink blossom beside her face" style={{ objectPosition: "center 40%" }} fill priority sizes="100vw" />
        <div className="aboutHeroShade" aria-hidden="true" />
        <div className="aboutHeroContent">
          <p className="aboutEyebrow">About Ginamu · Westlands, Nairobi</p>
          <h1 id="about-page-title" aria-label="A Ritual of Beauty & Wellbeing."><MotionWords>A Ritual of Beauty</MotionWords><br /><em><MotionWords>& Wellbeing.</MotionWords></em></h1>
          <p>Skin care. Body care. The finishing touches.<br />A little time, entirely for you.</p>
          <a className="aboutHeroExplore" href="#our-approach">Discover Ginamu <span aria-hidden="true">↓</span></a>
        </div>
        <span className="aboutHeroCaption">Ginamu Aesthetics</span>
      </section>

      <section className="aboutStory aboutPageSection" id="our-approach" aria-labelledby="our-approach-title" data-about-reveal>
        <p className="aboutEyebrow">01 / A little about us</p>
        <div className="aboutStoryGrid">
          <h2 id="our-approach-title" aria-label="Beauty is personal. So is your ritual."><MotionWords>Beauty is personal.</MotionWords><br /><em><MotionWords>So is your ritual.</MotionWords></em></h2>
          <div className="aboutStoryCopy">
            <p className="aboutLead">Ginamu Aesthetics brings beauty and wellbeing together in Westlands, Nairobi.</p>
            <p>From facials and skin analysis to body treatments, brows, lashes, nails and waxing, our menu gives you room to choose the care that fits your day.</p>
            <p>Visit us at Bricks Court on Mpaka Road. Come with a treatment in mind, or start a conversation with our team and plan your visit together.</p>
            <a className="aboutTextLink" href="/treatments">Explore treatments &amp; prices <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="aboutValues aboutPageSection" aria-labelledby="about-values-title" data-about-reveal>
        <div className="aboutSectionHeading"><p className="aboutEyebrow">02 / Our approach</p><h2 id="about-values-title" aria-label="Thoughtful care, from the first conversation."><MotionWords>Thoughtful care,</MotionWords><br /><em><MotionWords>from the first conversation.</MotionWords></em></h2></div>
        <div className="aboutValueGrid">{principles.map((item, index) => <article key={item.title} className="aboutValue"><span className="aboutValueNumber">0{index + 1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div>
      </section>

      <section className="aboutJourney aboutPageSection" aria-labelledby="about-journey-title" data-about-reveal>
        <div className="aboutJourneyVisual"><Image src="/images/gua-sha-care.jpg" alt="Woman using a green gua sha stone during her skin care routine" fill sizes="(max-width: 760px) 100vw, 45vw" /><span>Care in the details.</span></div>
        <div className="aboutJourneyCopy"><p className="aboutEyebrow">03 / Your first visit</p><h2 id="about-journey-title" aria-label="Make it your own."><MotionWords>Make it</MotionWords>{" "}<em><MotionWords>your own.</MotionWords></em></h2>
          <ol className="aboutJourneySteps">
            <li><span>01</span><div><h3>Choose your ritual</h3><p>Explore the menu, or tell us what you would like help with.</p></div></li>
            <li><span>02</span><div><h3>Plan the details</h3><p>Message us to confirm availability, your treatment and any preparation before visiting.</p></div></li>
            <li><span>03</span><div><h3>Visit Ginamu</h3><p>Find us on the 2nd floor of Bricks Court, Mpaka Road, Westlands. Share your preferences when you arrive.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="aboutInvitation aboutPageSection" aria-labelledby="about-invitation-title" data-about-reveal><p className="aboutEyebrow">Your next ritual</p><h2 id="about-invitation-title" aria-label="We’d love to welcome you."><MotionWords>We’d love to</MotionWords>{" "}<em><MotionWords>welcome you.</MotionWords></em></h2><p>Tell us what you have in mind. Let’s plan a visit that feels like you.</p><a className="aboutBookButton" href={bookingUrl} target="_blank" rel="noopener noreferrer">Plan your visit on WhatsApp <span aria-hidden="true">↗</span></a></section>
    </main>
    <Footer />
    <AboutMotion />
  </>;
}
