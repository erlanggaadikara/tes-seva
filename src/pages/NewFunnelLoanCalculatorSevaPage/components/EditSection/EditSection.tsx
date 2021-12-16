import React from "react";
import styled from "styled-components";
import { MiniVariantDetail } from "./MiniVariantDetail";
import { NewFunnelCarVariantDetails } from "types/types";
import { LinkLabelMediumSemiBoldStyle } from "components/typography/LinkLabelMediumSemiBold";
import { useTranslation } from "react-i18next";

interface EditSectionProps {
  carVariantDetails?: NewFunnelCarVariantDetails;
}

export const EditSection = ({ carVariantDetails }: EditSectionProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Header>{t("loanCalculatorPageSeva.editSection.header")}</Header>
      <MiniVariantDetail carVariantDetails={carVariantDetails} />
    </div>
  );
};

const Header = styled.div`
  ${LinkLabelMediumSemiBoldStyle};
  font-size: 28px;
  margin-top: 50px;
  margin-bottom: 30px;

  @media (max-width: 700px) {
    font-size: 20px;
  }
`;
