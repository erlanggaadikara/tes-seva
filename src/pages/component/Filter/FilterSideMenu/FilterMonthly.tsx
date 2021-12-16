import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { MonthlyInstallment } from "pages/component/MonthlyInstallment/MonthlyInstallment";

interface FilterMonthlyProps {
  isSideMenuFilter?: boolean;
}

export const FilterMonthly = ({ isSideMenuFilter }: FilterMonthlyProps) => {
  const { t } = useTranslation();
  const isSideMenu = isSideMenuFilter;

  return (
    <Wrapper>
      <StyledTitle>{t("carResultsPage.filterModal.monthlyTitle")}</StyledTitle>
      <StyledSpacing />
      <MonthlyInstallment isSideMenuFilter={isSideMenu} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
  display: block;
  margin-top: 20px;
`;

const StyledSpacing = styled.div`
  height: 10px;
`;
