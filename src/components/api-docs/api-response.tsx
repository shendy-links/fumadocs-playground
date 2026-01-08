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
    <div className="bg-muted dark:bg-muted-foreground rounded-lg overflow-hidden border">
      <div className="flex items-center justify-between px-3 py-2 border-b ">
        <span className="font-semibold text-xs">{title}</span>
      </div>
      <ShikiCodeBlock
        lang={"json"}
        code={jsonString}
        theme={{ light: "github-light", dark: "github-light" }}
      />
    </div>
  );
}
