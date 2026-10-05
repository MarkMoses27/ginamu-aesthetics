import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

export default function NotFound() {
  return <><SiteHeader solid /><main id="main-content" className="notFoundPage"><span id="top" aria-hidden="true" /><p className="serviceEyebrow">Ginamu Aesthetics · 404</p><h1>Let’s find your<br /><em>way back.</em></h1><p>This page isn’t available. Explore our treatments or contact the team to plan your visit.</p><div className="notFoundActions"><a className="serviceButton" href="/treatments">Treatments &amp; prices <span aria-hidden="true">↗</span></a><a className="serviceTextLink" href="/">Return home <span aria-hidden="true">→</span></a></div><a className="notFoundContact" href="/contact">Need a little guidance? Contact Ginamu.</a></main><Footer /></>;
}
