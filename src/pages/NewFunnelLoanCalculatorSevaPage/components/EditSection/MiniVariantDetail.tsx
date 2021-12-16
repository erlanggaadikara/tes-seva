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
  flex-direction: column;

  @media (max-width: 700px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;
const StyledImg = styled.img`
  border-radius: 8px;
  border: transparent;
  margin: auto 16px;

  @media (max-width: 700px) {
    width: ${ratio * 1.25 * 100}%;
    height: ${ratio * 100}%;
  }
`;

const StyledContent = styled.div`
  padding: 16px 16px 0px;

  @media (max-width: 700px) {
    padding: 0px;
    margin: auto 0;
  }
`;

const StyledBrand = styled.div`
  ${TextLegalSemiBoldStyle};
  color: ${colors.label};
  margin-bottom: 10px;
  font-size: 16px;

  @media (max-width: 700px) {
    margin-bottom: 0px;
    font-size: 12px;
  }
`;

const StyledModel = styled.div`
  ${TextMediumRegularStyle};
  font-size: 24px;
  color: ${colors.title};
  margin-bottom: 10px;

  @media (max-width: 700px) {
    margin-bottom: 0px;
    font-size: 16px;
  }
`;

const StyledVariantName = styled.div`
  ${TextSmallRegular};
  color: ${colors.title};
  margin-bottom: 10px;
  font-size: 20px;

  @media (max-width: 700px) {
    margin-bottom: 0px;
    font-size: 14px;
  }
`;

const StyledPrice = styled.div`
  ${LinkLabelMediumSemiBoldStyle};
  color: ${colors.title};
  font-size: 24px;

  @media (max-width: 700px) {
    margin-bottom: 0px;
    font-size: 16px;
  }
`;
