import React from "react";
import { IconProps } from "iconType";
import { colors } from "styles/colors";
import styled from "styled-components";

interface IconPlusProps extends IconProps {
  onClick?: () => void;
}

export const IconPlus = ({
  width = 24,
  height = 24,
  color = colors.primary1,
  onClick,
  ...restProps
}: IconPlusProps) => {
  return (
    <StyledWrapper onClick={onClick} {...restProps}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="white" />
        <path
          d="M12 16.5L12 7.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 12L16.5 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  box-shadow: 0 1px 16px rgba(3, 24, 56, 0.1);
  border-radius: 16px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;
