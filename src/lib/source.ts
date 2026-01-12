import { docs } from "fumadocs-mdx:collections/server";
import { loader, multiple } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { openapiPlugin, openapiSource } from "fumadocs-openapi/server";
import { apiSource } from "./openapi";

export const source = loader(
  multiple({
    docs: docs.toFumadocsSource(),
    "api-references": await openapiSource(apiSource.example, {
      baseDir: "/sdk/api-references",
    }),
  }),
  {
    baseUrl: "docs",
    plugins: [lucideIconsPlugin(), openapiPlugin()],
  }
);
