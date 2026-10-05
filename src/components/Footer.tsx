type IconName = "instagram" | "facebook" | "tiktok" | "pin" | "phone" | "clock" | "arrow" | "mail" | "whatsapp";

export function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    whatsapp: <><path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.5L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.2Z" /><path d="m8.2 7.5 1.6 2.4-1 1.4a8 8 0 0 0 3.9 3.9l1.4-1 2.4 1.6c-.5 1.8-2 2-3.4 1.4a12 12 0 0 1-6.3-6.3c-.6-1.4-.4-2.9 1.4-3.4Z" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1.2.5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8" />,
    tiktok: <path d="M14 3v12a4 4 0 1 1-4-4M14 3c.4 4 2.6 6 6 6" />,
    pin: <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <path d="m6 3 3 4-2 3c2 4 3 5 7 7l3-2 4 3c0 3-2 4-4 3C9 19 5 15 3 7c-1-2 0-4 3-4Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export default function Footer({ showContactStrip = true }: { showContactStrip?: boolean }) {
  return (
    <footer className="ginamuFooter premiumFooter">
      {showContactStrip && <div className="footerContactStrip" aria-label="Ginamu contact information">
        <a className="footerContactItem" href="https://www.google.com/maps/search/?api=1&query=Bricks+Court+Mpaka+Road+Westlands+Nairobi" target="_blank" rel="noopener noreferrer">
          <span className="footerContactIcon"><Icon name="pin" /></span>
          <div><h3>Location</h3><p>Bricks Court, 2nd Floor<br />Mpaka Road, Westlands<br />Nairobi, Kenya</p></div>
        </a>
        <div className="footerContactItem">
          <span className="footerContactIcon"><Icon name="clock" /></span>
          <div><h3>Opening hours</h3><p>Mon–Sat, 7:30 AM–6:30 PM<br /><span>Sunday closed</span></p></div>
        </div>
        <a className="footerContactItem" href="tel:+254743364717">
          <span className="footerContactIcon"><Icon name="phone" /></span>
          <div><h3>Call us</h3><p>0743 364 717</p></div>
        </a>
        <a className="footerContactItem" href="mailto:ginamuaestheticspa@gmail.com">
          <span className="footerContactIcon"><Icon name="mail" /></span>
          <div><h3>Email</h3><p className="footerContactEmail">ginamuaestheticspa<wbr />@gmail.com</p></div>
        </a>
      </div>}
      <div className="footerInner">
        <div className="footerGrid">
          <div className="footerIdentity">
            <a href="/#top" aria-label="Ginamu Aesthetics home"><img className="footerLogo" src="/ginamu-logo.png" alt="Ginamu Aesthetics" width="180" height="180" /></a>
            <p className="footerMotto">A Ritual of Beauty<br />&amp; Wellbeing.</p>
          </div>
          <div className="footerColumn">
            <h3>Explore Ginamu</h3>
            <nav aria-label="Footer navigation"><a href="/treatments">Treatments &amp; prices</a><a href="/about">About Ginamu</a><a href="/contact">Contact &amp; booking</a></nav>
            <a className="footerBackTop" href="#top">Back to top ↑</a>
          </div>
          <div className="footerColumn footerConnect">
            <h3>Stay connected</h3>
            <p className="footerHandle">@ginamuaesthetics</p>
            <div className="footerSocials" aria-label="Ginamu social profiles">
              <a href="https://www.instagram.com/ginamuaesthetics/" target="_blank" rel="noopener noreferrer" aria-label="Ginamu on Instagram"><Icon name="instagram" /></a>
              <a href="https://www.facebook.com/ginamuaesthetics/" target="_blank" rel="noopener noreferrer" aria-label="Ginamu on Facebook"><Icon name="facebook" /></a>
              <a href="https://www.tiktok.com/@ginamuaesthetics" target="_blank" rel="noopener noreferrer" aria-label="Ginamu on TikTok"><Icon name="tiktok" /></a>
            </div>
            <a className="footerBooking" href="https://wa.me/254743364717" target="_blank" rel="noopener noreferrer">Book an appointment <Icon name="arrow" /></a>
          </div>
        </div>
      <div className="footerBase"><small>© {new Date().getFullYear()} Ginamu Aesthetics. All rights reserved.</small><a href="https://m3techs.co.ke" target="_blank" rel="noopener noreferrer">Website by <span>M3Techs</span> ↗</a></div>
      </div>
    </footer>
  );
}
