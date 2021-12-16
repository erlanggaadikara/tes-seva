import React from "react";
import { IconProps } from "iconType";

export const Card = ({ width = 24, height = 24 }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <rect
        x="2"
        y="5"
        width="20"
        height="15"
        rx="2"
        stroke="#2825A4"
        strokeWidth="2"
      />
      <path d="M1 10H23" stroke="#EC0A23" strokeWidth="2" />
    </svg>
  );
};
