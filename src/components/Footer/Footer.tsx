import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { maxPageWidth } from "styles/GlobalStyle";
import { colors, transparent } from "styles/colors";
import { ZIndex } from "styles/zIndex";

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  background?: string;
  padding?: string;
  borderRadius?: number;
  showShadow?: boolean;
}

export const Footer = ({
  background = colors.white,
  padding = "15px 16px",
  borderRadius = 16,
  children,
  showShadow = false,
}: FooterProps) => {
  return (
    <FooterStyle
      showShadow={showShadow}
      background={background}
      padding={padding}
      borderRadius={borderRadius}
    >
      {children}
    </FooterStyle>
  );
};

const FooterStyle = styled.div<{
  background: string;
  padding: string;
  borderRadius: number;
  showShadow: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${ZIndex.Menubar};
  margin: 0 auto;
  max-width: ${maxPageWidth};
  background: ${({ background }) => background};
  padding: ${({ padding }) => padding};
  border-top-left-radius: ${({ borderRadius }) => borderRadius}px;
  border-top-right-radius: ${({ borderRadius }) => borderRadius}px;
  box-shadow: ${({ showShadow }) =>
    showShadow ? `0 1px 16px ${transparent("title", 0.1)}` : "none"};
`;
