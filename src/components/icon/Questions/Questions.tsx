import React from "react";
import { IconProps } from "iconType";

export const Questions = ({
  width = 30,
  height = 30,
  backgroundColor = "rgba(255,255,255,0.25)",
  borderColor = "rgba(255,255,255,0.25)",
}: IconProps) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <circle cx="15" cy="15" r="12" fill={backgroundColor} />
      <path
        d="M9 21.3333V21.3333C9.20784 19.9972 10.0789 18.8447 11.3865 18.5006C12.3857 18.2377 13.6596 18 15 18C16.3404 18 17.6143 18.2377 18.6135 18.5006C19.9211 18.8447 20.7922 19.9972 21 21.3333V21.3333"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0001 15C16.841 15 18.3334 13.5076 18.3334 11.6666C18.3334 9.8257 16.841 8.33331 15.0001 8.33331C13.1591 8.33331 11.6667 9.8257 11.6667 11.6666C11.6667 13.5076 13.1591 15 15.0001 15Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="15" r="14.5" stroke={borderColor} />
    </svg>
  );
};
