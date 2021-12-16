import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBoldStyle } from "components/typography/LinkLabelLargeSemiBold";
import { useTranslation } from "react-i18next";
import { TextSmallRegularStyle } from "components/typography/TextSmallRegular";
import { LinkLabelMediumSemiBoldStyle } from "components/typography/LinkLabelMediumSemiBold";
import { ImageCarousel } from "components/ImageSwipe/ImageCarousel";
import { isMobileDevice } from "utils/window";
import { maxPageWidth } from "styles/GlobalStyle";
import { CarModelDetailsResponse, VariantDetail } from "types/types";
import { LinkLabelSmallSemiBoldStyle } from "components/typography/LinkLabelSmallSemiBold";
import { TextLegalMediumStyle } from "components/typography/TextLegalMedium";
import { useFormattedPrice } from "hooks/useFormattedPrice/useFormattedPrice";

interface Props {
  carModel: CarModelDetailsResponse;
  variant: VariantDetail;
  className?: string;
}

export const CarDetail = ({ className, carModel, variant }: Props) => {
  const { t } = useTranslation();
  const [formattedPrice] = useFormattedPrice(variant.priceValue);
  const carouseSizeRatio = 1.4;
  const initCarouseHeight = isMobileDevice
    ? 245
    : parseInt(maxPageWidth) / carouseSizeRatio;
  const [carouseHeight, setCarouseHeight] = useState<number>(initCarouseHeight);

  const getCarouseHeight = () => {
    const screenWidth = document.body.clientWidth;
    setCarouseHeight(
      (screenWidth - parseInt(pagePadding) * 2) / carouseSizeRatio
    );
  };

  useLayoutEffect(() => {
    getCarouseHeight();
  }, [carModel]);

  return (
    <StyledWrapper className={className}>
      <StyledTitle>
        {t("preApprovalProgress.confirm.carInfo.title")}
      </StyledTitle>
      <StyledBrandText>{carModel.brand}</StyledBrandText>
      <StyledModelText>{carModel.model}</StyledModelText>
      <ImageCarousel urls={variant.images} height={carouseHeight} />
      <StyledVariantsText>{variant.name}</StyledVariantsText>
      <StyledTitle>{formattedPrice}</StyledTitle>
      <StyledPriceDesc>
        {t("preApprovalProgress.confirm.carInfo.priceDesc")}
      </StyledPriceDesc>
    </StyledWrapper>
  );
};

const pagePadding = "16px";
const StyledWrapper = styled.div`
  background: ${colors.white};
  padding: 22px 16px 32px;
  text-align: left;
`;

const StyledTitle = styled.p`
  ${LinkLabelLargeSemiBoldStyle};
  color: ${colors.title};
`;

const StyledBrandText = styled.p`
  ${TextSmallRegularStyle};
  margin-top: 18px;
  color: ${colors.label};
`;

const StyledModelText = styled.p`
  ${LinkLabelMediumSemiBoldStyle};
  margin-top: 2px;
  color: ${colors.title};
`;

const StyledVariantsText = styled.p`
  ${LinkLabelSmallSemiBoldStyle};
  color: ${colors.label};
`;

const StyledPriceDesc = styled.p`
  ${TextLegalMediumStyle};
  color: ${colors.placeholder};
`;
