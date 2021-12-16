import React from "react";
import { IconProps } from "iconType";

export const Done = ({ width = 42, height = 42 }: IconProps) => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
    >
      <circle cx="21" cy="21" r="20" stroke="#7DDD81" strokeWidth="2" />
      <circle cx="21" cy="21" r="15" fill="#5CC9FC" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.9119 17.3951C27.3841 17.8987 27.3586 18.6898 26.8549 19.1619L20.1883 25.4119C19.7074 25.8627 18.9592 25.8627 18.4784 25.4119L15.1451 22.2869C14.6414 21.8148 14.6159 21.0237 15.0881 20.5201C15.5602 20.0164 16.3513 19.9909 16.8549 20.4631L19.3333 22.7866L25.1451 17.3381C25.6487 16.8659 26.4398 16.8914 26.9119 17.3951Z"
        fill="white"
      />
    </svg>
  );
};
