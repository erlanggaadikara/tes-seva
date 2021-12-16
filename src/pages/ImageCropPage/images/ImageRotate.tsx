import React from "react";
import { IconProps } from "components/icon/iconType";
interface ImageRotateProps {
  onClick?: () => void;
}

export const ImageRotate = ({
  width,
  height,
  onClick,
}: IconProps & ImageRotateProps) => {
  return (
    <div onClick={onClick}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 22.9031H13.9354V8.96768H0V22.9031ZM1.54837 10.5161H12.387V21.3547H1.54837V10.5161Z"
          fill="white"
        />
        <path
          d="M23.7729 9.19452C23.4705 8.89211 22.9806 8.89211 22.6782 9.19452L20.903 10.9697V7.41931C20.903 4.43141 18.4716 2 15.4837 2H13.1612C12.7332 2 12.387 2.34627 12.387 2.77419C12.387 3.20211 12.7332 3.54837 13.1612 3.54837H15.4837C17.6188 3.54837 19.3546 5.28426 19.3546 7.41931V10.9697L17.5795 9.19452C17.2771 8.89211 16.7871 8.89211 16.4847 9.19452C16.1823 9.49694 16.1823 9.98687 16.4847 10.2893L19.5815 13.386C19.7327 13.5372 19.9308 13.6128 20.1289 13.6128C20.327 13.6128 20.525 13.5372 20.6763 13.386L23.773 10.2893C24.0754 9.98685 24.0754 9.49692 23.773 9.19452H23.7729Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
