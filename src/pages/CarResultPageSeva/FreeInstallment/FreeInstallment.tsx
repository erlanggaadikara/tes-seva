import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import image from "pages/CarResultPageSeva/images/car-inject.png";
import { useInstalmentFreeModal } from "pages/VariantListPage/InstalmentFreeModal/InstalmentFreeModal";

export const FreeInstallment = () => {
  const { t } = useTranslation();
  const { InstalmentFreeModal, showModal: showInstalmentFreeModal } =
    useInstalmentFreeModal();
  return (
    <StyledContainer>
      <StyledCarInject>
        <StyledImage src={image} />
      </StyledCarInject>
      <StyledContentInformation>
        <StyledTitle>
          {t("carResultPageSeva.freeInstallment.title")}
        </StyledTitle>
        <StyledSubtitleText>
          {t("carResultPageSeva.freeInstallment.subtitle")}
        </StyledSubtitleText>
        <StyledFindOutMoreButton onClick={() => showInstalmentFreeModal()}>
          {t("carResultPageSeva.freeInstallment.button")}
        </StyledFindOutMoreButton>
      </StyledContentInformation>
      <InstalmentFreeModal />
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
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 15px;
`;
const StyledCarInject = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: 769px) {
    align-items: center;
    justify-content: center;
  }
`;

const StyledImage = styled.img`
  width: 73%;
  height: auto;
  margin-top: 50px;
`;

const StyledContentInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 769px) {
    width: 50%;
  }
  padding: 20px 0;
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
  text-align: center;
  max-width: 100%;
  line-height: 1.5;
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
