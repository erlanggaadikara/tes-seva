import React from "react";
import { colors } from "styles/colors";
import { IconProps } from "iconType";

export const Length = ({
  color = colors.label,
  width = 26,
  height = 24,
}: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: width,
        height: height,
      }}
    >
      <path
        d="M13.0874 3.64551L20.3618 3.64551L20.3618 10.9363"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="1"
        y1="-1"
        x2="9.16468"
        y2="-1"
        transform="matrix(-0.70631 0.707903 -0.70631 -0.707903 19.3853 3.09277)"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.9116 20.3545L3.63719 20.3545L3.63719 13.0637"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="1"
        y1="-1"
        x2="9.16468"
        y2="-1"
        transform="matrix(0.70631 -0.707903 0.70631 0.707903 4.61572 20.6697)"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
