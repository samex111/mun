import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "smj-mun-studio",
  title: "SMJ MUN — Content Studio",
  projectId,
   basePath: "/studio",
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Homepage — singleton
            S.listItem()
              .title("Homepage")
              .id("homepage")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
                  .title("Homepage")
              ),
            S.divider(),
            // Conferences
            S.documentTypeListItem("conference").title("Conferences"),
            // Blog
            S.documentTypeListItem("blog").title("Blog Posts"),
            S.divider(),
            // Gallery
            S.documentTypeListItem("gallery").title("Gallery"),
            // Testimonials
            S.documentTypeListItem("testimonial").title("Testimonials"),
            // Media / Press
            S.documentTypeListItem("media").title("Media & Press"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
