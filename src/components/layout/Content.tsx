import { useLayout } from "@/hooks/Layout/useLayout";

export default function Content({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useLayout();

  return (
    <main
      className={`min-h-[calc(100vh-4rem-3rem)] p-6 transition-all duration-300 ${
        sidebarOpen ? "ml-64" : "ml-0"
      }`}
    >
      {children}
    </main>
  );
}
