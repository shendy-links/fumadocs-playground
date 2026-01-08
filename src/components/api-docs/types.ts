export type PropertyType =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "array"
  | "object"
  | "enum"
  | "date"
  | "datetime";

export interface PropertyOption {
  value: string | number;
  description?: string;
}

export interface ObjectProperty {
  name: string;
  type: PropertyType;
  description: string;
  required?: boolean;
  default?: string | number | boolean;
  enum?: PropertyOption[];
  items?: ObjectProperty[];
  example?: any;
  child?: ObjectProperty[];
}

export interface APISchema {
  title: string;
  description?: string;
  properties: ObjectProperty[];
  example?: Record<string, any>;
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface CodeExample {
  language: string;
  code: string;
}

export interface RequestConfig {
  method: HTTPMethod;
  endpoint: string;
  examples?: CodeExample[];
}

export interface ResponseConfig {
  example: Record<string, any>;
  schema?: APISchema;
}

export interface ErrorCode {
  code: string;
  description: string;
  details?: string;
}

export interface APIEndpointSection {
  title: string;
  description?: string;
  request: RequestConfig;
  response: ResponseConfig;
  parameters?: ObjectProperty[];
  returns?: ObjectProperty[];
  errorCodes?: ErrorCode[];
}
