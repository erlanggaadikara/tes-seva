import React from "react";
import { IconProps } from "components/icon/iconType";

interface TakePhotoIconProps {
  onClick: () => void;
}

export const TakePhotoIcon = ({
  width,
  height,
  onClick,
}: IconProps & TakePhotoIconProps) => {
  return (
    <div onClick={onClick}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 76 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={{ mixBlendMode: "hard-light" }}>
          <circle cx="38" cy="38" r="38" fill="#5CC9FC" />
        </g>
        <circle cx="38" cy="38" r="32" fill="#2825A4" />
        <path
          d="M28 35.2569C28 33.4582 29.4582 32 31.2569 32V32C32.3459 32 33.3628 31.4558 33.9669 30.5497L34 30.5C34.6247 29.5629 35.6765 29 36.8028 29H39.1972C40.3235 29 41.3753 29.5629 42 30.5L42.0331 30.5497C42.6372 31.4558 43.6541 32 44.7431 32V32C46.5418 32 48 33.4582 48 35.2569V43C48 45.2091 46.2091 47 44 47H32C29.7909 47 28 45.2091 28 43V35.2569Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="38"
          cy="39"
          r="4"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
