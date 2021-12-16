import {
  SpeedometerSvg,
  SpeedometerSvgProps,
} from "SpeedometerSvg/SpeedometerSvg";
import React from "react";
import { colors } from "styles/colors";
export type ColoredSpeedometerProps = SpeedometerSvgProps & {
  restBlockColor?: string;
};
export const SpeedometerRed = ({
  radius = 30,
  lineWidth = 9,
  restBlockColor = colors.white,
}: ColoredSpeedometerProps) => {
  const blockColors = [
    colors.error,
    colors.error,
    restBlockColor,
    restBlockColor,
    restBlockColor,
    restBlockColor,
  ];
  return (
    <SpeedometerSvg
      radius={radius}
      colors={blockColors}
      lineWidth={lineWidth}
    />
  );
};
