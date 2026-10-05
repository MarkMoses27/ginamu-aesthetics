type IconName = "instagram" | "facebook" | "tiktok" | "pin" | "phone" | "clock" | "arrow" | "mail";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
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

export default function Footer() {
  return (
    <footer className="ginamuFooter premiumFooter">
      <div className="footerGrid">
        <div className="footerIdentity">
          <a href="#top" aria-label="Ginamu Aesthetics home"><img className="footerLogo" src="/ginamu-logo.png" alt="Ginamu Aesthetics" width="180" height="180" /></a>
          <p className="footerMotto">A Ritual of Beauty<br />&amp; Wellbeing.</p>
          <div className="footerSocials" aria-label="Ginamu social profiles">
            <a href="https://www.instagram.com/ginamuaesthetics/" target="_blank" rel="noopener noreferrer" aria-label="Ginamu on Instagram"><Icon name="instagram" /></a>
            <a href="https://www.facebook.com/ginamuaesthetics/" target="_blank" rel="noopener noreferrer" aria-label="Ginamu on Facebook"><Icon name="facebook" /></a>
            <a href="https://www.tiktok.com/@ginamuaesthetics" target="_blank" rel="noopener noreferrer" aria-label="Ginamu on TikTok"><Icon name="tiktok" /></a>
          </div>
        </div>
        <div className="footerColumn">
          <h3>Explore Ginamu</h3>
          <nav aria-label="Footer navigation"><a href="#services">Our treatments</a><a href="#about">The Ginamu approach</a><a href="#contact">Visit us</a></nav>
          <a className="footerBooking" href="https://wa.me/254743364717" target="_blank" rel="noopener noreferrer">Book an appointment <Icon name="arrow" /></a>
        </div>
        <div className="footerColumn">
          <h3>Visit Ginamu</h3>
          <a className="footerDetail" href="https://www.google.com/maps/search/?api=1&query=Bricks+Court+Mpaka+Road+Westlands+Nairobi" target="_blank" rel="noopener noreferrer"><Icon name="pin" /><span>Bricks Court, 2nd Floor<br />Mpaka Road, Westlands<br />Nairobi, Kenya</span></a>
          <a className="footerDetail" href="tel:+254743364717"><Icon name="phone" /><span>0743 364 717</span></a>
          <a className="footerDetail" href="mailto:ginamuaestheticspa@gmail.com"><Icon name="mail" /><span style={{ minWidth: 0, overflowWrap: "anywhere" }}>ginamuaestheticspa<wbr />@gmail.com</span></a>
        </div>
        <div className="footerColumn">
          <h3>Opening hours</h3>
          <div className="footerDetail"><Icon name="clock" /><div><p>Monday–Saturday<br /><strong>7:30 AM–6:30 PM</strong></p><p>Sunday<br /><span className="footerClosed">Closed</span></p></div></div>
          <a className="footerBackTop" href="#top">Back to top ↑</a>
        </div>
      </div>
      <div className="footerBase"><small>© {new Date().getFullYear()} Ginamu Aesthetics. All rights reserved.</small><a className="footerPhotoCredit" href="https://www.freepik.com" target="_blank" rel="noopener noreferrer">Selected photography by Freepik</a><a href="https://m3techs.co.ke" target="_blank" rel="noopener noreferrer">Website by <span>M3Techs</span> ↗</a></div>
    </footer>
  );
}
