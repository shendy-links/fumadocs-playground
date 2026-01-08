import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import {
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  CodeBlockTab,
} from "fumadocs-ui/components/codeblock";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { CpuIcon, Database, PanelsTopLeft, Terminal } from "lucide-react";
import { Files, File, Folder } from "fumadocs-ui/components/files";
import { Mermaid } from "./components/mdx/mermaid";
import type { MDXComponents } from "mdx/types";
import { APIHeadline } from "./components/api-docs/api-headline";
import { APIEndpointContent } from "./components/api-docs/api-endpoint-content";
import defaultMdxComponents from "fumadocs-ui/mdx";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,

    // components
    Cards,
    Card,
    Callout,
    Accordion,
    Accordions,
    CodeBlockTabs,
    CodeBlockTabsList,
    CodeBlockTabsTrigger,
    CodeBlockTab,
    Files,
    File,
    Folder,
    Tabs,
    Tab,
    Mermaid,
    APIHeadline,
    APIEndpointContent,
    CpuIcon,
    Database,
    PanelsTopLeft,
    Terminal,
  };
}
