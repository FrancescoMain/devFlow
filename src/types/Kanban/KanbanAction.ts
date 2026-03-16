export type KanbanAction =
  | {
      type: "REORDER_SAME_COLUMN";
      payload: { columnId: string; startIndex: number; endIndex: number };
    }
  | {
      type: "MOVE_ACROSS_COLUMNS";
      payload: {
        sourceColumnId: string;
        destColumnId: string;
        sourceIndex: number;
        destIndex: number;
      };
    };
