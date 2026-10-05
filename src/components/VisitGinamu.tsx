import Footer from "./Footer";

const bookingUrl = "https://wa.me/254743364717?text=Hi%20Ginamu%20Aesthetics%2C%20I%27d%20like%20to%20book%20a%20consultation.";

export default function VisitGinamu() {
  return (
    <>
      <section className="ginamuAbout" id="about" aria-labelledby="about-title">
        <p className="sectionLabel">The Ginamu approach</p>
        <div className="aboutLayout">
          <h2 id="about-title">Beauty begins<br />with <em>being understood.</em></h2>
          <div className="aboutCopy">
            <p>A Ritual of Beauty &amp; Wellbeing. Ginamu brings skin care, body treatments and beauty services together at Bricks Court in Westlands.</p>
            <p>Come for one treatment or make time for a longer visit. Speak with our team to plan the services you would like to enjoy.</p>
            <a className="aboutLink" href={bookingUrl} target="_blank" rel="noopener noreferrer">Talk to us about your visit</a>
          </div>
        </div>
        <div className="aboutPrinciples">
          <div><span>01</span><h3>Before your visit</h3><p>Ask about preparation and share any questions when booking.</p></div>
          <div><span>02</span><h3>During your appointment</h3><p>Discuss your preferences and the finish you have in mind with your therapist.</p></div>
          <div><span>03</span><h3>After your treatment</h3><p>Ask about aftercare and products to support your home routine.</p></div>
        </div>
      </section>
      <section className="ginamuContact" id="contact" aria-labelledby="contact-title">
        <div className="contactInvitation">
          <p className="sectionLabel">Your next ritual</p>
          <h2 id="contact-title">Make a little<br /><em>time for yourself.</em></h2>
        </div>
        <div className="contactAction">
          <p>Choose your treatment, or let us guide you. Message us to arrange your visit.</p>
          <a className="contactBook" href={bookingUrl} target="_blank" rel="noopener noreferrer">Book on WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <Footer />
    </>
  );
}
