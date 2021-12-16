import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { MaxWidthStyle } from "styles/MaxWidthStyle";
import {
  Params,
  NewFunnelCarVariantDetails,
  CarRecommendation,
  NewFunnelLoanPermutations,
} from "types/types";
import { useContextCarVariantDetails } from "context/carVariantDetailsContext/carVariantDetailsContext";
import { getCarVariantDetailsById } from "services/recommendations";
import { AxiosResponse } from "axios";
import { EditSection } from "./components/EditSection/EditSection";
import HeaderVariant from "pages/HomePageSeva/Header/Header";
import { ArrowBack } from "components/ArrowBack/ArrowBack";
import {
  LinkLabelMediumSemiBold,
  LinkLabelMediumSemiBoldStyle,
} from "components/typography/LinkLabelMediumSemiBold";
import { useTranslation } from "react-i18next";
import {
  EditState,
  NewFunnelLoanPermutationsKey,
  NewFunnelLoanRank,
} from "models/models";
import { AffordableCarSeva } from "pages/NewFunnelLoanCalculatorSevaPage/components/AffordableCarSeva/AffordableCarSeva";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import {
  defaultNewFunnelLoanData,
  newFunnelLoanNameList,
} from "pages/NewFunnelLoanCalculatorPage/newFunnelLoanCalculatorPage.config";
import {
  tracSelectV2LoanCalculatorEdit,
  tracSelectV2LoanCalculatorValues,
  tracViewV2LoanCalculator,
} from "helpers/amplitude/newLoanCalculatorEventTracking";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { useParams } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import { FBPixelStandardEvent } from "helpers/facebookPixel";
import { trackGALoanCalcPageView } from "helpers/googleAds";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { NewFunnelLoanCalculatorSection } from "./components/AdditionalInformationFields/NewFunnelLoanCalculatorSection";
import { EditLoanAdditionalInfo } from "./components/AdditionalInformationFields/EditLoanAdditionalInfo";
import { PageHeaderSeva } from "pages/component/PageHeaderSeva/PageHeaderSeva";

let currentPermutation: NewFunnelLoanPermutations | null = null;
export default function NewFunnelLoanCalculatorSevaPage() {
  const { t } = useTranslation();

  const { carVariantDetails: defaultCarVariantDetails } =
    useContextCarVariantDetails();
  const [carVariantDetails, setCarVariantDetails] =
    useState<NewFunnelCarVariantDetails>();
  const { id } = useParams<Params>();

  const { setRecommendations } = useContextRecommendations();
  const [newFunnelLoanPermutations, setNewFunnelLoanPermutations] = useState<
    NewFunnelLoanPermutations[]
  >(defaultNewFunnelLoanData);
  const [newFunnelRecommendations, setNewFunnelRecommendations] = useState<
    CarRecommendation[]
  >([]);
  // const mobileViewCustomizeLoan = () => {
  // }
  const getLoanRankByEditState = (state: EditState) => {
    switch (state) {
      case EditState.Close:
        return NewFunnelLoanRank.Red;
      case EditState.Open:
      default:
        return NewFunnelLoanRank.Grey;
    }
  };
  const [editState, setEditState] = useState<EditState>(EditState.Open);
  const [loanRank, setLoanRank] = useState<NewFunnelLoanRank>(
    NewFunnelLoanRank.Grey
  );

  useAmplitudePageView(() => {
    trackGALoanCalcPageView();
    ReactPixel.track(FBPixelStandardEvent.LoanCalcView);
  });
  useEffect(() => {
    if (defaultCarVariantDetails) {
      setCarVariantDetails({
        modelDetail: defaultCarVariantDetails.modelDetail,
        variantDetail: defaultCarVariantDetails.variantDetail,
      });
    }
    getCarVariantDetailsById(id).then(
      (response: AxiosResponse<NewFunnelCarVariantDetails>) => {
        setCarVariantDetails(response.data);
      }
    );
  }, []);

  const onEditStateChange = (state: EditState) => {
    setEditState(state);
    if (state === EditState.Open) {
      const evenTrackingValue = extractLoanInfoForEventTrackingUse();
      if (evenTrackingValue) {
        tracSelectV2LoanCalculatorEdit(evenTrackingValue);
      }
    }
  };
  const onRecommendationsResults = (data: CarRecommendation[]) => {
    if (!data || data.length < 0) {
      return;
    }
    setNewFunnelRecommendations(
      data.filter((item) => item.loanRank === NewFunnelLoanRank.Red)
    );
    setRecommendations(data);
  };

  const formValue = useContextSurveyFormData();
  const { age, totalIncome } = formValue;

  const onCurrentPermutationChanged = (
    permutation: NewFunnelLoanPermutations
  ) => {
    currentPermutation = permutation;
    const loanRank = permutation[
      NewFunnelLoanPermutationsKey.LoanRank
    ] as NewFunnelLoanRank;
    setLoanRank(loanRank);
    const evenTrackingValue = extractLoanInfoForEventTrackingUse();
    if (evenTrackingValue) {
      if (!!permutation.isDefault) {
        tracViewV2LoanCalculator(evenTrackingValue);
      } else {
        tracSelectV2LoanCalculatorValues(evenTrackingValue);
      }
    }
  };
  const extractLoanInfoForEventTrackingUse = () => {
    return currentPermutation
      ? {
          loanRank,
          income: Number(totalIncome?.value),
          age: String(age?.value) ?? "",
          monthlyInstallments: currentPermutation.monthlyInstallment,
          downPayment: currentPermutation.dpAmount,
          tenure: currentPermutation.tenure,
        }
      : null;
  };
  return (
    <>
      <MaxWidthStyle />
      <PageHeaderSeva>
        <HeaderVariant />
      </PageHeaderSeva>
      <StyledBack>
        <ArrowBack />
      </StyledBack>
      <ContentWrapper>
        <Header>{t("loanCalculatorPageSeva.header")}</Header>
        <LoanCustomiseWrapper>
          <StyledEditSection>
            <EditSection carVariantDetails={carVariantDetails} />
            <EditLoanAdditionalInfo
              onEditStateChange={onEditStateChange}
              carVariantDetails={carVariantDetails}
              onRecommendationsResults={onRecommendationsResults}
              onLoanPermutationsBack={setNewFunnelLoanPermutations}
            />
          </StyledEditSection>
          {carVariantDetails && (
            <NewFunnelLoanCalculatorSection
              carVariantDetails={carVariantDetails}
              loanRank={getLoanRankByEditState(editState)}
              loanNameList={newFunnelLoanNameList}
              data={newFunnelLoanPermutations}
              onCurrentPermutationChanged={onCurrentPermutationChanged}
            />
          )}
          {/* <LoanCalculatorSection /> */}
        </LoanCustomiseWrapper>
        <StyledAffordableCarWrapper>
          {newFunnelRecommendations.length !== 0 && (
            <StyledAffordableCar>
              <StyledAffordableCarTitle>
                {t(
                  `newFunnelLoanCalculatorPage.affordableCar.${
                    loanRank === NewFunnelLoanRank.Red
                      ? "greenRankTitle"
                      : "otherRankTitle"
                  }`
                )}
              </StyledAffordableCarTitle>
              <AffordableCarSeva
                newFunnelRecommendations={newFunnelRecommendations}
              />
            </StyledAffordableCar>
          )}
        </StyledAffordableCarWrapper>
        {/* {mobileViewCustomizeLoan} */}
      </ContentWrapper>
    </>
  );
}

const StyledBack = styled.div`
  background: ${colors.white};
  height: 36px;
  width: 50px;
  position: relative;
  margin-top: 20px;
  margin-left: 40px;

  @media (max-width: 700px) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  padding: 20px 50px 20px;
  @media (max-width: 700px) {
    padding: 20px 10px 20px;
  }
`;

const Header = styled.div`
  ${LinkLabelMediumSemiBoldStyle}
  font-size: 56px;
  margin-top: 30px;
  width: 610px;
  line-height: 64px;
  @media (max-width: 700px) {
    font-size: 32px;
    line-height: 40px;
  }
`;

const LoanCustomiseWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const StyledEditSection = styled.div`
  max-width: 50%;

  @media (max-width: 700px) {
    max-width: 100%;
  }
`;
const StyledAffordableCar = styled.div`
  padding: 0 0 40px;
`;

const StyledAffordableCarTitle = styled(LinkLabelMediumSemiBold)`
  color: ${colors.title};
  display: block;
  margin: 0 0 16px 16px;
`;
const StyledAffordableCarWrapper = styled.div``;
