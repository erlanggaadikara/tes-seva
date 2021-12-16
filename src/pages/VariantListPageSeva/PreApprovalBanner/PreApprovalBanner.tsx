import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { Button } from "components/Button/Button";
import image from "image/astra-logo.png";
import background from "image/preapproval-background.png";
import { useInstalmentFreeModal } from "pages/VariantListPage/InstalmentFreeModal/InstalmentFreeModal";

export const PreApprovalBanner = () => {
  const { t } = useTranslation();
  const { InstalmentFreeModal, showModal: showInstalmentFreeModal } =
    useInstalmentFreeModal();
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledContentInformation>
          <StyledAstraIcon>
            <StyledImage src={image} />
          </StyledAstraIcon>
          <StyledContentText>
            <StyledTitle>
              {t("carResultPageSeva.freeInstallment.title")}
            </StyledTitle>
            <StyledSubtitleText>
              {t("carResultPageSeva.freeInstallment.subtitle")}
            </StyledSubtitleText>
          </StyledContentText>
        </StyledContentInformation>
        <StyledFindOutMoreButton onClick={() => showInstalmentFreeModal()}>
          {t("carResultPageSeva.freeInstallment.button")}
        </StyledFindOutMoreButton>
      </StyledWrapper>
      <InstalmentFreeModal />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  padding: 20px 50px;
  max-width: 90%;
  min-width: 40%;
  @media (max-width: 769px) {
    padding: 20px 0;
    min-width: 90%;
  }
`;

const StyledWrapper = styled.div`
  background-color: ${colors.primary1};
  background-image: url(${background});
  box-shadow: 0px 1px 16px rgba(3, 24, 56, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 30px;
  @media (max-width: 769px) {
    padding: 10px 30px;
  }
`;
const StyledAstraIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const StyledImage = styled.img`
  width: 80%;
  height: auto;
  @media (max-width: 769px) {
    width: 60%;
  }
`;

const StyledContentInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (max-width: 769px) {
    flex-direction: row-reverse;
  }
`;

const StyledContentText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  @media (max-width: 769px) {
    text-align: left;
    width: 70%;
  }
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.white};
  font-size: 30px;
  margin: 5px 0;
  width: 100%;
  @media (max-width: 769px) {
    font-size: 20px;
  }
`;

const StyledSubtitleText = styled(LinkLabelLegalSemiBold)`
  color: ${colors.white};
  font-size: 20px;
  margin: 5px 0;
  max-width: 100%;
  line-height: 1.5;
  @media (max-width: 769px) {
    font-size: 10px;
    line-height: 2;
    width: 80%;
  }
`;

const StyledFindOutMoreButton = styled(Button)`
  height: 50px;
  background-color: ${colors.error};
  color: ${colors.white};
  border-radius: 16px;
  border: none;
  margin: 10px 0;
  width: 100%;
  @media (max-width: 769px) {
    height: 40px;
  }
`;
