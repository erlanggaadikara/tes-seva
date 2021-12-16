import React, { HTMLAttributes } from "react";
import styled from "styled-components";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  icon: JSX.Element;
  width: string;
  height: string;
  borderRadius: string;
}

export const ButtonWithCenterTextAndIconTail = ({
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
      </StyledContentContainer>
      <StyledIconContainer>{icon}</StyledIconContainer>
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
  background: ${colors.primary2};
  border-radius: ${({ borderRadius }) => borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
`;
const StyledText = styled(LinkLabelSmallSemiBold)`
  color: ${colors.title};
  display: inline-block;
  margin-right: 7px;
`;
const StyledContentContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledIconContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${colors.body};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 13px;
`;
