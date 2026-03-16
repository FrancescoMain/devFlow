import { DragDropContext } from "@hello-pangea/dnd";
import { useKanban } from "@/hooks/Kanban/useKanban";
import { KanbanColumn } from "./KanbanColumn";

export function KanbanBoard() {
  const { state, onDragEnd } = useKanban();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-6">
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const cards = column.cardIds.map((id) => state.cards[id]);

          return (
            <KanbanColumn key={column.id} column={column} cards={cards} />
          );
        })}
      </div>
    </DragDropContext>
  );
}
