import React from "react";
import { IconProps } from "iconType";

export const Triangle = ({ width = 16, height = 8 }: IconProps) => {
  return (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <path
        d="M6.99382e-07 -1.39876e-06L6.58577 6.58578C7.36682 7.36683 8.63315 7.36683 9.4142 6.58579L16 0L6.99382e-07 -1.39876e-06Z"
        fill="white"
      />
    </svg>
  );
};
