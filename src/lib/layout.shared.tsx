import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import LinksLogo from "../../public/logo/LINKS_LIGHT.png";
import Image from "next/image";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2 flex-1">
          <Image src={LinksLogo} alt="logo" width={16} height={16} />
          <h1>Links</h1>
        </div>
      ),
    },
  };
}
