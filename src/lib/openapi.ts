import { createOpenAPI } from "fumadocs-openapi/server";
import path from "path";

const pokeStore = createOpenAPI({
  // input: ["https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml"],
  input: ["https://dev-backend.thelinks.ai/api/v1/openapi"],
});

const exampleStore = createOpenAPI({
  input: [path.resolve(process.cwd(), "api/example.yaml")],
});

export const apiSource = {
  sdk: pokeStore,
  example: exampleStore,
};
