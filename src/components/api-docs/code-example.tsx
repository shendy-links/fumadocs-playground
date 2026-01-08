"use client";

import ShikiHighlighter from "react-shiki";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CodeExampleProps {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  examples?: { language: string; code: string }[];
  defaultLanguage?: string;
}

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-blue-500/10 text-blue-700 border-blue-200",
  POST: "bg-green-500/10 text-green-700 border-green-200",
  PUT: "bg-orange-500/10 text-orange-700 border-orange-200",
  PATCH: "bg-purple-500/10 text-purple-700 border-purple-200",
  DELETE: "bg-red-500/10 text-red-700 border-red-200",
};

export function ShikiCodeBlock({
  code,
  lang,
  theme = { light: "github-dark", dark: "github-light" },
}: {
  code: string;
  lang: string;
  theme?: { light: string; dark: string };
}) {
  return (
    <ShikiHighlighter
      tabindex={-1}
      language={lang}
      className={cn(
        "text-sm focus:ring-none focus:outline-none focus:ring-0 [&_pre]:focus:outline-none [&_pre]:focus:ring-0 [&_pre]:focus-visible:outline-none [&_pre]:focus-visible:ring-0",
        "[&_pre]:rounded-t-none!",
        "[&_pre]:rounded-bl-lg!",
        "[&_pre]:rounded-br-lg!"
      )}
      theme={theme}
      langStyle={{ display: "none" }}
    >
      {code.trim()}
    </ShikiHighlighter>
  );
}

export function CodeExample({
  endpoint,
  method,
  examples = [],
  defaultLanguage = "typescript",
}: CodeExampleProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [copied, setCopied] = useState(false);

  const currentExample = examples.find(
    (ex) => ex.language === selectedLanguage
  );

  const code = currentExample?.code || "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-foreground/90 dark:bg-background/90 rounded-lg overflow-hidden border dark:border-b-background/90">
      <div className="flex items-center justify-between px-3 py-1 border-b border-b-foreground/90 dark:border-b-background/90">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              METHOD_COLORS[method],
              "px-3 py-1 rounded text-xs font-semibold border bg-white"
            )}
          >
            {method}
          </span>
          <span className="text-white font-semibold text-xs">{endpoint}</span>
        </div>
        <div className="flex items-center gap-2">
          {examples.length > 0 && (
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="text-xs py-0! px-2! text-white h-6!">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {examples.map((ex) => (
                  <SelectItem key={ex.language} value={ex.language}>
                    {ex.language.charAt(0).toUpperCase() + ex.language.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-white hover:bg-background/90"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Code Display */}
      <ShikiCodeBlock lang={selectedLanguage} code={code} />
    </div>
  );
}
