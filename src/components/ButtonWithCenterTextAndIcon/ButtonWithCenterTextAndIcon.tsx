import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  icon: JSX.Element;
  width: string;
  height: string;
  borderRadius: string;
}

export const ButtonWithCenterTextAndIcon = ({
  text,
  icon,
  width,
  height,
  borderRadius,
  ...restProps
}: ButtonProps) => {
  const { t } = useTranslation();
  return (
    <StyledButton
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...restProps}
    >
      <StyledContentContainer>
        <StyledText>{t(text)}</StyledText>
        {icon}
      </StyledContentContainer>
    </StyledButton>
  );
};
const StyledButton = styled.div<{
  width: string;
  height: string;
  borderRadius: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: ${colors.primaryDark};
  border-radius: ${({ borderRadius }) => borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const StyledText = styled(TextLegalMedium)`
  color: ${colors.white};
  display: inline-block;
  margin-right: 7px;
`;
const StyledContentContainer = styled.div`
  display: flex;
  align-items: center;
`;
