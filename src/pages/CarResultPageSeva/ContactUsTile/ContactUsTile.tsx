import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import image from "pages/CarResultPageSeva/images/contact-us.png";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { useContactUsModal } from "components/ContactUsModal/ContactUsModal";
import { useDialogModal } from "components/DialogModal/DialogModal";

export const ContactUsTile = () => {
  const { t } = useTranslation();
  const { ContactUsModal, showModal } = useContactUsModal();
  const { DialogModal, showModal: showDialogModal } = useDialogModal();

  return (
    <StyledContainer>
      <StyledContentInformation>
        <StyledTitle>{t("carResultsPage.questionTitle")}</StyledTitle>
        <StyledSubtitleText>
          {t(`carResultsPage.questionSubtitle`)}
        </StyledSubtitleText>
        <StyledFindOutMoreButton onClick={showModal}>
          {t(`carResultsPage.contactUs`)}
        </StyledFindOutMoreButton>
      </StyledContentInformation>
      <StyledContactUs>
        <StyledImage src={image} />
      </StyledContactUs>
      <ContactUsModal
        title={t("carResultsPage.questionTitle")}
        onSubmitSuccess={showDialogModal}
      />
      <DialogModal
        title={t("homePageSearch.advisor.thanksTitle")}
        desc={t("homePageSearch.advisor.thanksDesc")}
        confirmButtonText={t("homePageSearch.advisor.alertButton")}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  background-color: ${colors.primary1};
  box-shadow: 0px 1px 16px rgba(3, 24, 56, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: space-evenly;
  align-items: center;
  padding: 0px;
`;
const StyledContactUs = styled.div`
  display: flex;
  align-items: flex-end;
  @media (max-width: 769px) {
    align-items: center;
    justify-content: center;
  }
`;

const StyledImage = styled.img`
  width: 73%;
  height: auto;
`;

const StyledContentInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 769px) {
    width: 50%;
    padding: 0;
  }
  padding: 20px;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.white};
  font-size: 30px;
  margin: 5px 0;
  width: 100%;
  @media (max-width: 769px) {
    text-align: center;
  }
`;

const StyledSubtitleText = styled(LinkLabelLegalSemiBold)`
  color: ${colors.white};
  font-size: 15px;
  margin: 5px 0;
  max-width: 100%;
  line-height: 1.5;
  @media (max-width: 769px) {
    text-align: center;
  }
`;

const StyledFindOutMoreButton = styled.button`
  padding: 0 40px;
  height: 50px;
  background-color: ${colors.error};
  color: ${colors.white};
  border-radius: 16px;
  border: none;
  margin: 10px 0;
  @media (max-width: 769px) {
    width: 100%;
  }
`;
