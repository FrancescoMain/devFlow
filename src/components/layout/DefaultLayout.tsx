import type { DefaultLayoutProps } from "@/types/Layout/DefaultLayoutProps";
import { Layout } from "./Layout";

export function DefaultLayout({
  children,
  showFooter = true,
  showHeader = true,
  showSidebar = true,
}: DefaultLayoutProps) {
  return (
    <Layout>
      {showHeader && <Layout.Header />}
      {showSidebar && <Layout.Sidebar />}
      <Layout.Content>{children}</Layout.Content>
      {showFooter && <Layout.Footer />}
    </Layout>
  );
}
