import React from "react";
import { IconProps } from "iconType";

export const FlagIndonesia = ({ width = 24, height = 16 }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="16" rx="1" fill="#FCFCFC" />
      <path
        d="M0 1C0 0.447715 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V8H0V1Z"
        fill="#CE1126"
      />
      <rect
        x="0.25"
        y="0.25"
        width="23.5"
        height="15.5"
        rx="0.75"
        stroke="#9EA3AC"
        strokeWidth="0.5"
      />
    </svg>
  );
};
