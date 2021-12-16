import React from "react";
import { IconProps } from "iconType";

export const TickFilled = ({
  width = 48,
  height = 48,
  ...restProps
}: IconProps) => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height }}
      {...restProps}
    >
      <circle cx="21" cy="21" r="20" stroke="#7DDD81" strokeWidth="2" />
      <circle cx="21" cy="21" r="15" fill="#5CC9FC" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.1619 17.3951C27.6341 17.8987 27.6086 18.6898 27.1049 19.1619L20.4383 25.4119C19.9574 25.8627 19.2092 25.8627 18.7284 25.4119L15.3951 22.2869C14.8914 21.8148 14.8659 21.0237 15.3381 20.5201C15.8102 20.0164 16.6013 19.9909 17.1049 20.4631L19.5833 22.7866L25.3951 17.3381C25.8987 16.8659 26.6898 16.8914 27.1619 17.3951Z"
        fill="white"
      />
    </svg>
  );
};
