import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { createGlobalStyle } from "styled-components";
import {
  getCarModelDetailsById,
  handleRecommendationsAndCarModelDetailsUpdate,
} from "services/recommendations";
import { getNewFunnelAllRecommendations } from "services/newFunnel";
import { handleProgressUpdate } from "component/loading/loadingUtils";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import { TextLegalRegular } from "components/typography/TextLegalRegular";
import { H3MediumMedium } from "components/typography/H3MediumMedium";
import Arrow from "./images/Arrow.png";
import Carseat from "./images/Carseat.png";
import Fuel from "./images/Fuel.png";
import Transmission from "./images/Transmission.png";
import MonthlyIcon from "./images/MonthlyInts.png";
import DpIcon from "./images/Dp.png";
import TenureIcon from "./images/Tenure.png";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { Button, ButtonType } from "components/Button/Button";
import { transformToJtWithTargetDecimal } from "utils/numberUtils/numberUtils";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { getRpFormattedPrice } from "utils/translationFormatter";
import { useHistory } from "react-router";
import {
  loginUrl,
  newFunnelLoanCalculatorUrl,
  newFunnelVariantDetailsUrl,
  preApprovalStartUrl,
} from "routes/routes";
import { usePreApprovalIntroModal } from "PreApprovalIntroModal/usePreApprovalIntroModal";
import { isPreApproved } from "pages/preApprovalUitls";
import { LocationStateKey } from "models/models";
import { getToken } from "utils/api";
interface Params {
  id: string;
}

export const VariantOptionsSeva = ({ id }: Params) => {
  const history = useHistory();
  const { showModal: showPreapprovalModal, PreApprovalIntroModal } =
    usePreApprovalIntroModal();
  const { carModelDetails, setCarModelDetails } = useContextCarModelDetails();
  const { showToast, RenderToast } = useToast();
  const { recommendations, setRecommendations } = useContextRecommendations();
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);
  const { currentLanguage } = useCurrentLanguageFromContext();
  const { t } = useTranslation();
  const [showProApprovalButton, setShowProApprovalButton] = useState(false);
  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };
  useEffect(() => {
    console.log("car first", carModelDetails);
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
    console.log("car", carModelDetails);
  }, []);

  const gotoTargetPage = () => {
    if (getToken()) {
      goTopPreApprovalStartPage();
    } else {
      goToLoginPage();
    }
  };

  const goToLoginPage = () => history.push(loginUrl);

  const goTopPreApprovalStartPage = () =>
    history.push({
      pathname: preApprovalStartUrl,
      state: { [LocationStateKey.IsFromLoginPage]: true },
    });

  const onPreApprovalIntroStartButtonClick = () => {
    gotoTargetPage();
  };
  useEffect(() => {
    isPreApproved()
      .then((isPreApproved) => setShowProApprovalButton(!isPreApproved))
      .catch(() => setShowProApprovalButton(true));
  }, []);

  const onInstalmentFreeModalButtonClick = () => {
    if (showProApprovalButton) {
      showPreapprovalModal();
    }
  };
  return (
    <>
      <GlobalStyle />
      <StyledContentCard>
        <TitleWrapper>
          <H3MediumMedium>Variants</H3MediumMedium>
        </TitleWrapper>
        <StyledWrapper>
          {carModelDetails?.variants.map((variant) => (
            <StyledCardVariant key={variant.id}>
              <StyledHeaderCardWrapper>
                <StyledTitleCardWrapper>
                  <StyledTitleCard>
                    <StyledTextLegal>{variant.name}</StyledTextLegal>
                  </StyledTitleCard>
                  <StyledPriceCard>
                    <StyledH3>
                      {getRpFormattedPrice(
                        t,
                        variant.priceValue,
                        currentLanguage
                      )}
                    </StyledH3>
                  </StyledPriceCard>
                </StyledTitleCardWrapper>
                <StyledArrowWrapper>
                  <StyledButton
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(
                        newFunnelVariantDetailsUrl.replace(":id", variant.id)
                      );
                    }}
                  >
                    <StyledImg />
                  </StyledButton>
                </StyledArrowWrapper>
              </StyledHeaderCardWrapper>
              <StyledSpecificationsWrapper>
                <StyledSpecificationItem>
                  <StyledImgItem src={Carseat} />
                  <StyledLabelLarge>
                    {variant.carSeats + " Seater"}
                  </StyledLabelLarge>
                </StyledSpecificationItem>
                <StyledSpecificationItem>
                  <StyledImgItem src={Fuel} />
                  <StyledLabelLarge>{variant.fuelType}</StyledLabelLarge>
                </StyledSpecificationItem>
                <StyledSpecificationItem>
                  <StyledImgItem src={Transmission} />
                  <StyledLabelLarge>{variant.transmission}</StyledLabelLarge>
                </StyledSpecificationItem>
              </StyledSpecificationsWrapper>
              <StyledSpecificationsWrapper>
                <StyledSpecificationItem>
                  <StyledImgItem src={MonthlyIcon} />
                  <StyledTextSmall>Monthly instal.</StyledTextSmall>
                  <StyledLabelPrice>
                    {transformToJtWithTargetDecimal(
                      variant.monthlyInstallment,
                      currentLanguage
                    )}
                  </StyledLabelPrice>
                </StyledSpecificationItem>
                <StyledSpecificationItem>
                  <StyledImgItem src={DpIcon} />
                  <StyledTextSmall>Downpayment</StyledTextSmall>
                  <StyledLabelPrice>
                    {transformToJtWithTargetDecimal(
                      variant.dpAmount,
                      currentLanguage
                    )}
                  </StyledLabelPrice>
                </StyledSpecificationItem>
                <StyledSpecificationItem>
                  <StyledImgItem src={TenureIcon} />
                  <StyledTextSmall>Tenure</StyledTextSmall>
                  <StyledLabelPrice>{variant.tenure}</StyledLabelPrice>
                </StyledSpecificationItem>
              </StyledSpecificationsWrapper>
              <StyledButtonCardWrapper>
                <Button
                  width={"40%"}
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(
                      newFunnelLoanCalculatorUrl.replace(":id", variant.id)
                    );
                  }}
                  buttonType={ButtonType.primary1}
                >
                  Calculate credit
                </Button>
                <Button
                  width={"40%"}
                  onClick={onInstalmentFreeModalButtonClick}
                  buttonType={ButtonType.secondary3}
                >
                  Online credit
                </Button>
              </StyledButtonCardWrapper>
            </StyledCardVariant>
          ))}
        </StyledWrapper>
        <PreApprovalIntroModal
          onPositiveButtonClick={onPreApprovalIntroStartButtonClick}
        />
        <RenderToast
          type={ToastType.Error}
          message={t("common.errorMessage")}
        />
      </StyledContentCard>
    </>
  );
};
const GlobalStyle = createGlobalStyle`
  html body {
    max-width: 1440px;
    
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 2vw;
  margin-right: 2vw;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;
const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 16px;
  background: ${colors.white};

  ::-webkit-scrollbar {
    display: none;
  }
`;
const StyledContentCard = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const StyledCardVariant = styled.div`
  width: 418px;
  height: 448px;
  border-radius: 16px;
  flex: 0 0 auto;
  margin-right: 20px;
  :last-child {
    padding-right: 16px;
  }
  margin: 0.5%;
  background: ${colors.white};
  box-shadow: 0px 1px 16px rgba(3, 24, 56, 0.1);
`;
const StyledHeaderCardWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid lightgrey;
`;
const StyledTitleCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5%;
  margin-left: 5%;
  margin-bottom: 5%;
`;
const StyledPriceCard = styled.div`
  width: 225px;
  height; 24px;
`;
const StyledTitleCard = styled.div`
  width: 284px;
  height: 38px;
`;
const StyledArrowWrapper = styled.div`
  width: 24px;
  height: 24px;
  margin: 5%;
`;
const StyledSpecificationsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  border-bottom: 1px solid lightgrey;
`;
const StyledSpecificationItem = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 128px;
  height: 75px;
  margin-top: 4%;
  margin-bottom: 4%;
`;
const StyledButtonCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 4%;
  margin-bottom: 4%;
`;
const StyledTextLegal = styled(TextLegalRegular)`
  line-height: 24px;
`;
const StyledH3 = styled(H3MediumMedium)`
  line-height: 36px;
`;
const StyledButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  :focus {
    outline: none !important;
  }
`;
const StyledImg = styled.img.attrs({
  src: Arrow,
})` cursor: pointer;
src`;

const StyledImgItem = styled.img`
  width: 24px;
  height: 24px;
  margin: auto;
`;
const StyledLabelLarge = styled(LinkLabelLargeSemiBold)`
  font-weight: 500;
  line-height: 18px;
  margin: auto;
`;

const StyledLabelPrice = styled(LinkLabelLargeSemiBold)`
  font-weight: 600;
  line-height: 16px;
  margin: auto;
`;
const StyledTextSmall = styled(TextSmallRegular)`
  line-height: 16px;
  margin: auto;
`;
