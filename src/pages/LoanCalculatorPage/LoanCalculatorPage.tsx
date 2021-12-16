import React, { useEffect, useState } from "react";
import { LoanCalculator } from "./LoanCalculator/LoanCalculator";
import { CalculateResult } from "./CalculateReault/CalculateReault";
import styled from "styled-components";
import { colors } from "styles/colors";
import { Button, ButtonType } from "components/Button/Button";
import { useTranslation } from "react-i18next";
import { findLoanPermutationByDpAndTenure } from "./LoanCalculator/LoanCalculatorDataProcess";
import {
  useLoanCalculatorData,
  useLoanCalculatorPatch,
} from "context/loanCalculatorContext/loanCalculatorContext";
import {
  LoanRank,
  LocalStorageKey,
  LocationStateKey,
  QueryKeys,
} from "models/models";
import { useQuery } from "hooks/useQuery";
import {
  modelDetailsUrl,
  surveyFormUrl,
  variantDetailsUrl,
} from "routes/routes";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import {
  LoanPermutationResponse,
  useLoanPermutationResponse,
} from "context/loanPermutationContext/loanPermutationContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { AxiosResponse } from "axios";
import { PageTitleSection } from "./PageTitleSection/PageTitleSection";
import { generateQuery } from "utils/httpUtils/httpUtils";
import { getLoanPermutation } from "services/recommendations";
import { setDefaultLoanPermutation } from "./LoanCalculatorUtils";
import { Loading } from "component/loading/Loading";
import { trackSelectLoanCalculator } from "helpers/trackingEvents";
import { handleProgressUpdate } from "component/loading/loadingUtils";

export default function LoanCalculatorPage() {
  const { t } = useTranslation();
  const { Dp, Tenure } = useLoanCalculatorData();
  const { loanPermutationResponse, setLoanPermutationResponse } =
    useLoanPermutationResponse();
  const [loadingTitle, setLoadingTitle] = useState("loadingPage.title");

  const currentLoanPermutation = loanPermutationResponse
    ? findLoanPermutationByDpAndTenure(
        loanPermutationResponse.loanPermutations,
        Dp,
        Tenure
      )
    : undefined;

  const {
    loanRank,
    variantId,
    modelId,
    dpAmount,
    tenure,
  }: {
    loanRank: LoanRank;
    variantId: string;
    modelId: string;
    dpAmount: string;
    tenure: string;
  } = useQuery([
    QueryKeys.LoanRank,
    QueryKeys.VariantId,
    QueryKeys.ModelId,
    QueryKeys.DpAmount,
    QueryKeys.Tenure,
  ]);
  const history = useHistory();
  const [, setCurrentStep] = useLocalStorage<number>(
    LocalStorageKey.CurrentStep,
    0
  );

  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);

  const { showToast, RenderToast } = useToast();
  const patchLoanCalculator = useLoanCalculatorPatch();

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };

  useEffect(() => {
    if (!loanPermutationResponse) {
      setShowLoading(true);
      setLoadingTitle("loanCalculatorPage.loadingPage.title");
      getLoanPermutation(variantId, parseInt(dpAmount), parseInt(tenure), {
        onDownloadProgress: handleProgressUpdate(setProgress),
      })
        .then((response: AxiosResponse<LoanPermutationResponse>) => {
          setLoanPermutationResponse(response.data);
          resetLoadingState();
        })
        .catch(() => {
          resetLoadingState();
          showToast();
        });
    }
  }, []);
  useEffect(() => {
    if (loanPermutationResponse) {
      setDefaultLoanPermutation(
        loanPermutationResponse.loanPermutations,
        patchLoanCalculator
      );
    }
  }, [loanPermutationResponse]);
  const generateDetailsPageUrl = (
    isFromModelPage: boolean,
    shouldChangeDpOrTenure: boolean
  ) => {
    let queryObj = {};
    if (shouldChangeDpOrTenure) {
      queryObj = {
        [QueryKeys.LoanRank]: currentLoanPermutation?.loanRank,
        [QueryKeys.DpAmount]: currentLoanPermutation?.dpAmount,
        [QueryKeys.Tenure]: currentLoanPermutation?.tenure,
        [QueryKeys.MonthlyInstallment]:
          currentLoanPermutation?.monthlyInstallment,
      };
    }
    let pathName = variantDetailsUrl.replace(":id", variantId);
    if (isFromModelPage && modelId) {
      pathName = modelDetailsUrl.replace(":id", modelId);
    }
    const query = generateQuery(queryObj);
    return {
      pathName,
      query,
    };
  };
  const goToVariantDetailsPage = () => {
    const { pathName, query } = generateDetailsPageUrl(false, true);
    currentLoanPermutation && trackSelectLoanCalculator(currentLoanPermutation);
    history.push({
      pathname: pathName,
      search: query,
      state: {
        [LocationStateKey.Reevaluated]: true,
      },
    });
  };
  const getGoBackUrl = () => {
    const { pathName, query } = generateDetailsPageUrl(true, false);
    return `${pathName}${query}`;
  };
  const goToCashFlowIncomePage = () => {
    setCurrentStep(6);
    history.push(surveyFormUrl);
  };
  return (
    <StyledSection>
      <StyledPageTitleSection>
        <PageTitleSection
          loanRank={loanRank as LoanRank}
          backUrl={getGoBackUrl()}
        />
      </StyledPageTitleSection>
      <StyledLoanCalculator>
        <LoanCalculator />
      </StyledLoanCalculator>
      <StyledBottomSection>
        <CalculateResult
          monthlyInstallments={
            (currentLoanPermutation &&
              currentLoanPermutation.monthlyInstallment) ||
            0
          }
          loanRank={
            (currentLoanPermutation && currentLoanPermutation.loanRank) ||
            LoanRank.Red
          }
        />
        <StyledButtonWrapper>
          <Button
            width={"100%"}
            buttonType={ButtonType.primary1}
            onClick={goToVariantDetailsPage}
          >
            {t("loanCalculatorPage.selectTheLoan")}
          </Button>
        </StyledButtonWrapper>
        <Button
          buttonType={ButtonType.secondary1}
          width={"100%"}
          onClick={goToCashFlowIncomePage}
        >
          {t("loanCalculatorPage.addMoreIncome")}
        </Button>
      </StyledBottomSection>
      <Loading
        isShowLoading={isShowLoading}
        progress={progress}
        message={loadingTitle}
      />
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </StyledSection>
  );
}
const StyledBottomSection = styled.section`
  padding: 19px 16px;
  background: ${colors.white};
  border-radius: 15px 15px 0 0;
`;
const StyledButtonWrapper = styled.div`
  margin: 40px 0 16px 0;
`;
const StyledPageTitleSection = styled.section`
  width: 100%;
`;
const StyledSection = styled.section`
  height: 100vh;
  background: ${colors.white};
`;
const StyledLoanCalculator = styled.div`
  background: ${colors.inputBg};
`;
