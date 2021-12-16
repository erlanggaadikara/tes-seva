import React from "react";
import { colors } from "styles/colors";
import { IconProps } from "iconType";
interface DownOutlinedProps extends IconProps {
  color?: string;
}

export const DownOutlined = ({
  color = colors.placeholder,
  width = 16,
  height = 9,
  ...restProps
}: DownOutlinedProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M15 1L8.03683 7.96317L1.07366 0.999999"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
