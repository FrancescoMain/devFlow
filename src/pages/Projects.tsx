import { KanbanBoard } from "@/components/Kanban/KanbanBoard";

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
      </div>
      <KanbanBoard />
    </div>
  );
}