import React from "react";
import { IconProps } from "components/icon/iconType";

export const Clock = ({ width = 16, height = 16 }: IconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <circle
        cx="7.99967"
        cy="7.9987"
        r="6.66667"
        stroke="#2825A4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 3.33203V7.9987L10.6667 10.6654"
        stroke="#EC0A23"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
