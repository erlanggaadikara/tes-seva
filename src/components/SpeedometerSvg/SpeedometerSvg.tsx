import React from "react";
import { Arc } from "./Arc/Arc";
import { colors } from "styles/colors";

export interface SpeedometerSvgProps {
  colors?: string[];
  radius?: number;
  lineWidth?: number;
}
const defaultColors = [
  colors.success,
  colors.success,
  colors.success,
  colors.success,
  colors.success,
  colors.success,
];
export const SpeedometerSvg = ({
  colors = defaultColors,
  radius = 40,
  lineWidth = 10,
}: SpeedometerSvgProps) => {
  const blockAngle = 1 / 7;
  const blankAngle = 1 / 35;
  const wholeAngle = blockAngle + blankAngle;
  return (
    <svg
      style={{
        width: radius * 2 + lineWidth,
        height: radius + lineWidth / 2,
      }}
    >
      {colors.map((color, index) => {
        return (
          <Arc
            x={radius + lineWidth / 2}
            y={radius + lineWidth / 2}
            color={color}
            key={index}
            radius={radius}
            startAngle={(1 + wholeAngle * index) * Math.PI}
            endAngle={(1 + wholeAngle * index + blockAngle) * Math.PI}
            lineWidth={lineWidth}
          />
        );
      })}
    </svg>
  );
};
