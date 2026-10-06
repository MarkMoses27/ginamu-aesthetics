import { pageMetadata, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata = {
  ...pageMetadata("Ginamu Aesthetics | Beauty & Wellbeing in Westlands", "Ginamu Aesthetics — a ritual of beauty & wellbeing at Bricks Court, Mpaka Road, Westlands, Nairobi."),
  metadataBase: new URL(siteUrl),
  icons: {
    icon: { url: "/ginamu-logo.png", type: "image/png" },
    shortcut: "/ginamu-logo.png",
    apple: "/ginamu-logo.png",
  },
};
const business = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ginamu Aesthetics",
  url: siteUrl,
  logo: `${siteUrl}/ginamu-logo.png`,
  telephone: "+254741174816",
  email: "ginamuaestheticspa@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bricks Court, 2nd Floor, Mpaka Road",
    addressLocality: "Westlands, Nairobi",
    addressCountry: "KE",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "07:30", closes: "18:30",
  }],
  sameAs: ["https://www.instagram.com/ginamuaesthetics/", "https://www.facebook.com/ginamuaesthetics/", "https://www.tiktok.com/@ginamuaesthetics"],
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skipLink" href="#main-content">Skip to content</a>
    {children}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business).replace(/</g, "\\u003c") }} />
  </body></html>;
}
