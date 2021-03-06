import React from "react";
import { IconProps } from "iconType";

export const LessThanTenPeopleIcon = ({
  width = 48,
  height = 42,
}: IconProps) => {
  return (
    <svg
      width="48"
      height="42"
      viewBox="0 0 48 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: width, height: height }}
    >
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="48"
        height="42"
      >
        <rect width="48" height="42" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0)">
        <path
          d="M24.0065 17.8507C28.8671 17.8507 32.8073 13.8547 32.8073 8.92533C32.8073 3.99601 28.8671 0 24.0065 0C19.1459 0 15.2056 3.99601 15.2056 8.92533C15.2056 13.8547 19.1459 17.8507 24.0065 17.8507Z"
          fill="#52627A"
        />
        <path
          d="M27.7366 18.4597H20.2689C14.0552 18.4597 9 23.5883 9 29.887V39.1501L9.02366 39.295L9.65158 39.4944C15.5813 41.3725 20.733 42 24.9719 42C33.2541 42 38.0536 39.6051 38.3502 39.4528L38.9381 39.1501H39V29.887C39.0027 23.5864 33.9484 18.4597 27.7366 18.4597Z"
          fill="#52627A"
        />
      </g>
    </svg>
  );
};
