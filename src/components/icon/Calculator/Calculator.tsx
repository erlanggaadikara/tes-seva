import React from "react";
import { IconProps } from "iconType";

export const Calculator = ({ width = 68, height = 68 }: IconProps) => {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <circle cx="34" cy="34" r="32" stroke="#7DDD81" strokeWidth="3" />
      <circle cx="34" cy="34" r="24" fill="#5CC9FC" />
      <path
        d="M25 28.75V44C25 45.1046 25.8954 46 27 46H41C42.1046 46 43 45.1046 43 44V28.75M25 28.75V24C25 22.8954 25.8954 22 27 22H41C42.1046 22 43 22.8954 43 24V28.75M25 28.75H43"
        stroke="white"
        strokeWidth="2"
      />
      <circle cx="29.5" cy="32.5" r="1.5" fill="white" />
      <circle cx="29.5" cy="37" r="1.5" fill="white" />
      <circle cx="29.5" cy="41.5" r="1.5" fill="white" />
      <circle cx="34" cy="32.5" r="1.5" fill="white" />
      <circle cx="34" cy="37" r="1.5" fill="white" />
      <circle cx="34" cy="41.5" r="1.5" fill="white" />
      <circle cx="38.5" cy="32.5" r="1.5" fill="white" />
      <circle cx="38.5" cy="37" r="1.5" fill="white" />
      <circle cx="38.5" cy="41.5" r="1.5" fill="white" />
    </svg>
  );
};
