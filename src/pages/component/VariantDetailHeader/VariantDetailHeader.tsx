import { colors } from "styles/colors";
import { ImageCarousel } from "components/ImageSwipe/ImageCarousel";
import React from "react";
import styled from "styled-components";
import { CarVariantDetails } from "types/types";
import { trackSelectCarResultVariantDetailsThumbnail } from "helpers/amplitude/newFunnelEventTracking";
import { useCarResultParameter } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { trackVariantDetailsEvent } from "VariantDetailsPage/variantDetailsUtils/variantDetailsUtils";

interface VariantDetailHeaderProps {
  carVariantDetails: CarVariantDetails;
}

export const VariantDetailHeader = ({
  carVariantDetails,
}: VariantDetailHeaderProps) => {
  const {
    variantDetail: { images },
  } = carVariantDetails;
  const carResultParameter = useCarResultParameter();
  const onCarouselIndexChange = (currentIndex: number) => {
    if (carVariantDetails) {
      trackVariantDetailsEvent({
        carVariantDetails,
        carResultParameter,
        trackFunction: trackSelectCarResultVariantDetailsThumbnail,
        imageIndex: currentIndex + 1,
      });
    }
  };
  return (
    <StyledHeader>
      {images && (
        <ImageCarousel
          urls={images}
          padding={"0 16px 0 16px"}
          onIndexChange={onCarouselIndexChange}
        />
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 100%;
  background: ${colors.white};
  border-radius: 0 0 16px 16px;
  padding-top: 18px;
  position: relative;
`;
