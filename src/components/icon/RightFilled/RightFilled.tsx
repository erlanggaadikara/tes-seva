import React from "react";
import { IconProps } from "iconType";
import { colors } from "styles/colors";

export const RightFilled = ({
  width = 24,
  height = 24,
  color = colors.title,
  ...restProps
}: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: width, height: height }}
      {...restProps}
    >
      <circle cx="12" cy="12" r="12" fill="white" />
      <path
        d="M10 16.6666L14.6421 12.0245L10 7.3824"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
