"use client";

import { Copy, Check } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

interface JSONPreviewProps {
  data: Record<string, any>;
  title?: string;
  language?: "json" | "javascript" | "typescript";
}

export function JSONPreview({
  data,
  title = "Example Response",
  language = "json",
}: JSONPreviewProps) {
  const [copied, setCopied] = useState(false);

  const jsonString = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Syntax highlighting function for JSON
  const highlightJSON = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"([^"]*)":/g, '"<span class="json-key">$1</span>":')
      .replace(/: "([^"]*)"/g, ': "<span class="json-string">$1</span>"')
      .replace(/: ([0-9]+)/g, ': <span class="json-number">$1</span>')
      .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
      .replace(/: (null)/g, ': <span class="json-null">$1</span>');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
        >
          {copied ? (
            <Check className="w-3 h-3 text-green-600" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>

      <div className="relative bg-card rounded-lg border border-border overflow-hidden">
        <pre
          className="p-4 overflow-x-auto text-xs leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: highlightJSON(jsonString),
          }}
        />
      </div>
    </div>
  );
}
