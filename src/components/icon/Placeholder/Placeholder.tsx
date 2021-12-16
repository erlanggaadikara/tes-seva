import { colors } from "styles/colors";
import { IconProps } from "iconType";
import React from "react";

export const Placeholder = ({
  color = colors.placeholder,
  width = 36,
  height = 36,
}: IconProps) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: width, height: height }}
    >
      <path
        d="M1.5 8C1.5 6.89543 2.39543 6 3.5 6H32.5C33.6046 6 34.5 6.89543 34.5 8V28C34.5 29.1046 33.6046 30 32.5 30H3.5C2.39543 30 1.5 29.1046 1.5 28V8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 28.5L22.6101 14.1881C23.2328 13.7659 24.0398 13.7289 24.6986 14.0923L34.5 19.5"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="9" cy="13.5" r="1.5" stroke={color} strokeWidth="2" />
    </svg>
  );
};
