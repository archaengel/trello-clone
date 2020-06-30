import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './AppStateContext';
import { Card } from './Card';
import { DragItem } from './DragItem';
import { ColumnContainer, ColumnTitle } from './styles';
import { useItemDrag } from './utils/useItemDrag';

interface ColumnProps {
  text: string;
  id: string;
  index: number;
}

export const Column = ({ text, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ['COLUMN'],
    hover(item: DragItem) {
      if (item.type === 'COLUMN') {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        } else {
          console.log(dragIndex, hoverIndex);

          dispatch({ type: 'MOVE_LIST', payload: { hoverIndex, dragIndex } });
          item.index = hoverIndex;
        }
      }
    },
  });
  const { drag } = useItemDrag({ type: 'COLUMN', text, index, id });

  drag(drop(ref));

  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        dark
        toggleButtonText="+ Add another task"
        onAdd={(text) => {
          dispatch({ type: 'ADD_TASK', payload: { text, listId: id } });
        }}
      />
    </ColumnContainer>
  );
};
