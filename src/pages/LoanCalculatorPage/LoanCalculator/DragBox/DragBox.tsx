import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { DragPreviewImage, useDrag } from "react-dnd";
import { DragSourceType } from "dragAndDropModel";
import { Box } from "Box/Box";
import { colors } from "styles/colors";
import dragPreviewDp from "./images/dragPreview.png";

interface DragBoxProps extends HTMLAttributes<HTMLDivElement> {
  isTextRight?: boolean;
  label: string;
  dragSourceType: DragSourceType;
  width?: string;
  color?: string;
}
export const DragBox = ({
  isTextRight,
  label,
  dragSourceType,
  width,
  color = colors.primary1,
}: DragBoxProps) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: dragSourceType,
    item: { label, isTextRight, width, color },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div>
      <DragPreviewImage connect={preview} src={dragPreviewDp} />
      <StyledDragBox ref={drag} isDragging={isDragging}>
        <Box
          width={width}
          isTextRight={isTextRight}
          label={label}
          color={color}
        />
      </StyledDragBox>
    </div>
  );
};
type StyledDragBoxProps = { isDragging?: boolean };
const StyledDragBox = styled.div<StyledDragBoxProps>`
  display: ${({ isDragging }) => (isDragging ? "none" : "flex")};
  cursor: pointer;
`;
