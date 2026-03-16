import type { KanbanCard as KanbanCardType } from "@/types/Kanban/Kanban";
import { Draggable } from "@hello-pangea/dnd";

interface KanbanCardProps {
  card: KanbanCardType;
  index: number;
}

export function KanbanCard({ card, index }: KanbanCardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-shadow hover:shadow-md ${
            snapshot.isDragging ? "shadow-lg ring-2 ring-primary/50" : ""
          }`}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
}
