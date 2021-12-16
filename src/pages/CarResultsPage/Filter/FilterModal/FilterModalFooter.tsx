import React, { useState } from "react";
import { Button, ButtonType } from "components/Button/Button";
import { Footer } from "components/Footer/Footer";
import { getNewFunnelRecommendations } from "services/newFunnel";
import { AxiosResponse } from "axios";
import { CarRecommendationResponse } from "types/types";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import { trackFilterCarResults } from "helpers/amplitude/newFunnelEventTracking";
import { useCarResultParameter } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { toNumber } from "utils/stringUtils";

interface FilterModalFooterProps {
  hideFilterModal: () => void;
  onSubmitClick?: () => void;
}

export const FilterModalFooter = ({
  hideFilterModal,
  onSubmitClick,
}: FilterModalFooterProps) => {
  const { t } = useTranslation();
  const { funnelQuery } = useFunnelQueryData();
  const { setRecommendations } = useContextRecommendations();
  const carResultParameters = useCarResultParameter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg] = useState<string>(t("common.errorMessage"));
  const { showToast: showErrorToast, RenderToast: RenderErrorToast } =
    useToast();

  const handleSuccess = (
    response: AxiosResponse<CarRecommendationResponse>
  ) => {
    setRecommendations(response.data.carRecommendations || []);
    setLoading(false);
    hideFilterModal();
  };

  const handleError = () => {
    setLoading(false);
    showErrorToast();
  };

  const onClick = () => {
    setLoading(true);

    const filterCarResult = {
      maxMonthlyInstallments: toNumber(
        funnelQuery.monthlyInstallment as string
      ),
      downPayment: toNumber(funnelQuery.downPaymentAmount as string),
      downPaymentPercentage: funnelQuery.downPaymentPercentage
        ? Number(funnelQuery.downPaymentPercentage) / 100
        : null,
      brands: funnelQuery.brand ? funnelQuery.brand : [],
      ...carResultParameters,
    };
    trackFilterCarResults(filterCarResult);
    getNewFunnelRecommendations(funnelQuery)
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        handleSuccess(response);
      })
      .catch(() => {
        handleError();
      });
    onSubmitClick && onSubmitClick();
  };
  return (
    <Footer>
      <Button
        width="100%"
        buttonType={ButtonType.primary1}
        onClick={onClick}
        loading={loading}
      >
        {t("carResultsPage.filterModal.button")}
      </Button>
      <RenderErrorToast type={ToastType.Error} message={errorMsg} />
    </Footer>
  );
};
