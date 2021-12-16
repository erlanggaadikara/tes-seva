import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SectionHeader } from "SectionHeader/SectionHeader";
import PromoPlaceholder1 from "./images/promo1.webp";
import PromoPlaceholder2 from "./images/promo2.webp";
import PromoPlaceholder3 from "./images/promo3.webp";
import PromoPlaceholder1Origin from "./images/promo1.png";
import PromoPlaceholder2Origin from "./images/promo2.png";
import PromoPlaceholder3Origin from "./images/promo3.png";
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import useVisibility from "hooks/useVisibility/useVisibility";
import {
  trackNavigateHomePromos,
  NewHomePageVersion,
} from "helpers/amplitude/newHomePageEventTracking";

const PromoImages = [
  { webp: PromoPlaceholder1, origin: PromoPlaceholder1Origin },
  { webp: PromoPlaceholder2, origin: PromoPlaceholder2Origin },
  { webp: PromoPlaceholder3, origin: PromoPlaceholder3Origin },
];

const PromoImage = (
  { webp, origin }: { webp: string; origin: string },
  index: number
) => {
  const picRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const visibility = useVisibility(picRef, {
    threshold: 1,
  });

  let timer: NodeJS.Timeout | null = null;
  useEffect(() => {
    timer && clearTimeout(timer);
    if (visibility) {
      timer = setTimeout(() => {
        trackNavigateHomePromos(index, NewHomePageVersion.phone);
      }, 1000);
    }
  }, [visibility]);

  return (
    <div ref={picRef} key={index}>
      <WebpPicture
        src={webp}
        fallbackImage={<StyledImg src={origin} alt="promotion image" />}
      />
    </div>
  );
};

export const PromotionSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <SectionHeader text={t("homePageSearch.promotion.title")} />
      <StyledContainer>
        {PromoImages.map((img, index) => PromoImage(img, index))}
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 30px;
  padding-left: 8px;
  padding-right: 8px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledImg = styled.img`
  width: 304px;
  height: 160px;
  margin: 0 8px;
`;
