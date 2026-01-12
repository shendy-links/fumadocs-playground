import { source } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { redirect } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { ReactNode } from "react";
import { SDKStoreAPIPage } from "@/components/custom/api-page";
import { CustomAPIPage } from "@/components/api-docs/custom-api-page";

const DocsLayout = ({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) => {
  return (
    <DocsPage full>
      <DocsTitle>{title}</DocsTitle>
      <DocsDescription>{description}</DocsDescription>
      <DocsBody>{children}</DocsBody>
    </DocsPage>
  );
};

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) redirect("/docs/mcp");

  if (page.data.type === "api-references") {
    return (
      <DocsLayout title={page.data.title} description={page.data.description}>
        {page.data.type === "api-references" && (
          <CustomAPIPage
            pageProps={page.data.getAPIPageProps()}
            schema={page.data.getSchema()}
          />
        )}
      </DocsLayout>
    );
  }

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) redirect("/docs/mcp");

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
