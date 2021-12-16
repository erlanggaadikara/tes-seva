import React, { useEffect, useState } from "react";
import { FormControlValue } from "types/types";
import { FunnelQueryKey } from "models/models";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { Select } from "components/form/Select/Select";
import { downPaymentPercentageConfig } from "./downPaymentPercentage.config";
import { getNewFunnelRecommendations } from "services/newFunnel";
import { AxiosResponse } from "axios";
import { CarRecommendationResponse } from "types/types";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { toNumber } from "utils/stringUtils";
import { useTranslation } from "react-i18next";

interface DownPaymentPercentageProps {
  isSideMenuFilter?: boolean;
}

export const DownPaymentPercentage = ({
  isSideMenuFilter,
}: DownPaymentPercentageProps) => {
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData();
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(
    funnelQuery.downPaymentPercentage
  );
  const { t } = useTranslation();
  const { setRecommendations } = useContextRecommendations();
  const [errorMsg] = useState<string>(t("common.errorMessage"));
  const paramQuery = funnelQuery;

  const handleOnChange = (optionValue: FormControlValue) => {
    setDownPaymentPercentage(optionValue);
    patchFunnelQuery({
      [FunnelQueryKey.DownPaymentPercentage]: optionValue,
    });
    paramQuery.downPaymentPercentage = optionValue;
    if (isSideMenuFilter) {
      immediateFilter();
    }
  };

  useEffect(
    () => setDownPaymentPercentage(funnelQuery.downPaymentPercentage),
    [funnelQuery]
  );

  const handleSuccess = (
    response: AxiosResponse<CarRecommendationResponse>
  ) => {
    setRecommendations(response.data.carRecommendations || []);
  };

  const handleError = () => {
    console.log(errorMsg);
  };

  const immediateFilter = () => {
    // === AMPLITUDE TRACKING ===
    const filterCarResult = {
      maxMonthlyInstallments: toNumber(
        funnelQuery.monthlyInstallment as string
      ),
      downPayment: toNumber(funnelQuery.downPaymentAmount as string),
      downPaymentPercentage: funnelQuery.downPaymentPercentage
        ? Number(funnelQuery.downPaymentPercentage) / 100
        : null,
      brands: funnelQuery.brand ? funnelQuery.brand : [],
    };

    getNewFunnelRecommendations(paramQuery)
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        handleSuccess(response);
      })
      .catch(() => {
        handleError();
      });
  };

  return (
    <Select
      value={downPaymentPercentage}
      options={downPaymentPercentageConfig.options}
      name={"downPaymentPercentage"}
      onChoose={handleOnChange}
      suffixIcon={DownOutlined}
    />
  );
};
