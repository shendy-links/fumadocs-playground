"use client";

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
    <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
      {/* Header with Method and Language Selector */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded text-xs font-semibold border ${
              METHOD_COLORS[method] || "bg-gray-500/10 text-gray-700"
            }`}
          >
            {method}
          </span>
          <code className="text-sm text-slate-300 font-mono">{endpoint}</code>
        </div>

        <div className="flex items-center gap-2">
          {examples.length > 0 && (
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="w-32 h-8 bg-slate-800 border-slate-600 text-slate-300">
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
            className="text-slate-400 hover:text-slate-200"
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
      <div className="p-4 text-sm font-mono text-slate-100">
        <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
