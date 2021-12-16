import React, { CSSProperties, FC } from "react";
import { XYCoord, useDragLayer } from "react-dnd";
import { DragPreview } from "DragPreview/DragPreview";
const TENURE_DRAG_PREVIEW_BOX_WIDTH = 130;
const layerStyles: CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  opacity: 0.9,
};

const getItemStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null,
  isTextRight: boolean
) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  const { y } = currentOffset;
  const x = getX(isTextRight);
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};
const getX = (isTextRight: boolean) => {
  let x;
  const documentWidth = document.documentElement.clientWidth;
  const bodyWidth = document.body.clientWidth;
  const bodyMargin = (documentWidth - bodyWidth) / 2;
  if (isTextRight) {
    x = bodyMargin;
  } else {
    x = documentWidth - bodyMargin - TENURE_DRAG_PREVIEW_BOX_WIDTH;
  }
  return x;
};
export const CustomDragLayer: FC = () => {
  const { isDragging, item, initialOffset, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );
  if (!isDragging) {
    return null;
  }

  return (
    <>
      {isDragging && (
        // Here is just a bug of styled-component, so I have to use the style for component
        <div style={layerStyles}>
          <div
            style={getItemStyles(
              initialOffset,
              currentOffset,
              item.isTextRight
            )}
          >
            <DragPreview
              width={item.width}
              isTextRight={item.isTextRight}
              label={item.label}
              color={item.color}
            />
          </div>
        </div>
      )}
    </>
  );
};
