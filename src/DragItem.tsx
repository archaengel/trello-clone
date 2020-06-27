export type ColumnDragItem = {
  type: 'COLUMN';
  id: string;
  text: string;
  index: number;
};

export type CardDragItem = {
  type: 'CARD';
  id: string;
  text: string;
  index: number;
  columnId: string;
};

export type DragItem = ColumnDragItem | CardDragItem;
