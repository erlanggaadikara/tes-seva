import React from "react";
import { IconProps } from "components/icon/iconType";
export const Ruler = ({ width, height = 18 }: IconProps) => {
  return (
    <svg
      width="200"
      height="18"
      viewBox="0 0 328 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <path
        d="M165 1C165 0.447715 164.552 -2.41411e-08 164 0C163.448 2.41411e-08 163 0.447715 163 1L165 1ZM165 17L165 1L163 1L163 17L165 17Z"
        fill="#E4E9F1"
      />
      <path
        d="M261 1C261 0.447715 260.552 0 260 0C259.448 0 259 0.447715 259 1H261ZM261 17V1H259V17H261Z"
        fill="#E4E9F1"
      />
      <path
        d="M69 1C69 0.447715 68.5523 0 68 0C67.4477 0 67 0.447715 67 1H69ZM69 17V1H67V17H69Z"
        fill="#E4E9F1"
      />
      <path
        d="M0 15L328 15"
        stroke="url(#paint0_linear)"
        strokeWidth="4"
        strokeDasharray="1 3"
      />
      <path d="M0 17L328 17" stroke="url(#paint1_linear)" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="385.4"
          y1="13.0028"
          x2="-74.9714"
          y2="13.0028"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4E9F1" stopOpacity="0" />
          <stop offset="0.479112" stopColor="#E4E9F1" />
          <stop offset="1" stopColor="#E4E9F1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="385.4"
          y1="15.0028"
          x2="-74.9714"
          y2="15.0028"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4E9F1" stopOpacity="0" />
          <stop offset="0.479112" stopColor="#E4E9F1" />
          <stop offset="1" stopColor="#E4E9F1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
