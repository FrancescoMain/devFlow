export interface KanbanCard {
  id: string;
  title: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cardIds: string[];
}

export interface KanbanState {
  cards: Record<string, KanbanCard>;
  columns: Record<string, KanbanColumn>;
  columnOrder: string[];
}
