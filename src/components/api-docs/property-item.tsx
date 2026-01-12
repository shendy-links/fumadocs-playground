"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ObjectProperty } from "./types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface PropertyItemProps {
  property: ObjectProperty;
  level?: number;
  showExpandButton?: boolean;
}

const PropertyField = ({
  name,
  type,
  description,
  required = false,
  isEnum = false,
}: {
  name: string;
  type?: string;
  description?: string;
  required?: boolean;
  isEnum?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-wrap gap-1",
        isEnum && "border-b pb-3 last:border-none last:pb-0"
      )}
    >
      <div className="flex items-center gap-3">
        {!isEnum ? (
          <span className="font-semibold text-sm text-foreground">{name}</span>
        ) : (
          <code className="font-mono text-xs text-foreground w-fit block mt-0">
            {name}
          </code>
        )}
        {type && <span className="text-xs">{type}</span>}
        {required && (
          <span className="text-destructive text-xs font-semibold">
            Required
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground m-0!">{description}</p>
      )}
    </div>
  );
};

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
      className="border-b pb-3 last:border-none last:pb-0"
    >
      <PropertyField
        name={property.name}
        type={property.type}
        required={property.required ?? false}
        description={property.description}
      />

      {property.enum && property.enum.length > 0 && (
        <div className="text-xs border rounded-md mt-2">
          <p className="text-muted-foreground font-semibold my-0! flex items-center h-7 ml-2">
            Possible enum values
          </p>
          <div className="border-t p-3 space-y-3">
            {property.enum.map((option, _) => (
              <PropertyField
                key={_}
                isEnum
                name={String(option.value)}
                description={option.description}
              />
            ))}
          </div>
        </div>
      )}

      {/* {hasNested && showExpandButton && (
        <Button
          size={"sm"}
          className="inline-flex items-center gap-2 text-xs font-medium hover:underline text-background mt-2"
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronDown
            className="h-3 w-3 transition-transform"
            style={{ transform: expanded ? "rotate(0deg)" : "rotate(-90deg)" }}
          />
          <span className="block min-w-30">
            {expanded ? "Hide" : "Show"} child attributes{" "}
          </span>
        </Button>
      )} */}

      {hasNested && showExpandButton && (
        <div className={cn("text-xs border rounded-t-md mt-2", !expanded && "rounded-md")}>
          <p 
            className="text-muted-foreground font-semibold my-0! flex items-center h-7 ml-2 gap-2 cursor-pointer"
            onClick={() => setExpanded(!expanded)}
            >
            <ChevronDown
              className="h-3 w-3 transition-transform"
              style={{
                transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
              }}
            />
            <span className="block min-w-30">
              {expanded ? "Hide" : "Show"} child attributes{" "}
            </span>
          </p>
        </div>
      )}

      {hasNested && expanded && (
        <div className="border-x border-b rounded-b-md p-3 mb-2 last:mb-0">
          {property.child?.map((item) => (
            <PropertyItem key={item.name} property={item} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
