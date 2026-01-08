"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Boxes } from "lucide-react";

const OPTIONS = [
  {
    value: "mcp",
    href: "/docs/mcp",
    title: "MCP",
    description: "Core platform & concepts",
    icon: <Boxes className="h-4 w-4 mt-0.5" />,
  },
  {
    value: "sdk",
    href: "/docs/sdk",
    title: "SDK",
    description: "SDK usage, API & examples",
    icon: <BookOpen className="h-4 w-4 mt-0.5" />,
  },
];

export function DocsSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const current =
    OPTIONS.find((o) => pathname.startsWith(o.href))?.value ?? "mcp";

  const currentOption = OPTIONS.find((o) => o.value === current);

  return (
    <Select
      value={current}
      onValueChange={(value) => {
        const option = OPTIONS.find((o) => o.value === value);
        if (option) router.push(option.href);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue className="w-full">
          {currentOption && (
            <>
              {currentOption.icon}
              <div className="text-sm font-normal">{currentOption.title}</div>
            </>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent
        position="popper"
        side="bottom"
        align="start"
        sideOffset={8}
        className="w-[--radix-select-trigger-width]"
      >
        {OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            <div className="flex gap-2">
              {opt.icon}
              <div className="flex flex-col items-start">
                <div className="text-sm font-normal">{opt.title}</div>
                <div className="text-xs text-muted-foreground">
                  {opt.description}
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
