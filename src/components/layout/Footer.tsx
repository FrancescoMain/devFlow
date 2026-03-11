import { useLayout } from "@/hooks/Layout/useLayout";

export default function Footer() {
  const { sidebarOpen } = useLayout();

  return (
    <footer
      className={`flex h-12 items-center justify-between border-t border-border bg-surface px-6 text-sm text-muted transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-0"
      }`}
    >
      <span>devFlow &copy; {new Date().getFullYear()}</span>
      <span>v0.1.0</span>
    </footer>
  );
}
