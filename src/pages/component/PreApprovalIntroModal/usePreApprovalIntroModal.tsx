import React from "react";
import { useModal } from "components/Modal/Modal";
import { ModalBody } from "components/ModalBodyWrapper/ModalBodyWrapper";
import styled from "styled-components";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { colors } from "styles/colors";
import {
  PreApprovalIntroModalConfig as config,
  PreApprovalStepConfig,
} from "./PreApprovalIntroModal.config";
import { useTranslation } from "react-i18next";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { Close } from "components/icon/Close/Close";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { TextLegalSmallRegular } from "components/typography/TextLegalSmallRegular";
import { Shield } from "components/icon/Shield/Shield";
import { screenSize } from "utils/window";
interface PreApprovalIntroModalProps {
  onPositiveButtonClick: () => void;
  onModalHideClick?: () => void;
}

export const usePreApprovalIntroModal = () => {
  const { t } = useTranslation();
  const { showModal, hideModal, RenderModal } = useModal();

  const renderStepItem = (stepConfig: PreApprovalStepConfig, index: number) => (
    <StyledStepItemWrapper key={index}>
      <StyledStepIndex>{index + 1}</StyledStepIndex>
      <>
        <StyledStepIconWrapper>
          {stepConfig.icon}
          {stepConfig.checkmark}
        </StyledStepIconWrapper>
        <StyledStepText>{t(stepConfig.text)}</StyledStepText>
      </>
    </StyledStepItemWrapper>
  );

  const PreApprovalIntroModal = ({
    onPositiveButtonClick,
    onModalHideClick,
  }: PreApprovalIntroModalProps) => (
    <RenderModal>
      <ModalBody>
        <StyledWrapper>
          <StyledClose
            onClick={() => {
              hideModal();
              onModalHideClick && onModalHideClick();
            }}
          >
            <Close color={colors.primary1} />
          </StyledClose>
          <StyledTitle>{t(config.title)}</StyledTitle>
          <StyledSubtitle>{t(config.subtitle)}</StyledSubtitle>
          <StyledProgressWrapper>
            {config.steps.map(renderStepItem)}
          </StyledProgressWrapper>
          <StyledSecureInfoWrapper>
            <Shield />
            <StyledSecureTextWrapper>
              <StyledSecureInfoTitle>
                {t(config.secureInfoTitle)}
              </StyledSecureInfoTitle>
              <TextLegalSmallRegular>
                {t(config.secureInfoDesc)}
              </TextLegalSmallRegular>
            </StyledSecureTextWrapper>
          </StyledSecureInfoWrapper>
          <StyledPositiveButtonWrapper
            onClick={() => {
              hideModal();
              onPositiveButtonClick();
            }}
          >
            {t(config.positiveButton)}
          </StyledPositiveButtonWrapper>
        </StyledWrapper>
      </ModalBody>
    </RenderModal>
  );
  return { PreApprovalIntroModal, showModal, hideModal };
};
const StyledWrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media (max-width: ${screenSize.mobileS}) {
    padding: 8px;
  }
`;
const StyledClose = styled.div`
  align-self: flex-end;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  margin-top: 16px;
  color: ${colors.title};

  @media (max-width: ${screenSize.mobileS}) {
    margin-top: 8px;
  }
`;
const StyledSubtitle = styled(TextMediumRegular)`
  color: ${colors.label};
  margin-top: 8px;
  margin-bottom: 16px;
`;
const StyledProgressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;
`;

const StyledStepItemWrapper = styled.span`
  position: relative;
  width: 130px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  margin-bottom: 16px;
  background-color: ${colors.inputBg};
  border-radius: 16px;

  @media (max-width: ${screenSize.mobileS}) {
    width: 116px;
    height: 110px;
  }
`;
const StyledStepIndex = styled(LinkLabelMediumSemiBold)`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  text-align: center;
  color: ${colors.primary1};
  background-color: ${colors.primary2};
`;

const StyledStepIconWrapper = styled.div`
  margin-top: 8px;
  position: relative;
`;

const StyledStepText = styled(TextLegalMedium)`
  width: 75%;
  margin-bottom: 16px;
`;

const StyledSecureInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`;

const StyledSecureInfoTitle = styled(TextLegalMedium)`
  color: ${colors.title};
`;

const StyledSecureTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  margin-left: 20px;
  width: 78%;
  color: ${colors.label};
`;

const StyledPositiveButtonWrapper = styled(LinkLabelSmallSemiBold)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  margin-top: 30px;
  margin-bottom: 16px;
  background: ${colors.primary1};
  color: ${colors.white};
  border-radius: 16px;
  :hover {
    cursor: pointer;
  }

  @media (max-width: ${screenSize.mobileS}) {
    margin-top: 10px;
  }
`;
