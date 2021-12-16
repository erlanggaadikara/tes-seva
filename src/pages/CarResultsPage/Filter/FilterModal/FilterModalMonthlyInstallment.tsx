import React from "react";
import { MonthlyInstallment } from "component/MonthlyInstallment/MonthlyInstallment";
import styled from "styled-components";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { colors } from "styles/colors";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { useTranslation } from "react-i18next";

export const FilterModalMonthlyInstallment = () => {
  const { t } = useTranslation();
  return (
    <>
      <StyledTitle>{t("carResultsPage.filterModal.monthlyTitle")}</StyledTitle>
      <StyledSubtitle>
        {t("carResultsPage.filterModal.monthlySubtitle")}
      </StyledSubtitle>
      <StyledFieldSection>
        <MonthlyInstallment />
      </StyledFieldSection>
    </>
  );
};

const StyledTitle = styled(LinkLabelMediumSemiBold)`
  color: ${colors.title};
  display: block;
  margin-top: 20px;
`;

const StyledSubtitle = styled(LinkLabelLegalSemiBold)`
  color: ${colors.label};
  display: block;
  margin-bottom: 16px;
`;

const StyledFieldSection = styled.section`
  text-align: left;
  margin-bottom: 24px;
`;
