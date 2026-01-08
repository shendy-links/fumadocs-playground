import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import "./global.css";
import 'katex/dist/katex.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} font-sans antialiased`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen overflow-y-scroll">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
