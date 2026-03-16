import { Droppable } from "@hello-pangea/dnd";
import type { KanbanColumn as KanbanColumnType, KanbanCard as KanbanCardType } from "@/types/Kanban/Kanban";
import { KanbanCard } from "./KanbanCard";
import { Badge } from "@/components/ui/Badge";

interface KanbanColumnProps {
  column: KanbanColumnType;
  cards: KanbanCardType[];
}

export function KanbanColumn({ column, cards }: KanbanColumnProps) {
  return (
    <div className="flex w-72 shrink-0 flex-col rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
        <Badge variant="muted" size="sm">
          {cards.length}
        </Badge>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 px-3 pb-3 transition-colors ${
              snapshot.isDraggingOver ? "bg-primary/5" : ""
            }`}
            style={{ minHeight: 80 }}
          >
            {cards.map((card, index) => (
              <KanbanCard key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}