import React from "react";
import { IconProps } from "components/icon/iconType";

export const UncheckedSquareOutlined = ({
  width = 16,
  height = 16,
}: IconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <rect
        x="0.75"
        y="0.75"
        width="14.5"
        height="14.5"
        rx="3.25"
        stroke="#E4E9F1"
        strokeWidth="1.5"
      />
    </svg>
  );
};
