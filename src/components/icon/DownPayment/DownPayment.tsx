import React from "react";
import { colors } from "styles/colors";
import { IconProps } from "iconType";
export const DownPayment = ({
  color = colors.title,
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
      <circle opacity="0.8" cx="8" cy="8" r="8" fill={color} />
      <rect
        x="4.83301"
        y="5.83203"
        width="6.33333"
        height="4.66667"
        rx="1"
        stroke="white"
      />
      <path d="M5 8L11 8" stroke="white" />
    </svg>
  );
};
