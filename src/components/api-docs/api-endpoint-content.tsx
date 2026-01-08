import { ResponseExample } from "./api-response";
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
      className="scroll-mt-20 space-y-6"
      id={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {parameters.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Parameters
              </h3>
              <div className="border border-border rounded-lg bg-background overflow-hidden p-3 space-y-4">
                {parameters.map((param) => (
                  <PropertyItem key={param.name} property={param} />
                ))}
              </div>
            </div>
          )}

          {/* Returns Section */}
          {returnsSchema.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Returns
              </h3>
              <div className="border border-border rounded-lg bg-background overflow-hidden">
                <div className="p-3">
                  <h4 className="text-base font-semibold text-foreground mt-0!">
                    Response attributes
                  </h4>
                  <div className="space-y-4">
                    {returnsSchema.map((attr) => (
                      <PropertyItem key={attr.name} property={attr} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {errorCodes.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Error Codes
              </h3>
              <ErrorCodes errors={errorCodes} />
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <CodeExample
              endpoint={endpoint}
              method={method}
              examples={codeExamples}
              defaultLanguage={codeExamples[0]?.language}
            />
            <ResponseExample data={responseExample} title="RESPONSE" />
          </div>
        </div>
      </div>
    </div>
  );
}
