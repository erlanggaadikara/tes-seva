import React from "react";
import { IconProps } from "iconType";
import { colors } from "styles/colors";

export const RightOutlined = ({
  width = 9,
  height = 16,
  color = colors.plusIcon,
}: IconProps) => {
  return (
    <svg
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: width, height: height }}
    >
      <path
        d="M1 1L7.96317 7.96317L1 14.9263"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
