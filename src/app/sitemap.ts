import type { MetadataRoute } from "next";
import { treatmentCategories } from "@/data/treatment-categories";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/treatments", "/about", "/contact", ...treatmentCategories.map(item => `/treatments/${item.slug}`)].map(path => ({ url: `${siteUrl}${path}` }));
}
