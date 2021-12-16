import React, { HTMLAttributes, MouseEventHandler } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { screenWidth, maxPageWidthNumber } from "styles/GlobalStyle";
import { colors } from "styles/colors";
import { ZIndex } from "styles/zIndex";
import { ArrowLeftOutlined } from "components/icon/ArrowLeftOutlined/ArrowLeftOutlined";

interface FloatingBackButtonProps extends HTMLAttributes<HTMLDivElement> {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const FloatingBackButton = ({
  onClick,
  ...restProps
}: FloatingBackButtonProps) => {
  const history = useHistory();

  return (
    <StyledBack onClick={onClick ?? history.goBack} {...restProps}>
      <ArrowLeftOutlined width={24} height={24} color={colors.primary1} />
    </StyledBack>
  );
};

const pageLeftPadding = Math.max((screenWidth - maxPageWidthNumber) / 2, 0) + 8;
const StyledBack = styled.div`
  position: fixed;
  top: 8px;
  left: ${pageLeftPadding}px;
  padding: 10px;
  background: ${colors.white};
  box-shadow: 0px 1px 16px rgba(3, 24, 56, 0.1);
  border-radius: 8px;
  z-index: ${ZIndex.Appbar};
`;
