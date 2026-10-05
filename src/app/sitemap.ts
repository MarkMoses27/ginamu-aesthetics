import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/treatments", "/about", "/contact"].map(path => ({ url: `${siteUrl}${path}` }));
}
