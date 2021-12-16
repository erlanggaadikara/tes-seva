import React, { useState } from "react";
import styled from "styled-components";
import { colors, transparent } from "styles/colors";
import {
  CarRecommendation,
  CarRecommendationResponse,
  NewFunnelCarVariantDetails,
  NewFunnelLoanPermutations,
  NewFunnelLoanPermutationsResponse,
  Params,
} from "types/types";
import { useTranslation } from "react-i18next";
import { AxiosResponse } from "axios";
import { handleProgressUpdate } from "component/loading/loadingUtils";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { EditState } from "models/models";
import {
  getNewFunnelLoanPermutations,
  getNewFunnelRecommendations,
} from "services/newFunnel";
import { Loading } from "component/loading/Loading";
import { LoanCalculatorImg } from "pages/NewFunnelLoanCalculatorPage/images/LoanCalculatorImg";
import { AdditionalInformationFields } from "./AdditionalInformationFields";
import { useParams } from "react-router";

export interface EditHeaderProps {
  carVariantDetails?: NewFunnelCarVariantDetails;
  defaultEditState?: EditState;
  onEditStateChange?: (state: EditState) => void;
  onRecommendationsResults: (data: CarRecommendation[] | []) => void;
  onLoanPermutationsBack: (data: NewFunnelLoanPermutations[] | []) => void;
}

export const EditLoanAdditionalInfo = ({
  carVariantDetails,
  onRecommendationsResults,
  defaultEditState = EditState.Open,
  onEditStateChange,
  onLoanPermutationsBack,
}: EditHeaderProps) => {
  const { t } = useTranslation();
  const { totalIncome, age: ageData } = useContextSurveyFormData();
  const [isOpenFullEdit, setIsOpenFullEdit] = useState<boolean>(
    defaultEditState === EditState.Open
  );
  const [isShowLoading, setShowLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { id } = useParams<Params>();
  const { showToast, RenderToast } = useToast();
  const { funnelQuery } = useFunnelQueryData();

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };

  const handleSubmit = () => {
    setShowLoading(true);
    getNewFunnelLoanPermutations(
      {
        id,
        monthlyIncome: totalIncome?.value as number,
        age: ageData?.value as string,
      },
      { onDownloadProgress: handleProgressUpdate(setProgress) }
    )
      .then((response: AxiosResponse<NewFunnelLoanPermutationsResponse>) => {
        onLoanPermutationsBack(response.data.loanPermutations || []);
        setIsOpenFullEdit(false);
        onEditStateChange && onEditStateChange(EditState.Close);
        resetLoadingState();
        console.log("permutation", response);
      })
      .catch(() => {
        onLoanPermutationsBack([]);
        resetLoadingState();
        showToast();
      });
    const NewFunnelRecommendationsQuery = {
      ...funnelQuery,
      brand: undefined,
    };
    getNewFunnelRecommendations(NewFunnelRecommendationsQuery)
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        onRecommendationsResults(response.data.carRecommendations || []);
      })
      .catch(() => {
        onRecommendationsResults([]);
      });
  };
  return (
    <StyledWrapper isEdit={isOpenFullEdit}>
      {isOpenFullEdit ? (
        <AdditionalInformationFields
          carVariantDetails={carVariantDetails}
          handleSubmit={handleSubmit}
        />
      ) : (
        <AdditionalInformationFields
          carVariantDetails={carVariantDetails}
          handleSubmit={handleSubmit}
        />
      )}
      <Loading
        title={"newFunnelLoanCalculatorPage.editHeader.loadingModal.title"}
        message={"newFunnelLoanCalculatorPage.editHeader.loadingModal.subtitle"}
        isShowLoading={isShowLoading}
        progress={progress}
        masterImage={<LoanCalculatorImg width={"100%"} height={"100%"} />}
      />
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ isEdit: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background: ${({ isEdit }) =>
    isEdit ? transparent("placeholder", 0.25) : colors.primary1};
`;
