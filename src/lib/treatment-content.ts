import localTreatments from "@/data/treatments.json";

export type Treatment = {
  id: string;
  name: string;
  price: string;
  category: "skin" | "body" | "brows" | "nails" | "waxing";
  duration: string | null;
};

type CmsTreatment = Partial<Treatment> & { active?: boolean };

const categories = new Set(["skin", "body", "brows", "nails", "waxing"]);
const fallback = localTreatments as Treatment[];

/**
 * Single read point for the public treatment menus. Until a Sanity project is
 * connected, the existing, approved local price list remains authoritative.
 * Once configured, Sanity entries update the same IDs and may add/remove items.
 */
export async function getTreatments(): Promise<Treatment[]> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId || !/^[a-z0-9-]+$/.test(projectId) || !/^[a-zA-Z0-9_-]+$/.test(dataset)) {
    return fallback;
  }

  const query = '*[_type == "ginamuTreatment"]{ "id": slug.current, name, price, category, duration, active }';
  const url = `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) return fallback;
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("result" in data)) return fallback;
    const entries = (data as { result: unknown }).result;
    if (!Array.isArray(entries)) return fallback;

    const merged = new Map(fallback.map((item) => [item.id, item]));
    for (const entry of entries as CmsTreatment[]) {
      if (!entry || typeof entry.id !== "string" || !entry.id.trim()) continue;
      if (entry.active === false) {
        merged.delete(entry.id);
        continue;
      }
      if (
        typeof entry.name !== "string" || !entry.name.trim() ||
        typeof entry.price !== "string" || !entry.price.trim() ||
        typeof entry.category !== "string" || !categories.has(entry.category)
      ) continue;

      merged.set(entry.id, {
        id: entry.id,
        name: entry.name.trim(),
        price: entry.price.trim(),
        category: entry.category,
        duration: typeof entry.duration === "string" && entry.duration.trim()
          ? entry.duration.trim()
          : null,
      } as Treatment);
    }
    return Array.from(merged.values());
  } catch {
    // A CMS outage must never remove the public treatment menu.
    return fallback;
  }
}
