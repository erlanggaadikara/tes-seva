import React from "react";
import styled, { css } from "styled-components";
import { Button, ButtonProps } from "Button/Button";

interface IconButtonProps extends ButtonProps {
  prefixIcon?: () => JSX.Element;
  suffixIcon?: () => JSX.Element;
}

export const IconButton = ({
  prefixIcon,
  suffixIcon,
  className,
  ...restProps
}: IconButtonProps) => {
  return (
    <StyledWrapper {...className}>
      {prefixIcon && <StyledPrefixIcon>{prefixIcon()}</StyledPrefixIcon>}
      <StyledButton {...restProps} />
      {suffixIcon && <StyledSuffixIcon>{suffixIcon()}</StyledSuffixIcon>}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  border-radius: 16px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const IconStyle = css`
  top: 50%;
  transform: translate(0, -50%);
`;
const StyledPrefixIcon = styled.div`
  position: absolute;
  left: 13px;
  ${IconStyle};
`;

const StyledSuffixIcon = styled.div`
  position: absolute;
  right: 13px;
  ${IconStyle};
`;
