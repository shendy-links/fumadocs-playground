"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

export const DEFAULT_COLUMN_STYLE = `grid-template:
'sidebar header toc'
'sidebar toc-popover toc'
'sidebar main toc' 1fr / minmax(var(--fd-sidebar-col), 1fr) minmax(0, var(--fd-page-col))
 minmax(min-content, 1fr);
 --fd-docs-row-1: var(--fd-banner-height, 0px);
 --fd-docs-row-2: calc(var(--fd-docs-row-1) + var(--fd-header-height));
 --fd-docs-row-3: calc(var(--fd-docs-row-2) + var(--fd-toc-popover-height));
 --fd-sidebar-col: var(--fd-sidebar-width);
 --fd-page-col: calc(
   var(--fd-layout-width, 97rem) - var(--fd-sidebar-width) - var(--fd-toc-width)
 );
 --fd-sidebar-width: 0px;
 --fd-toc-width: 0px;
 --fd-header-height: 0px;
 --fd-toc-popover-height: 0px;
`;

const TWO_COLUMN_STYLE = `
  grid-template-columns: 1fr / minmax(var(--fd-sidebar-col), 1fr);
  grid-template-areas:
    "sidebar header"
    "sidebar main";
`;

export default function CustomLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const originalStyleRef = useRef<string | null>(null);
  const originalClassRef = useRef<string | null>(null);
  const originalClassContentRef = useRef<string | null>(null);
  const isApiActiveRef = useRef(false);

  useEffect(() => {
    const layout = document.getElementById("nd-docs-layout");
    const content = document.getElementById("nd-page");

    if (!layout || !content) return;

    if (originalClassContentRef.current === null) {
      originalClassContentRef.current = content?.className;
    }

    if (originalStyleRef.current === null) {
      originalStyleRef.current = layout.style.cssText;
      originalClassRef.current = layout.className;
    }

    // const applyTwoColumn = () => {
    //   if (isApiActiveRef.current) return;
    //   isApiActiveRef.current = true;

    //   layout.style.cssText = TWO_COLUMN_STYLE;

    //   content.className = "flex flex-col w-full max-w-none mx-auto px-4 py-6 gap-4 md:px-6 md:pt-8 xl:px-8 xl:pt-14 xl:layout:[--fd-toc-width:268px]"
    // };

    const applyTwoColumn = () => {
      if (!isApiActiveRef.current) {
        isApiActiveRef.current = true;
      }

      // Keep fumadocs grid intact
      layout.style.setProperty("--fd-toc-width", "0px", "important");

      // Hide TOC node (important)
      const toc = document.querySelector("[data-fd-toc]");
      if (toc) toc.classList.add("hidden");

      content.classList.remove("max-w-[900px]");

      content.classList.add("w-full", "max-w-none");
    };

    const restoreDefault = () => {
      if (!isApiActiveRef.current) return;
      isApiActiveRef.current = false;

      if (originalStyleRef.current !== null) {
        layout.style.cssText = originalStyleRef.current;
      }
      if (originalClassRef.current !== null) {
        layout.className = originalClassRef.current;
      }
      if (originalClassContentRef.current !== null) {
        content.className = originalClassContentRef.current;
      }
    };

    const check = () => {
      const hasPropertyItem = document.getElementById("property-item");
      if (hasPropertyItem) {
        applyTwoColumn();
      } else {
        restoreDefault();
      }
    };

    // Initial check
    check();

    // Observe DOM changes
    const observer = new MutationObserver(check);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  console.log(pathname)

  return <>{children}</>;
}
