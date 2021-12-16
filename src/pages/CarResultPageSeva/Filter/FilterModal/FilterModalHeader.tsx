import React from "react";
import styled from "styled-components";
import { H1LargeBold } from "components/typography/H1LargeBold";
import { colors } from "styles/colors";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useTranslation } from "react-i18next";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";

export const FilterModalHeader = () => {
  const { t } = useTranslation();
  const { clearFunnelQuery } = useFunnelQueryData();

  const onClick = () => {
    clearFunnelQuery();
  };

  return (
    <StyledHeader>
      <StyledHeaderLeft>
        {t("carResultsPage.filterModal.header")}
      </StyledHeaderLeft>
      <StyledHeaderRight onClick={onClick}>
        {t("carResultsPage.filterModal.reset")}
      </StyledHeaderRight>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 38px 0 4px;
`;

const StyledHeaderLeft = styled(H1LargeBold)`
  display: inline;
  color: ${colors.title};
`;

const StyledHeaderRight = styled(LinkLabelSmallSemiBold)`
  color: ${colors.primary1};
`;
