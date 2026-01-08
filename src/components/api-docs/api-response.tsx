"use client";

import { ShikiCodeBlock } from "./code-example";

interface ResponseExampleProps {
  data: Record<string, any>;
  title?: string;
}

export function APIResponse({
  data,
  title = "RESPONSE",
}: ResponseExampleProps) {
  const jsonString = JSON.stringify(data, null, 2);
  return (
    <div className="bg-foreground/90 dark:bg-background/90 rounded-lg overflow-hidden border dark:border-b-background/90">
      <div className="flex items-center justify-between px-3 py-2 border-b border-b-foreground/90 dark:border-b-background/90">
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold text-xs">{title}</span>
        </div>
      </div>
      <ShikiCodeBlock lang={"json"} code={jsonString} />
    </div>
  );
}
