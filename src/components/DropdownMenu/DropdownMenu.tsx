import React, { useState } from "react";
import styled from "styled-components";
import { transparent } from "styles/colors";

interface DropdownMenuProps {
  right?: number;
  marginTop?: number;
  children: React.ReactNode;
}

export const useDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onBackgroundClick = () => setIsOpen(false);

  const DropdownMenu = ({
    right = 0,
    marginTop = 8,
    ...restProps
  }: DropdownMenuProps) => {
    return (
      <StyledContainer isOpen={isOpen}>
        <StyledFullScreenButton onClick={onBackgroundClick} />
        <StyledItemContainer
          right={right}
          marginTop={marginTop}
          {...restProps}
        />
      </StyledContainer>
    );
  };

  return { DropdownMenu, setDropdownDisplay: setIsOpen };
};

const StyledItemContainer = styled.div<{ right: number; marginTop: number }>`
  position: absolute;
  z-index: 100;
  background: #ffffff;
  box-shadow: 0 1px 16px ${transparent("title", 0.2)};
  border-radius: 16px;
  overflow: hidden;
  margin-top: ${({ marginTop }) => `${marginTop}px`};
  right: ${({ right }) => `${right}px`};
`;

const StyledContainer = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "relative" : "none")};
`;

const StyledFullScreenButton = styled.button`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: default;
  z-index: 100;
  border: none;
`;
