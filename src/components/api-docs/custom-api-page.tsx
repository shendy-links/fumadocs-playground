import { APIEndpointContent } from "./api-endpoint-content";
import { apiDocsMapping } from "./api-docs-mapping";

interface CustomAPIPageProps {
  pageProps: any;
  schema: {
    dereferenced: any;
  };
}

export function CustomAPIPage({ pageProps, schema }: CustomAPIPageProps) {
  const api = schema.dereferenced;

  const operations = apiDocsMapping.getOperationsForPage(api, pageProps);

  if (!operations.length) return null;

  return operations.map((operation: any) => {
    const responseContent =
      operation.responses?.["200"]?.content?.["application/json"];

    const responseExample =
      responseContent?.examples?.default?.value ??
      responseContent?.example ??
      apiDocsMapping.buildResponseExample(responseContent?.schema);

    const successSchema = responseContent?.schema;

    return (
      <APIEndpointContent
        key={operation.operationId ?? `${operation.method}-${operation.path}`}
        title={operation.summary}
        description={operation.description}
        method={operation.method}
        endpoint={operation.path}
        parameters={apiDocsMapping.adaptParameters(operation.parameters)}
        returnsSchema={apiDocsMapping.adaptSchema(successSchema)}
        responseExample={responseExample}
        codeExamples={apiDocsMapping.buildCodeExamples(operation)}
        errorCodes={apiDocsMapping.adaptErrorCodes(operation.responses)}
      />
    );
  });
}
