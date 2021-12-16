import React from "react";
import { IconProps } from "components/icon/iconType";
import { colors } from "styles/colors";
interface Props extends IconProps {
  fillColor?: string;
  strokeColor?: string;
}

export const CircleWithDotOutlined = ({
  width = 24,
  height = 24,
  fillColor = colors.secondaryText,
  strokeColor = colors.line,
}: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <path
        d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="8"
      />
    </svg>
  );
};
