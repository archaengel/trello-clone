import React from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import { Column } from './Column';
import { CustomDragLayerContainer } from './styles';
import { Card } from './Card';

const getItemStyles = (currentOffset: XYCoord | null): React.CSSProperties => {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

export const CustomDragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        {item.type === 'COLUMN' ? (
          <Column
            isPreview={true}
            text={item.text}
            index={item.index}
            id={item.id}
          />
        ) : (
          <Card
            isPreview={true}
            text={item.text}
            index={0}
            id={item.id}
            columnId={item.columnId}
          />
        )}
      </div>
    </CustomDragLayerContainer>
  ) : null;
};
