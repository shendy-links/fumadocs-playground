// lib/api-docs-mapping.ts
import { ErrorCode, ObjectProperty } from "./types";

type OperationRef = {
  method: string;
  path: string;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiDocsMapping = {
  /* ---------------------------------------------
   * Core resolvers
   * --------------------------------------------- */

  getOperation(api: any, opRef: OperationRef) {
    const operation = api.paths?.[opRef.path]?.[opRef.method];
    if (!operation) return null;

    return {
      method: opRef.method.toUpperCase() as HttpMethod,
      path: opRef.path,
      summary: operation.summary ?? "",
      description: operation.description ?? "",
      operationId: operation.operationId,
      parameters: operation.parameters ?? [],
      requestBody: operation.requestBody,
      responses: operation.responses ?? {},
      tags: operation.tags ?? [],
    };
  },

  getOperationsForPage(api: any, pageProps: any) {
    return pageProps.operations
      .map((op: OperationRef) => apiDocsMapping.getOperation(api, op))
      .filter(Boolean);
  },

  /* ---------------------------------------------
   * Headline
   * --------------------------------------------- */

  getHeadline(api: any, pageProps: any) {
    const operations = apiDocsMapping.getOperationsForPage(api, pageProps);
    return {
      title: api.info?.title ?? "API Reference",
      version: api.info?.version,
      description: api.info?.description ?? "",
      endpoints: operations.map((op: any) => ({
        method: op.method,
        path: op.path,
        url: `#${op.operationId ?? op.path.replace(/\W+/g, "-")}`,
      })),
    };
  },

  /* ---------------------------------------------
   * Parameters
   * --------------------------------------------- */

  adaptParameters(params: any[] = []): ObjectProperty[] {
    return params.map((param) => ({
      name: param.name,
      type: param.schema?.type ?? "any",
      required: Boolean(param.required),
      description: param.description ?? "",
      location: param.in,
    }));
  },

  /* ---------------------------------------------
   * Schema
   * --------------------------------------------- */

  adaptSchema(schema: any, name = ""): ObjectProperty[] {
    if (!schema) return [];

    // Handle top-level array
    if (schema.type === "array" && schema.items) {
      return [
        {
          name: name,
          type: "array",
          description: schema.description ?? "",
          child: this.adaptSchema(schema.items),
        },
      ];
    }

    // Handle object without properties
    if (
      schema.type === "object" &&
      !schema.properties &&
      schema.additionalProperties
    ) {
      return [
        {
          name: name || "object",
          type: "object",
          description: schema.description ?? "",
          child: this.adaptSchema(schema.additionalProperties),
        },
      ];
    }

    // No properties → nothing to render
    if (!schema.properties) return [];

    return Object.entries(schema.properties).map(([propName, prop]: any) => {
      const objectProp: ObjectProperty = {
        name: propName,
        type: prop.type ?? (prop.properties ? "object" : "any"),
        description: prop.description ?? "",
        required: false,
        default: prop.default,
        example: prop.example,
        child: this.adaptSchema(prop),
      };

      // Handle enum
      if (prop.enum) {
        objectProp.type = "enum";
        objectProp.enum = prop.enum.map((v: any) => ({ value: v }));
      }

      // Handle oneOf as enum
      if (prop.oneOf) {
        objectProp.type = "enum";
        objectProp.enum = prop.oneOf.map((item: any) => ({
          value: item.const ?? item.default ?? "unknown",
          description: item.description,
        }));
      }

      // Handle array items
      if (prop.type === "array" && prop.items) {
        objectProp.type = "array";
        objectProp.child = this.adaptSchema(prop.items);
      }

      return objectProp;
    });
  },

  getSuccessSchema(operation: any) {
    return (
      operation.responses?.["200"]?.content?.["application/json"]?.schema ??
      null
    );
  },

  /* ---------------------------------------------
   * Examples
   * --------------------------------------------- */

  buildResponseExample(schema: any): any {
    if (!schema?.properties) return {};

    const example: Record<string, any> = {};

    for (const [key, prop] of Object.entries<any>(schema.properties)) {
      if (prop.example !== undefined) {
        example[key] = prop.example;
      } else if (prop.type === "object") {
        example[key] = apiDocsMapping.buildResponseExample(prop);
      } else {
        example[key] = prop.type;
      }
    }

    return example;
  },

  buildCodeExamples(operation: any) {
    return [
      {
        language: "curl",
        code: `curl -X ${operation.method} "${operation.path}"`,
      },
    ];
  },

  /* ---------------------------------------------
   * Errors
   * --------------------------------------------- */

  adaptErrorCodes(responses: any = {}) {
    return Object.entries(responses)
      .filter(([code]) => code.startsWith("4") || code.startsWith("5"))
      .map(([code, res]: any) => ({
        code,
        description: res.description ?? "Error",
      }));
  },
};
