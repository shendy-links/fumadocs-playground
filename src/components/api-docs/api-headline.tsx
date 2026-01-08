"use client";

import type React from "react";

interface APIIntroSectionProps {
  title: string;
  version?: string;
  description: string;
  learnMoreLink?: string;
  learnMoreText?: string;
  endpoints: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
  }[];
}

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-blue-500/10 text-blue-700 border-blue-200",
  POST: "bg-green-500/10 text-green-700 border-green-200",
  PUT: "bg-orange-500/10 text-orange-700 border-orange-200",
  PATCH: "bg-purple-500/10 text-purple-700 border-purple-200",
  DELETE: "bg-red-500/10 text-red-700 border-red-200",
};

export function APIHeadline({
  title,
  version,
  description,
  learnMoreLink,
  learnMoreText,
  endpoints,
}: APIIntroSectionProps) {
  return (
    <div className="scroll-mt-20 space-y-6">
      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            {version && (
              <span className="text-sm text-muted-foreground">{version}</span>
            )}
          </div>
          <p className="m-0! text-muted-foreground text-sm">{description}</p>
          {learnMoreLink && (
            <a
              href={learnMoreLink}
              className="inline-flex items-center text-sm font-medium text-foreground hover:underline gap-1"
            >
              {learnMoreText}
              <span aria-hidden="true">›</span>
            </a>
          )}
        </div>
        {endpoints.length > 0 && (
          <div className="sticky top-24 bg-card rounded-lg border border-border overflow-hidden col-span-2">
            <div className="px-3 py-2 bg-muted border-b border-border">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide m-0!">
                Endpoints
              </h3>
            </div>
            <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
              {endpoints.map((endpoint, idx) => (
                <div key={idx} className="flex items-start gap-2 group">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold border whitespace-nowrap ${
                      METHOD_COLORS[endpoint.method] ||
                      "bg-gray-500/10 text-gray-700"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-xs font-mono text-foreground break-all group-hover:text-primary transition-colors">
                    {endpoint.path}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
