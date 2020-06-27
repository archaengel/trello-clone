import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from './AppStateContext';
import { CardDragItem } from './DragItem';
import { CardContainer } from './styles';
import { isHidden } from './utils/isHidden';
import { useItemDrag } from './utils/useItemDrag';

interface CardProps {
  text: string;
  id: string;
  index: number;
  columnId: string;
  isPreview?: boolean;
}

export const Card = ({ isPreview, text, index, columnId, id }: CardProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: 'CARD', text, index, columnId, id });
  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      dispatch({
        type: 'MOVE_TASK',
        payload: {
          dragIndex,
          hoverIndex,
          sourceColumn,
          targetColumn,
        },
      });

      item.index = hoverIndex;
      item.columnId = targetColumn;
    },
  });

  drag(drop(ref));

  return (
    <CardContainer
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, 'CARD', id)}
      isPreview={isPreview}
    >
      {text}
    </CardContainer>
  );
};
