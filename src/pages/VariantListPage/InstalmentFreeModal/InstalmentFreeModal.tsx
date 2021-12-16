import React from "react";
import styled from "styled-components";
import { useModal } from "components/Modal/Modal";
import { Button, ButtonType } from "components/Button/Button";
import { maxPageWidth } from "styles/GlobalStyle";
import { colors } from "styles/colors";
import { Close } from "components/icon/Close/Close";
import { AstraRoundedLogo } from "components/icon/AstraRoundedLogo/AstraRoundedLogo";
import background from "./images/modalBg.png";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { TextLegalSmallRegular } from "components/typography/TextLegalSmallRegular";
import { useTranslation } from "react-i18next";

type InstalmentFreeModalProps = {
  buttonTitle?: string;
  onButtonClick?: () => void;
};

export const useInstalmentFreeModal = () => {
  const { showModal, hideModal, RenderModal } = useModal();
  const { t } = useTranslation();

  const InstalmentFreeModal = ({
    buttonTitle,
    onButtonClick,
  }: InstalmentFreeModalProps) => {
    const onClickOK = () => {
      onButtonClick ? onButtonClick() : hideModal();
    };
    const onClickCancel = () => hideModal();

    return (
      <RenderModal blur={"22.8438px"}>
        <StyledContainer>
          <StyledContent>
            <StyledTopHalfWrapper>
              <StyledCloseIcon onClick={onClickCancel}>
                <Close color={colors.white} />
              </StyledCloseIcon>
              <AstraRoundedLogo />
              <StyledTitle>
                {t("variantDetails.instalmentFreeModal.title")}
              </StyledTitle>
            </StyledTopHalfWrapper>
            <StyledBottomHalfWrapper>
              <StyledDesc>
                {t("variantDetails.instalmentFreeModal.desc")}
              </StyledDesc>
              <StyledTCTitle>
                {t("variantDetails.instalmentFreeModal.tc")}
              </StyledTCTitle>
              <div>
                <StyledLegalText>
                  {t("variantDetails.instalmentFreeModal.rule1")}
                </StyledLegalText>
                <StyledLegalText>
                  {t("variantDetails.instalmentFreeModal.rule2")}
                </StyledLegalText>
                <StyledLegalText>
                  {t("variantDetails.instalmentFreeModal.rule3")}
                </StyledLegalText>
              </div>
              <StyledButton
                buttonType={ButtonType.primary1}
                onClick={onClickOK}
              >
                {buttonTitle ??
                  t("variantDetails.instalmentFreeModal.pickACar")}
              </StyledButton>
            </StyledBottomHalfWrapper>
          </StyledContent>
        </StyledContainer>
      </RenderModal>
    );
  };

  return { InstalmentFreeModal, hideModal, showModal };
};

const StyledContainer = styled.div`
  width: ${maxPageWidth};
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 0 16px;
`;

const StyledContent = styled.div`
  border-radius: 16px;
  text-align: center;
  padding: 20px 24px 10px;
  margin: 0 auto;
  background: url(${background}) no-repeat center;
  background-size: cover;
  height: 80vh;
  width: 343px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-height: 464px;
`;
const StyledTopHalfWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 40%;
`;

const StyledBottomHalfWrapper = styled(StyledTopHalfWrapper)`
  height: 60%;
  padding-top: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.white};
  margin-top: 10px;
`;

const StyledDesc = styled(LinkLabelSmallSemiBold)`
  color: ${colors.title};
`;

const StyledTCTitle = styled(LinkLabelSmallSemiBold)`
  color: ${colors.label};
`;

const StyledLegalText = styled(TextLegalSmallRegular)`
  color: ${colors.label};
  display: block;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 12px;
`;

const StyledCloseIcon = styled.div`
  display: flex;
  align-self: flex-end;
`;
