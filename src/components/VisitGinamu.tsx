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
            <p>Your skin, your features, your pace. At Ginamu Aesthetics, every visit begins with a conversation about what you need and the result you have in mind.</p>
            <p>Explore skin care, body treatments and beauty services in Westlands, with guidance to help you choose where to begin.</p>
            <a className="aboutLink" href={bookingUrl} target="_blank" rel="noopener noreferrer">Talk to us about your visit</a>
          </div>
        </div>
        <div className="aboutPrinciples">
          <div><span>01</span><h3>Start with a consultation</h3><p>Tell us what you would like to address before choosing your treatment.</p></div>
          <div><span>02</span><h3>Care for the whole you</h3><p>Skin, body, brows, lashes and nails, brought together in one destination.</p></div>
          <div><span>03</span><h3>Keep the conversation going</h3><p>Ask about preparation, your appointment and suitable home care.</p></div>
        </div>
      </section>
      <section className="ginamuContact" id="contact" aria-labelledby="contact-title">
        <div className="contactInvitation">
          <p className="sectionLabel">Visit Ginamu · Westlands, Nairobi</p>
          <h2 id="contact-title">Make a little<br /><em>time for yourself.</em></h2>
          <p>Choose a treatment or let us help you find your starting point. Message us for availability and appointment details.</p>
          <a className="contactBook" href={bookingUrl} target="_blank" rel="noopener noreferrer">Book on WhatsApp</a>
        </div>
        <div className="contactDetails">
          <div><h3>Find us</h3><p>Bricks Court, 2nd Floor<br />Mpaka Road, Westlands<br />Nairobi, Kenya</p><a href="https://www.google.com/maps/search/?api=1&query=Bricks+Court+Mpaka+Road+Westlands+Nairobi" target="_blank" rel="noopener noreferrer">View location on Google Maps</a></div>
          <div><h3>Get in touch</h3><a href="tel:+254743364717">0743 364 717</a><a href="mailto:ginamuaestheticspa@gmail.com">ginamuaestheticspa@gmail.com</a></div>
          <div><h3>Opening hours</h3><p>Monday–Saturday: 7:30 AM–6:30 PM<br />Sunday: Closed</p></div>
          <div><h3>Follow Ginamu</h3><a href="https://www.instagram.com/ginamuaesthetics/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.facebook.com/ginamuaesthetics/" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.tiktok.com/@ginamuaesthetics" target="_blank" rel="noopener noreferrer">TikTok</a></div>
          <div><h3>Before you visit</h3><p>Contact us to confirm your preferred treatment, appointment time and price.</p></div>
        </div>
      </section>
      <Footer />
    </>
  );
}
