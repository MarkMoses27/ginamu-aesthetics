/**
 * Sanity schema for Ginamu treatments.
 * Register this document type when initializing the Sanity Studio project.
 * The slug MUST match the existing stable id (e.g. skin-express).
 */
export default {
  name: "ginamuTreatment",
  title: "Ginamu Treatments & Prices",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Treatment name",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Stable treatment ID",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      description: "Use the same ID as the existing approved treatment list so CMS updates replace the correct service.",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Facials & Skin", value: "skin" },
          { title: "Massage, Steam & Sauna", value: "body" },
          { title: "Lashes & Brows", value: "brows" },
          { title: "Nails", value: "nails" },
          { title: "Waxing", value: "waxing" },
        ],
      },
    },
    {
      name: "price",
      title: "Display price",
      type: "string",
      description: "Examples: KSh 4,500, From KSh 3,000, KSh 10,000 for two.",
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      description: "Optional: 30 min, 45 min, 60 min, 90 min.",
    },
    {
      name: "active",
      title: "Published / available",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide a treatment. Keep the document published to apply this setting.",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
};
