import { kanbanReducer } from "@/features/Kanban/kanbanReducers";
import type { KanbanState } from "@/types/Kanban/Kanban";
import type { DropResult } from "@hello-pangea/dnd";
import { useCallback, useReducer } from "react";

const initialState: KanbanState = {
  cards: {
    "card-1": { id: "card-1", title: "Setup progetto" },
    "card-2": { id: "card-2", title: "Definire i tipi" },
    "card-3": { id: "card-3", title: "Creare componenti UI" },
    "card-4": { id: "card-4", title: "Implementare DnD" },
    "card-5": { id: "card-5", title: "Testing finale" },
  },
  columns: {
    todo: {
      id: "todo",
      title: "Da fare",
      cardIds: ["card-3", "card-4", "card-5"],
    },
    "in-progress": {
      id: "in-progress",
      title: "In corso",
      cardIds: ["card-2"],
    },
    done: { id: "done", title: "Completate", cardIds: ["card-1"] },
  },
  columnOrder: ["todo", "in-progress", "done"],
};

export const useKanban = () => {
  const [state, dispatch] = useReducer(kanbanReducer, initialState);

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (source.droppableId === destination.droppableId) {
      dispatch({
        type: "REORDER_SAME_COLUMN",
        payload: {
          columnId: source.droppableId,
          startIndex: source.index,
          endIndex: destination.index,
        },
      });
    } else {
      dispatch({
        type: "MOVE_ACROSS_COLUMNS",
        payload: {
          sourceColumnId: source.droppableId,
          destColumnId: destination.droppableId,
          sourceIndex: source.index,
          destIndex: destination.index,
        },
      });
    }
  }, []);

  return { state, onDragEnd };
};
