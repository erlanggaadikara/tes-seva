import React from "react";
import styled from "styled-components";
import { FunnelItemStepAction } from "models/models";
import { Button, ButtonType } from "components/Button/Button";
import { H1LargeBold } from "components/typography/H1LargeBold";
import { colors } from "styles/colors";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";

export type FunnelStepItemProp = {
  image: string;
  step: string;
  title: string;
  subtitle: string;
  buttonType?: {
    action: FunnelItemStepAction;
    title: string;
  };
  imageButton?: JSX.Element;
  onClick?: (action: FunnelItemStepAction) => void;
};

export const FunnelStepItem = ({
  image,
  step,
  title,
  subtitle,
  buttonType,
  imageButton,
  onClick,
}: FunnelStepItemProp) => {
  const getButton = (buttonType: {
    action: FunnelItemStepAction;
    title: string;
  }) => (
    <StyledButtonWrapper>
      <StyledButton
        onClick={() => onClick && onClick(buttonType.action)}
        buttonType={ButtonType.primary1}
        style={{ borderRadius: 10 }}
      >
        <LinkLabelMediumSemiBold>{buttonType.title}</LinkLabelMediumSemiBold>
      </StyledButton>
    </StyledButtonWrapper>
  );

  return (
    <StyledWrapper>
      <StyledHeaderImg src={image} alt={step} />
      <StyledIndex>{step}</StyledIndex>
      <StyledTitle>{title}</StyledTitle>
      {imageButton && <StyledImageButton>{imageButton}</StyledImageButton>}
      <StyledSubtitle>{subtitle}</StyledSubtitle>
      {buttonType && getButton(buttonType)}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 32px 56px 32px;
  :nth-child(even) {
    align-items: flex-start;
    background: ${colors.white};
    text-align: left;
  }
  :nth-child(odd) {
    align-items: flex-end;
    background: ${colors.inputBg};
    text-align: right;
  }
`;
const StyledHeaderImg = styled.img`
  width: 100%;
  height: auto;
  margin-top: 56px;
`;
const StyledIndex = styled(H1LargeBold)`
  margin-top: 4px;
  color: ${colors.placeholder};
`;
const StyledTitle = styled(H1LargeBold)`
  margin-top: 4px;
  color: ${colors.primaryDark};
`;
const StyledImageButton = styled.div`
  margin-top: 8px;
`;
const StyledSubtitle = styled(TextMediumRegular)`
  margin-top: 8px;
  color: ${colors.placeholder};
`;
const StyledButtonWrapper = styled.div`
  margin-top: 18px;
`;
const StyledButton = styled(Button)`
  padding: 0 38px;
`;
