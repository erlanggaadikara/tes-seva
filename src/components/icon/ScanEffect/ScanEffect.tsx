import React, { ReactElement } from "react";
import { IconProps } from "iconType";
import { colors } from "styles/colors";

export const ScanEffect = ({
  width = 315,
  height = 140,
  color = colors.white,
  ...restProps
}: IconProps): ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: width, height: height }}
      {...restProps}
    >
      <rect
        x="0"
        width={width}
        height={height}
        rx="1"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="157"
          y1="0"
          x2="157"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset="0.536737" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
