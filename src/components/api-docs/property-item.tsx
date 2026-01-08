"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ObjectProperty } from "./types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-select";

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
    <div
      id="property-item"
      className="border-b border-border last:border-b-0 last:mb-0!"
    >
      <div>
        {/* Property name and type - NOT collapsible */}
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-semibold text-sm text-foreground">{property.name}</span>
              <span className="text-xs">{property.type}</span>
              {property.required && <span className="text-destructive text-xs font-semibold">Required</span>}
            </div>

            {/* Description */}
            <p className="mt-2 text-sm text-muted-foreground mb-2">
              {property.description}
            </p>

            {/* Additional info */}
            <div className="my-3 space-y-2 last:m-0">
              {property.default !== undefined && (
                <div className="text-xs min-h-6 mx-auto flex self-start items-center gap-2 mb-3">
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
                  <div className="space-y-4 bg-card rounded-lg p-3 border border-border">
                    {property.enum.map((option) => (
                      <div
                        key={option.value}
                        className="pb-2 border-b last:border-none last:pb-0"
                      >
                        <code className="font-mono text-xs text-foreground w-fit mt-4">
                          {option.value}
                        </code>
                        {option.description && (
                          <p className="text-muted-foreground text-xs pl-1 my-1 last:mb-0">
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
