import React from "react";
import { colors } from "styles/colors";
import { IconProps } from "iconType";
export const MonthlyInstallment = ({
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
      <g opacity="0.5">
        <circle cx="8" cy="8" r="8" fill={color} />
        <rect
          x="4.6665"
          y="5"
          width="6.66667"
          height="6.33333"
          rx="1.5"
          stroke="white"
        />
        <path
          d="M6.33301 4.33203V4.9987"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.66699 4.33203V4.9987"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 7L11 7"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.16699 8.33203H6.50033"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.83301 8.33203H8.16634"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 8.33203H9.83333"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.16699 9.66797H6.50033"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.83301 9.66797H8.16634"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 9.66797H9.83333"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
