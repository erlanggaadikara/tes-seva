import React from "react";
import styled from "styled-components";
import { NewFunnelCarVariantDetails } from "types/types";
import { LinkLabelMediumSemiBoldStyle } from "components/typography/LinkLabelMediumSemiBold";
import { TextMediumRegularStyle } from "components/typography/TextMediumRegular";
import { TextLegalSemiBoldStyle } from "components/typography/TextLegalSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { colors } from "styles/colors";
import { useFormattedPrice } from "hooks/useFormattedPrice/useFormattedPrice";

interface MiniVariantDetailProps {
  carVariantDetails?: NewFunnelCarVariantDetails;
}

export const MiniVariantDetail = ({
  carVariantDetails,
}: MiniVariantDetailProps) => {
  const [formattedPrice] = useFormattedPrice(
    carVariantDetails?.variantDetail.priceValue ?? ""
  );
  return (
    <StyledWrapper>
      <StyledImg
        src={carVariantDetails?.variantDetail.newFunnelMainColorImage}
      />
      <StyledContent>
        <StyledBrand>{carVariantDetails?.modelDetail.brand}</StyledBrand>
        <StyledModel>{carVariantDetails?.modelDetail.model}</StyledModel>
        <StyledVariantName>
          {carVariantDetails?.variantDetail.name}
        </StyledVariantName>
        <StyledPrice>{formattedPrice}</StyledPrice>
      </StyledContent>
    </StyledWrapper>
  );
};

const ratio = 0.27;

const StyledWrapper = styled.div`
  background: ${colors.inputBg};
  border-radius: 16px;
  padding: 16px 0;
  display: flex;
  justify-content: flex-start;
`;
const StyledImg = styled.img`
  width: ${ratio * 1.85 * 100}%;
  height: ${ratio * 100}%;
  border-radius: 8px;
  border: transparent;
  margin: auto 16px;
`;

const StyledContent = styled.div`
  margin: auto 0;
`;

const StyledBrand = styled.div`
  ${TextLegalSemiBoldStyle};
  color: ${colors.label};
  margin-bottom: 4px;
`;

const StyledModel = styled.div`
  ${TextMediumRegularStyle};
  color: ${colors.title};
  margin-bottom: 2px;
`;

const StyledVariantName = styled(TextSmallRegular)`
  color: ${colors.title};
  margin-bottom: 2px;
`;

const StyledPrice = styled.div`
  ${LinkLabelMediumSemiBoldStyle};
  color: ${colors.title};
`;
