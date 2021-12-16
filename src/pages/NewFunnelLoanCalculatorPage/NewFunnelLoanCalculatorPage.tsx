import React, { useEffect, useState } from "react";
import { EditState, NewFunnelLoanRank, LocalStorageKey } from "models/models";
import styled from "styled-components";

import { colors } from "styles/colors";
import { Line } from "components/Line/Line";
import { EditHeader } from "./component/EditHeader/EditHeader";
import { PageHeader } from "component/PageHeader/PageHeader";
import { NewFunnelLoanPermutationsKey } from "models/models";
import { useContextCarVariantDetails } from "context/carVariantDetailsContext/carVariantDetailsContext";
import {
  CarRecommendation,
  NewFunnelCarVariantDetails,
  NewFunnelLoanPermutations,
  Params,
  CarVariantLoan,
} from "types/types";
import { useParams, useHistory } from "react-router-dom";
import { getCarVariantDetailsById } from "services/recommendations";
import { AxiosResponse } from "axios";
import { ArrowBack2 } from "components/ArrowBack/ArrowBack2";
import { AffordableCarList } from "./component/AffordableCarList/AffordableCarList";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { useTranslation } from "react-i18next";
import { NewFunnelLoanCalculatorSection } from "./NewFunnelLoanRank/NewFunnelLoanCalculatorSection";
import {
  defaultNewFunnelLoanData,
  newFunnelLoanNameList,
} from "./newFunnelLoanCalculatorPage.config";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import {
  tracViewV2LoanCalculator,
  tracSelectV2LoanCalculatorValues,
  tracSelectV2LoanCalculatorEdit,
} from "helpers/amplitude/newLoanCalculatorEventTracking";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { trackGALoanCalcPageView } from "helpers/googleAds";
import { FBPixelStandardEvent } from "helpers/facebookPixel";
import ReactPixel from "react-facebook-pixel";
import { useNewLoanPermutation } from "context/newLoanPermutationContext/newLoanPermutationContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { variantListUrl } from "routes/routes";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";

let currentPermutation: NewFunnelLoanPermutations | null = null;
export default function NewFunnelLoanCalculatorPage() {
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
  const { showToast, RenderToast } = useToast();
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const [selectedLoanDetails] = useLocalStorage<CarVariantLoan | null>(
    LocalStorageKey.SelectedLoan,
    null
  );

  const getLoanRankByEditState = (state: EditState) => {
    switch (state) {
      case EditState.Close:
        return NewFunnelLoanRank.Green;
      case EditState.Open:
      default:
        return NewFunnelLoanRank.Grey;
    }
  };
  const [editState, setEditState] = useState<EditState>(EditState.Open);
  const [loanRank, setLoanRank] = useState<NewFunnelLoanRank>(
    NewFunnelLoanRank.Grey
  );
  const { setSelectedNewLoanPermutation } = useNewLoanPermutation();

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
        setDisable(false);
        if (response.data.variantDetail.priceValue == null) {
          showToast();
          setDisable(true);
        }
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
      data.filter((item) => item.loanRank === NewFunnelLoanRank.Green)
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
    setSelectedNewLoanPermutation(permutation);
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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    history.push(variantListUrl.replace(":id", selectedLoanDetails.modelId));
  };

  return (
    <StyledWrapper>
      <PageHeader />
      <Line width={"100%"} height={"1px"} background={colors.line} />
      <StyledBack onClick={handleClick}>
        <ArrowBack2 />
      </StyledBack>
      <EditHeader
        onEditStateChange={onEditStateChange}
        carVariantDetails={carVariantDetails}
        onRecommendationsResults={onRecommendationsResults}
        onLoanPermutationsBack={setNewFunnelLoanPermutations}
        disableCalculateLoan={disable}
      />
      {carVariantDetails && (
        <NewFunnelLoanCalculatorSection
          carVariantDetails={carVariantDetails}
          loanRank={getLoanRankByEditState(editState)}
          loanNameList={newFunnelLoanNameList}
          data={newFunnelLoanPermutations}
          onCurrentPermutationChanged={onCurrentPermutationChanged}
        />
      )}
      {newFunnelRecommendations.length !== 0 && (
        <StyledAffordableCar>
          <StyledAffordableCarTitle>
            {t(
              `newFunnelLoanCalculatorPage.affordableCar.${
                loanRank === NewFunnelLoanRank.Green
                  ? "greenRankTitle"
                  : "otherRankTitle"
              }`
            )}
          </StyledAffordableCarTitle>
          <AffordableCarList
            newFunnelRecommendations={newFunnelRecommendations}
          />
        </StyledAffordableCar>
      )}
      <RenderToast
        type={ToastType.Error}
        message={"Varian ini belum tersedia di kotamu"}
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  background: ${colors.offWhite};
  min-height: 100vh;
  position: relative;
`;
const StyledBack = styled.div`
  background: ${colors.white};
  height: 36px;
  position: relative;
`;
const StyledAffordableCar = styled.div`
  padding: 0 0 40px;
`;
const StyledAffordableCarTitle = styled(LinkLabelMediumSemiBold)`
  color: ${colors.title};
  display: block;
  margin: 0 0 16px 16px;
`;
