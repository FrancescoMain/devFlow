import type { KanbanState } from "@/types/Kanban/Kanban";
import type { KanbanAction } from "@/types/Kanban/KanbanAction";

export function kanbanReducer(
  state: KanbanState,
  action: KanbanAction,
): KanbanState {
  switch (action.type) {
    case "REORDER_SAME_COLUMN": {
      const { columnId, startIndex, endIndex } = action.payload;
      const column = state.columns[columnId];
      const newCardIds = [...column.cardIds];
      const [removed] = newCardIds.splice(startIndex, 1);
      newCardIds.splice(endIndex, 0, removed);

      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: { ...column, cardIds: newCardIds },
        },
      };
    }
    case "MOVE_ACROSS_COLUMNS": {
      const { sourceColumnId, destColumnId, sourceIndex, destIndex } =
        action.payload;
      const sourceCol = state.columns[sourceColumnId];
      const destCol = state.columns[destColumnId];
      const sourceCardIds = [...sourceCol.cardIds];
      const [removed] = sourceCardIds.splice(sourceIndex, 1);
      const destCardIds = [...destCol.cardIds];
      destCardIds.splice(destIndex, 0, removed);

      return {
        ...state,
        columns: {
          ...state.columns,
          [sourceColumnId]: { ...sourceCol, cardIds: sourceCardIds },
          [destColumnId]: { ...destCol, cardIds: destCardIds },
        },
      };
    }
  }
}
