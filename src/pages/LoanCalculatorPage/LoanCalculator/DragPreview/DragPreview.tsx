import React from "react";
import { DragBoxProps } from "Box/Box";
import { DragPreviewBox } from "./DragPreivewBox";
export const DragPreview = ({
  width,
  isTextRight,
  label,
  color,
}: DragBoxProps) => {
  return (
    <>
      <DragPreviewBox
        width={width}
        isTextRight={isTextRight}
        label={label}
        color={color}
      />
    </>
  );
};
