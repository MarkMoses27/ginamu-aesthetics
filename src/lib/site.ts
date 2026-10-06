import type { Metadata } from "next";
export const siteUrl = "https://ginamuaesthetics.co.ke";
export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path, siteName: "Ginamu Aesthetics", locale: "en_KE", type: "website",
      images: [{ url: "/images/brow-detail.webp", width: 1800, height: 1013, alt: "Ginamu Aesthetics — A Ritual of Beauty & Wellbeing" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/brow-detail.webp"] },
  };
}
