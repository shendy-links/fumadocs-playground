import { APIResponse } from "./api-response";
import { CodeExample } from "./code-example";
import { ErrorCodes } from "./error-codes";
import { PropertyItem } from "./property-item";
import { ErrorCode, ObjectProperty } from "./types";

interface CodeExampleConfig {
  language: string;
  code: string;
}

interface APIEndpointContentProps {
  title: string;
  description?: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint: string;
  codeExamples: CodeExampleConfig[];
  responseExample: Record<string, any>;
  parameters?: ObjectProperty[];
  returnsSchema?: ObjectProperty[];
  errorCodes?: ErrorCode[];
}

export function APIEndpointContent({
  title,
  description,
  method,
  endpoint,
  codeExamples,
  responseExample,
  parameters = [],
  returnsSchema = [],
  errorCodes = [],
}: APIEndpointContentProps) {
  return (
    <div
      className="scroll-mt-20 space-y-6 my-6!"
      id={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <div className="grid grid-cols-4 gap-5">
        <div className="lg:col-span-2 space-y-8">
          {parameters.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 mt-0!">
                Parameters
              </h3>
              <div className="border border-border rounded-lg bg-background overflow-hidden p-3 space-y-3">
                {parameters.map((param) => (
                  <PropertyItem key={param.name} property={param} />
                ))}
              </div>
            </>
          )}

          {returnsSchema.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 mt-0!">
                Returns
              </h3>
              <div className="border border-border rounded-lg bg-background overflow-hidden p-3 space-y-3">
                {returnsSchema.map((attr) => (
                  <PropertyItem key={attr.name} property={attr} />
                ))}
              </div>
            </>
          )}

          {/* {errorCodes.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Error Codes
              </h3>
              <ErrorCodes errors={errorCodes} />
            </>
          )} */}
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 space-y-3">
            <CodeExample
              endpoint={endpoint}
              method={method}
              examples={codeExamples}
              defaultLanguage={codeExamples[0]?.language}
            />
            <APIResponse data={responseExample} title="RESPONSE" />
          </div>
        </div>
      </div>
    </div>
  );
}
