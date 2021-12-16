import React from "react";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import styled from "styled-components";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { getModelName } from "utils/carModelUtils/carModelUtils";
import { CarVariantDetails } from "types/types";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { useFormattedPrice } from "hooks/useFormattedPrice/useFormattedPrice";
export const VariantBasicInfo = ({
  modelDetail,
  variantDetail,
}: CarVariantDetails) => {
  const { t } = useTranslation();
  const [formattedPrice] = useFormattedPrice(variantDetail.priceValue);
  const modelName = getModelName(modelDetail);
  return (
    <StyledWrapper>
      <StyledCarSubtitle>{`${modelName}`}</StyledCarSubtitle>
      <H2MediumBold>{variantDetail.name}</H2MediumBold>
      <StyledPrice>
        <LinkLabelSmallSemiBold>{formattedPrice}</LinkLabelSmallSemiBold>
      </StyledPrice>
      <StyledPriceDes>
        <TextLegalMedium>{t("variantDetails.discount")}</TextLegalMedium>
      </StyledPriceDes>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.section`
  padding: 30px 16px 0;
`;
const StyledCarSubtitle = styled(LinkLabelLargeSemiBold)`
  width: 100%;
  color: ${colors.label};
`;
const StyledPrice = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const StyledPriceDes = styled.div`
  width: 100%;
  color: ${colors.placeholder};
`;
