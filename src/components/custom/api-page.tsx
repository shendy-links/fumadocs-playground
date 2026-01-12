import { createAPIPage } from "fumadocs-openapi/ui";
// import { mediaAdapters } from "@/lib/media-adapters";
import { apiSource } from "@/lib/openapi";
import client from "./api-page.client";

const options = {
  client,
  // mediaAdapters,
  shikiOptions: {
    themes: {
      dark: "vesper",
      light: "vitesse-light",
    },
  },
};

export const MCPStoreAPIPage = createAPIPage(apiSource.example, options);

export const SDKStoreAPIPage = createAPIPage(apiSource.sdk, options);
