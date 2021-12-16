import React from "react";
import { IconProps } from "iconType";
import { colors } from "styles/colors";

export const Plus = ({
  color = colors.placeholder,
  width = 24,
  height = 24,
}: IconProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: width, height: height }}
    >
      <rect
        x="0.000488281"
        y="-3.05176e-05"
        width="32"
        height="32"
        rx="16"
        fill="#F2F5F9"
      />
      <path
        d="M17.0005 12C17.0005 11.4477 16.5528 11 16.0005 11C15.4482 11 15.0005 11.4477 15.0005 12L17.0005 12ZM15.0005 20C15.0005 20.5523 15.4482 21 16.0005 21C16.5528 21 17.0005 20.5523 17.0005 20L15.0005 20ZM15.0005 12L15.0005 20L17.0005 20L17.0005 12L15.0005 12Z"
        fill={color}
      />
      <path
        d="M12.0005 15C11.4482 15 11.0005 15.4477 11.0005 16C11.0005 16.5523 11.4482 17 12.0005 17V15ZM20.0005 17C20.5528 17 21.0005 16.5523 21.0005 16C21.0005 15.4477 20.5528 15 20.0005 15V17ZM12.0005 17H20.0005V15H12.0005V17Z"
        fill={color}
      />
    </svg>
  );
};
