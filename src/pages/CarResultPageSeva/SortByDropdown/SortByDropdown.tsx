import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useDropdownMenu } from "components/DropdownMenu/DropdownMenu";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { colors } from "styles/colors";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { CarRecommendationResponse } from "types/types";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { toNumber } from "utils/stringUtils";
import { getNewFunnelRecommendations } from "services/newFunnel";
import { AxiosResponse } from "axios";
import { ToastType, useToast } from "components/Toast/Toast";

interface SortByOption {
  key: string;
  value: string;
}

interface SortByProps {
  onChange: (option: SortByOption) => void;
}

export const SortByDropdown = (props: SortByProps) => {
  const { t } = useTranslation();
  const { funnelQuery } = useFunnelQueryData();
  const { setRecommendations } = useContextRecommendations();
  const { DropdownMenu, setDropdownDisplay } = useDropdownMenu();
  const { showToast: showErrorToast, RenderToast: RenderErrorToast } =
    useToast();
  const [errorMsg] = useState<string>(t("common.errorMessage"));
  const [option, setOption] = useState<SortByOption>({
    key: "",
    value: "",
  });

  const SortByOptions: Array<SortByOption> = [
    { key: "highToLow", value: t("carResultPageSeva.sortBy.highToLow") },
    { key: "lowToHigh", value: t("carResultPageSeva.sortBy.lowToHigh") },
  ];

  const handleSuccess = (
    response: AxiosResponse<CarRecommendationResponse>
  ) => {
    setRecommendations(response.data.carRecommendations || []);
    setDropdownDisplay(false);
  };

  const handleError = () => {
    setDropdownDisplay(false);
    showErrorToast();
  };

  const sortCarByOption = (sortKey: string) => {
    const filterCarResult = {
      maxMonthlyInstallments: toNumber(
        funnelQuery.monthlyInstallment as string
      ),
      downPayment: toNumber(funnelQuery.downPaymentAmount as string),
      downPaymentPercentage: funnelQuery.downPaymentPercentage
        ? Number(funnelQuery.downPaymentPercentage) / 100
        : null,
      brands: funnelQuery.brand ? funnelQuery.brand : [],
      sortBy: sortKey,
      ...carResultParameters,
    };
    getNewFunnelRecommendations({ ...funnelQuery, sortBy: sortKey })
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        handleSuccess(response);
      })
      .catch(() => {
        handleError();
      });
  };

  const changeSortBy = (option: SortByOption) => {
    setOption(option);
    props.onChange(option);
    sortCarByOption(option.key);
  };

  const displaySortByMenu = () => setDropdownDisplay(true);

  return (
    <StyledLocaleDropdown>
      <StyledCurrentLocale onClick={displaySortByMenu}>
        <StyledLocaleText>
          {t("carResultPageSeva.sortBy.price")}: {option.value}
        </StyledLocaleText>
        <StyledDownOutlined width={12} height={12} color={colors.title} />
      </StyledCurrentLocale>
      <DropdownMenu>
        {SortByOptions.map((option) => (
          <StyledLocaleItem
            key={option.key}
            onClick={() => changeSortBy(option)}
          >
            <StyledLocaleText>
              {t("carResultPageSeva.sortBy.price")}: {option.value}
            </StyledLocaleText>
          </StyledLocaleItem>
        ))}
      </DropdownMenu>
      <RenderErrorToast type={ToastType.Error} message={errorMsg} />
    </StyledLocaleDropdown>
  );
};

const StyledDownOutlined = styled(DownOutlined)`
  margin-left: 8px;
`;

const StyledLocaleDropdown = styled.div`
  position: relative;
  box-shadow: 0px 1px 12px rgba(7, 7, 7, 0.1);
  border-radius: 16px;
  margin-left: 20px;
`;

const StyledLocaleItem = styled.div`
  display: flex;
  height: 48px;
  width: 192px;
  align-items: center;
  padding: 16px;
  :hover {
    cursor: pointer;
    background-color: #5cc9fc;
  }
`;

const StyledCurrentLocale = styled(StyledLocaleItem)`
  height: 100%;
  width: auto;
  :hover {
    background-color: unset;
  }
`;
const StyledLocaleText = styled(TextLegalMedium)`
  margin-left: 8px;
`;
