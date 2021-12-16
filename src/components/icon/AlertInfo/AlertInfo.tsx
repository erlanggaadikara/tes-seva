import React from "react";
import { IconProps } from "iconType";
import { colors } from "styles/colors";

export const AlertInfo = ({
  color = colors.placeholder,
  width = 24,
  height = 24,
}: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: width, height: height }}
    >
      <circle cx="12" cy="12" r="11" stroke={color} strokeWidth="2" />
      <path
        d="M12 7V12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16V16.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
