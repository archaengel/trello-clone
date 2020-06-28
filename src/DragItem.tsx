import React from 'react';

export type ColumnDragItem = {
  type: 'COLUMN';
  id: string;
  text: string;
  index: number;
};

export type DragItem = ColumnDragItem;

export const DragItem = () => {};
