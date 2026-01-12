import { createOpenAPI } from "fumadocs-openapi/server";
import path from "path";

const exampleStore = createOpenAPI({
  // input: ["https://dev-backend.thelinks.ai/api/v1/openapi"],
  input: ["https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml"],
  // input: [path.resolve(process.cwd(), "api/stripe-openapi.yaml")],
});

export const apiSource = {
  example: exampleStore,
};
