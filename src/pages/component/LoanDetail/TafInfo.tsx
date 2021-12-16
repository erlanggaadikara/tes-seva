import { AccLogo } from "images/AccLogo/AccLogo";
import { LinkLabelLegalSemiBoldStyle } from "components/typography/LinkLabelLegalSemiBold";
import React from "react";
import { TafLogo } from "images/TafLogo/TafLogo";
import { colors } from "styles/colors";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Props {
  finco?: string;
}
export const TafInfo = ({ finco }: Props) => {
  const { t } = useTranslation();
  return (
    <StyledWrapper>
      <StyledText>{t("preApprovalProgress.confirm.tafText1")}</StyledText>
      <StyledText>{t("preApprovalProgress.confirm.tafText2")}</StyledText>
      <StyledText>{t("preApprovalProgress.confirm.tafText3")}</StyledText>
      <StyledText>{t("newFunnelLoanCalculatorPage.disclaimer")}</StyledText>
      <StyledLogoWrapper>
        {finco === "TAF" && <StyledTafLogo />}
        {finco === "ACC" && <AccLogo />}
      </StyledLogoWrapper>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledText = styled.p`
  ${LinkLabelLegalSemiBoldStyle};
  text-align: left;
  color: ${colors.body};
  margin-top: 8px;
  display: block;
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const StyledTafLogo = styled(TafLogo)`
  margin-left: 16px;
`;
