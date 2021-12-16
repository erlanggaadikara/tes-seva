import React from "react";
import { H2MediumBold } from "components/typography/H2MediumBold";
import styled from "styled-components";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { getModelName } from "utils/carModelUtils/carModelUtils";
import { CarVariantDetails } from "types/types";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useFormattedPrice } from "hooks/useFormattedPrice/useFormattedPrice";
export const NewFunnelVariantBasicInfo = ({
  modelDetail,
  variantDetail,
}: CarVariantDetails) => {
  const { t } = useTranslation();
  const [formattedPrice] = useFormattedPrice(variantDetail.priceValue);
  const modelName = getModelName(modelDetail);
  return (
    <StyledWrapper>
      <StyledBrandModel>{`${modelName}`}</StyledBrandModel>
      <H2MediumBold>{variantDetail.name}</H2MediumBold>
      <StyledPrice>{formattedPrice}</StyledPrice>
      <StyledPriceDes>
        <TextLegalMedium>{t("variantDetails.discount")}</TextLegalMedium>
      </StyledPriceDes>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.section`
  padding: 30px 16px 0;
`;
const StyledBrandModel = styled(LinkLabelMediumSemiBold)`
  color: ${colors.label};
`;
const StyledPrice = styled(LinkLabelSmallSemiBold)`
  color: ${colors.title};
  margin-top: 22px;
  display: block;
`;
const StyledPriceDes = styled.div`
  width: 100%;
  color: ${colors.placeholder};
`;
