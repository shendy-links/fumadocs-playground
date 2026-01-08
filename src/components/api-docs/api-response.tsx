"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";

interface ResponseExampleProps {
  data: Record<string, any>;
  title?: string;
}

export function ResponseExample({
  data,
  title = "RESPONSE",
}: ResponseExampleProps) {
  // const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);

  // const handleCopy = async () => {
  //   await navigator.clipboard.writeText(jsonString);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };

  return (
    <div className="bg-slate-100 rounded-lg overflow-hidden border border-slate-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-200 border-b border-slate-300">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide m-0!">
          {title}
        </span>
        {/* <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-slate-600 hover:text-slate-900"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button> */}
      </div>

      {/* JSON Display */}
      <div className="p-4 text-xs font-mono text-slate-900 max-h-96 overflow-y-auto">
        <pre className="whitespace-pre-wrap wrap-break-word">
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
}
