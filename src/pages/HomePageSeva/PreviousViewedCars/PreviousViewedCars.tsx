import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useParams } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import {
  getCarModelDetailsById,
  handleRecommendationsAndCarModelDetailsUpdate,
} from "services/recommendations";
import { getNewFunnelAllRecommendations } from "services/newFunnel";
import { handleProgressUpdate } from "pages/component/loading/loadingUtils";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import MonthlyIcon from "./images/MonthlyInts.png";
import DpIcon from "./images/Dp.png";
import TenureIcon from "./images/Tenure.png";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import {
  getDpRange,
  getModelPriceRange,
  getMonthlyInstallmentRange,
} from "utils/carModelUtils/carModelUtils";
import { SessionStorageKey } from "models/models";
import { getSessionStorage } from "utils/sessionstorageUtils";
import { TextLegalRegular } from "components/typography/TextLegalRegular";
import { H3MediumMedium } from "components/typography/H3MediumMedium";
import Daihatsu from "components/icon/Daihatsu/Daihatsu.png";
import BMW from "components/icon/BMW/BMW.png";
import Toyota from "components/icon/Toyota/Toyota.png";
interface Params {
  id: string;
}
interface CarModelDetail {
  brand: string;
  brandAndModel: string;
  highestAssetPrice: number;
  id: string;
  image: string;
  loanRank: string;
  lowestAssetPrice: number;
  model: string;
  modelAndBrand: string;
  numberOfPopulation: number;
  variants: [];
}
export default function PreviousViewedCar() {
  const { carModelDetails, setCarModelDetails } = useContextCarModelDetails();
  const { id } = useParams<Params>();
  const { showToast, RenderToast } = useToast();
  const { recommendations, setRecommendations } = useContextRecommendations();
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);
  const { currentLanguage } = useCurrentLanguageFromContext();
  const { t } = useTranslation();
  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };
  const modelDetail = getSessionStorage<CarModelDetail[] | null>(
    SessionStorageKey.PreviouslyViewed
  );
  useEffect(() => {
    console.log("car firstr", carModelDetails);
    Promise.all([
      getNewFunnelAllRecommendations({
        onDownloadProgress: handleProgressUpdate(setProgress),
      }),
      getCarModelDetailsById(id),
    ])
      .then(
        handleRecommendationsAndCarModelDetailsUpdate(
          setRecommendations,
          setCarModelDetails
        )
      )
      .then(resetLoadingState)
      .catch(() => {
        resetLoadingState();
        showToast();
      });
    console.log(progress, isShowLoading);
    console.log("recom", recommendations);
    if (modelDetail) {
      console.log("sessions", modelDetail);
    }
    if (carModelDetails) {
      console.log("carModells", carModelDetails);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      {modelDetail && (
        <StyledTitleSection>{t("previousViewedCar.title")}</StyledTitleSection>
      )}
      <StyledContentCard>
        {modelDetail?.map((variant: CarModelDetail) => (
          <StyledCardVariant key={variant.id}>
            <StyledHeaderCardWrapper>
              <StyledImg src={variant.image} />
              {variant.brand === "Daihatsu" ? (
                <StyledIconBrand src={Daihatsu} />
              ) : variant.brand === "BMW" ? (
                <StyledIconBrand src={BMW} />
              ) : (
                <StyledIconBrand src={Toyota} />
              )}
              <StyledLegalText>{variant.brandAndModel}</StyledLegalText>
              <StyledPriceLegalText>
                {`Rp ` + getModelPriceRange(variant) + ` jt`}
              </StyledPriceLegalText>
            </StyledHeaderCardWrapper>
            <StyledSpecificationsWrapper></StyledSpecificationsWrapper>
            <StyledSpecificationsWrapper>
              <StyledSpecificationItem>
                <SyledTextLabelWrapper>
                  <StyledImgItem src={MonthlyIcon} />
                  <StyledTextSmall>
                    {t("previousViewedCar.monthlyIntsallment")}
                  </StyledTextSmall>
                </SyledTextLabelWrapper>
                <StyledLabelPrice>
                  {`Rp ` +
                    getMonthlyInstallmentRange(
                      variant.variants,
                      currentLanguage
                    ) +
                    ` jt`}
                </StyledLabelPrice>
              </StyledSpecificationItem>
              <StyledSpecificationItem>
                <SyledTextLabelWrapper>
                  <StyledImgItem src={DpIcon} />
                  <StyledTextSmall>{t("previousViewedCar.dp")}</StyledTextSmall>
                </SyledTextLabelWrapper>
                <StyledLabelPrice>
                  {`RP ` +
                    getDpRange(variant.variants, currentLanguage) +
                    ` jt`}
                </StyledLabelPrice>
              </StyledSpecificationItem>
              <StyledSpecificationItem>
                <SyledTextLabelWrapper>
                  <StyledImgItem src={TenureIcon} />
                  <StyledTextSmall>
                    {t("previousViewedCar.loan")}
                  </StyledTextSmall>
                </SyledTextLabelWrapper>
                <StyledLabelPrice>
                  {t("previousViewedCar.years")}
                </StyledLabelPrice>
              </StyledSpecificationItem>
            </StyledSpecificationsWrapper>
          </StyledCardVariant>
        ))}
        <RenderToast
          type={ToastType.Error}
          message={t("common.errorMessage")}
        />
      </StyledContentCard>
    </>
  );
}
const GlobalStyle = createGlobalStyle`
  html body {
    max-width: 1440px;
    
  }
`;
const StyledContentCard = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  flex-wrap: wrap;
  position: relative;
`;
const StyledCardVariant = styled.div`
  width: 418px;
  height: 498px;
  border-radius: 16px;
  margin: 0.5%;
  border-radius: 16px;
  background: ${colors.white};
  box-shadow: 0px 1px 16px rgba(3, 24, 56, 0.1);
`;
const StyledHeaderCardWrapper = styled.div`
  background-size: auto;
  background-repeat: no-repeat;
  height: 305px;
  display: flex;
`;
const StyledSpecificationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const StyledSpecificationItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 4%;
  margin-bottom: 4%;
`;
const StyledIconBrand = styled.img`
  width: 50px;
  background: white;
  border-radius: 10px;
  z-index: 9;
  height: 40px;
  position: absolute;
  top: 25vh;
  margin-left: 1vw;
`;
const StyledTitleSection = styled(H3MediumMedium)`
  color: ${colors.title};
  line-height: 36px;
  margin-top: 4vh;
  margin-bottom: 2vh;
  margin-left: 6vw;
`;
const SyledTextLabelWrapper = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  margin-left: 1vw;
`;
const StyledImgItem = styled.img`
  width: 24px;
  height: 24px;
  margin-top: auto;
`;
const StyledImg = styled.img`
  width: 418px;
  position: absolute;
  margin-top: 0.5%;
  top: 0;
  height: 305px;
`;
const StyledPriceLegalText = styled(H3MediumMedium)`
  line-height: 36px;
  color: ${colors.white};
  color: ${colors.white};
  z-index: 1;
  position: absolute;
  top: 27vh;
  margin-left: 6vw;
`;
const StyledLegalText = styled(TextLegalRegular)`
  color: ${colors.white};
  z-index: 1;
  position: absolute;
  top: 24vh;
  margin-left: 6vw;
`;
const StyledLabelPrice = styled(LinkLabelLargeSemiBold)`
  font-weight: 600;
  line-height: 16px;
  margin: auto;
`;
const StyledTextSmall = styled(TextSmallRegular)`
  line-height: 16px;
  margin-left: 2vw;
`;
