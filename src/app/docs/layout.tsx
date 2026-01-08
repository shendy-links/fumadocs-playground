import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { ReactNode } from "react";
import { DocsSwitcher } from "@/components/custom/docs-switcher";
import CustomLayout from "./custom-layout";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <CustomLayout>
      <DocsLayout
        tree={source.pageTree}
        sidebar={{
          tabs: [],
          banner: <DocsSwitcher />,
        }}
        {...baseOptions()}
      >
        {children}
      </DocsLayout>
    </CustomLayout>
  );
}
