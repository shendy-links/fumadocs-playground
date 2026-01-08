"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ObjectProperty } from "./types";
import { Badge } from "@/components/ui/badge";

interface PropertyItemProps {
  property: ObjectProperty;
  level?: number;
  showExpandButton?: boolean;
}

export function PropertyItem({
  property,
  level = 0,
  showExpandButton = true,
}: PropertyItemProps) {
  const [expanded, setExpanded] = useState(false);
  const hasNested = property.child && property.child.length > 0;

  return (
    <div id="property-item" className="border-b border-border last:border-b-0">
      <div>
        {/* Property name and type - NOT collapsible */}
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <code className="text-xs text-foreground">{property.name}</code>
              <Badge
                variant="secondary"
                className="bg-card text-card-foreground border border-border text-xs"
              >
                {property.type}
              </Badge>
              {property.required && (
                <Badge variant="destructive" className="text-xs">
                  Required
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="mt-2 text-sm text-muted-foreground">
              {property.description}
            </p>

            {/* Additional info */}
            <div className="my-3 space-y-2">
              {property.default !== undefined && (
                <div className="text-xs">
                  <span className="text-muted-foreground">Default: </span>
                  <code className="font-mono text-foreground bg-card px-2 py-1 rounded">
                    {String(property.default)}
                  </code>
                </div>
              )}

              {property.enum && property.enum.length > 0 && (
                <div className="text-xs">
                  <p className="text-muted-foreground mb-2 font-semibold">
                    Possible enum values
                  </p>
                  <div className="space-y-2 bg-card rounded-lg p-3 border border-border">
                    {property.enum.map((option) => (
                      <div key={option.value} className="space-y-1">
                        <code className="font-mono text-xs text-foreground block">
                          {option.value}
                        </code>
                        {option.description && (
                          <p className="text-muted-foreground text-xs pl-1">
                            {option.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasNested && showExpandButton && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline mt-2"
                >
                  <ChevronDown
                    className="h-3 w-3 transition-transform"
                    style={{
                      transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                    }}
                  />
                  {expanded ? "Hide" : "Show"} child parameters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Nested properties - only shown when expanded */}
        {hasNested && expanded && (
          <div className="mt-2 ml-2 border-l border-border pl-4">
            {property.child?.map((item) => (
              <PropertyItem key={item.name} property={item} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
