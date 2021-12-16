import React from "react";
import { IconProps } from "iconType";

export const Check = ({
  width = 17,
  height = 13,
  color = "white",
}: IconProps) => {
  return (
    <svg
      width="17"
      height="13"
      viewBox="0 0 17 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <path
        d="M2 6.23529L6.24264 10.4779L14.7279 1.99265"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
