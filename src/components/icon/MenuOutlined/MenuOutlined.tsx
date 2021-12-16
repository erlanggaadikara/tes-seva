import React from "react";
import { colors } from "styles/colors";
interface DownOutlinedProps {
  color?: string;
}
export const MenuOutlined = ({ color = colors.line }: DownOutlinedProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="13.3913" height="3.04348" rx="0.608696" fill={color} />
      <rect
        y="5.47839"
        width="13.3913"
        height="3.04348"
        rx="0.608696"
        fill={color}
      />
      <rect
        y="10.9568"
        width="13.3913"
        height="3.04348"
        rx="0.608696"
        fill={color}
      />
    </svg>
  );
};
