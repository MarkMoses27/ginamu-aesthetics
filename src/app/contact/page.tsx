import { pageMetadata } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import Footer, { Icon } from "@/components/Footer";
import MotionWords from "@/components/MotionWords";
import ContactBooking from "@/components/ContactBooking";
import ContactMotion from "@/components/ContactMotion";

export const metadata = pageMetadata("Contact & Booking | Ginamu Aesthetics", "Plan your visit to Ginamu Aesthetics at Bricks Court, Mpaka Road, Westlands, Nairobi. Call, email or enquire about a treatment on WhatsApp.", "/contact");
const directions = "https://www.google.com/maps/search/?api=1&query=Bricks+Court+Mpaka+Road+Westlands+Nairobi";

export default function ContactPage() {
  return <><SiteHeader solid /><main className="contactPage" id="main-content"><span id="top" aria-hidden="true" />
    <section className="contactPageHero" aria-labelledby="contact-page-title">
      <div><p className="contactEyebrow">Contact Ginamu</p><h1 id="contact-page-title" aria-label="Your next ritual starts here."><MotionWords>Your next ritual</MotionWords><br /><em><MotionWords>starts here.</MotionWords></em></h1></div>
      <div className="contactHeroAside"><p>Have a treatment in mind?<br />Let’s make time for you.</p><a className="contactTextLink" href="#booking">Plan your visit <span aria-hidden="true">↓</span></a></div>
    </section>
    <section className="contactBookingSection" id="booking" aria-labelledby="booking-title" data-contact-reveal>
      <div className="contactDetails"><p className="contactEyebrow">Let’s connect</p><h2 id="booking-title" aria-label="A conversation away."><MotionWords>A conversation</MotionWords>{" "}<em><MotionWords>away.</MotionWords></em></h2><p className="contactIntro">Choose how you’d like to reach us. Our team can help with treatment questions and appointment availability.</p>
        <div className="contactChannelList">
          <a href="https://wa.me/254743364717" target="_blank" rel="noopener noreferrer"><span className="contactChannelIcon"><Icon name="whatsapp" /></span><span><small>WhatsApp</small><strong>Chat with our team</strong></span><span className="contactChannelArrow" aria-hidden="true">↗</span></a>
          <a href="tel:+254743364717"><span className="contactChannelIcon"><Icon name="phone" /></span><span><small>Call us</small><strong>0743 364 717</strong></span><span className="contactChannelArrow" aria-hidden="true">↗</span></a>
          <a href="mailto:ginamuaestheticspa@gmail.com"><span className="contactChannelIcon"><Icon name="mail" /></span><span><small>Email</small><strong className="contactEmail">ginamuaestheticspa<wbr />@gmail.com</strong></span><span className="contactChannelArrow" aria-hidden="true">↗</span></a>
        </div>
      </div>
      <ContactBooking />
    </section>
    <section className="contactVisitSection" aria-labelledby="contact-visit-title" data-contact-reveal>
      <div className="contactVisitCopy"><p className="contactEyebrow">Find us in Westlands</p><h2 id="contact-visit-title" aria-label="We’ll see you at Ginamu."><MotionWords>We’ll see you</MotionWords><br /><em><MotionWords>at Ginamu.</MotionWords></em></h2>
        <div className="contactVisitInfo"><div><Icon name="pin" /><div><h3>Visit us</h3><address>Bricks Court, 2nd Floor<br />Mpaka Road, Westlands<br />Nairobi, Kenya</address></div></div><div><Icon name="clock" /><div><h3>Opening hours</h3><p>Monday–Saturday<br /><strong>7:30 AM–6:30 PM</strong></p><p className="contactClosed">Sunday closed</p></div></div></div>
        <a className="contactTextLink" href={directions} target="_blank" rel="noopener noreferrer">Get directions on Google Maps <span aria-hidden="true">↗</span></a>
      </div>
      <div className="contactMap"><iframe title="Map showing Bricks Court on Mpaka Road, Westlands, Nairobi" src="https://maps.google.com/maps?q=Bricks%20Court%20Mpaka%20Road%20Westlands%20Nairobi&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href={directions} target="_blank" rel="noopener noreferrer">Bricks Court · Mpaka Road <span aria-hidden="true">↗</span></a></div>
    </section>
    <section className="contactMenuPrompt"><p>Still choosing your ritual?</p><a className="contactTextLink" href="/treatments">Explore treatments &amp; prices <span aria-hidden="true">↗</span></a></section>
  </main><Footer showContactStrip={false} /><ContactMotion /></>;
}
