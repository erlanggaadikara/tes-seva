import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { CheckedSquareOutlined } from "components/icon/CheckedSquareOutlined/CheckedSquareOutlined";
import { getNewFunnelRecommendations } from "services/newFunnel";
import { AxiosResponse } from "axios";
import { CarRecommendationResponse } from "types/types";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { trackFilterCarResults } from "helpers/amplitude/newFunnelEventTracking";
import { useCarResultParameter } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { toNumber } from "utils/stringUtils";

interface FilterCategoryProps {
  isSideMenuFilter?: boolean;
}

interface CategoryButtonProps {
  key: string;
  value: string;
  isChecked: boolean;
}

export const FilterCategory = ({ isSideMenuFilter }: FilterCategoryProps) => {
  const { t } = useTranslation();
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData();
  const { setRecommendations } = useContextRecommendations();
  const carResultParameters = useCarResultParameter();
  const [errorMsg] = useState<string>(t("common.errorMessage"));
  const { showToast: showErrorToast, RenderToast: RenderErrorToast } =
    useToast();
  const [isCheckedGroups, setIsCheckedGroups] = useState<string[]>(
    funnelQuery.category ? funnelQuery.category : []
  );

  useEffect(() => {
    setIsCheckedGroups(funnelQuery.category ? funnelQuery.category : []);
  }, [funnelQuery]);

  const paramQuery = funnelQuery;

  const categoryList: CategoryButtonProps[] = [
    {
      key: "Family",
      value: "Family",
      isChecked: isCheckedGroups.includes("Family"),
    },
    {
      key: "Adventure",
      value: "Adventure",
      isChecked: isCheckedGroups.includes("Adventure"),
    },
    {
      key: "Work",
      value: "Work",
      isChecked: isCheckedGroups.includes("Work"),
    },
  ];

  const handleSuccess = (
    response: AxiosResponse<CarRecommendationResponse>
  ) => {
    setRecommendations(response.data.carRecommendations || []);
  };

  const handleError = () => {
    showErrorToast();
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
      ...carResultParameters,
    };
    trackFilterCarResults(filterCarResult);

    getNewFunnelRecommendations(paramQuery)
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        handleSuccess(response);
      })
      .catch(() => {
        handleError();
      });
  };

  const onClick = (key: string) => {
    let checkedGroups: string[];
    if (isCheckedGroups.includes(key)) {
      checkedGroups = isCheckedGroups.filter((item) => item !== key);
    } else {
      checkedGroups = isCheckedGroups.concat(key);
    }
    patchFunnelQuery({ category: checkedGroups });
    paramQuery.category = checkedGroups;
    if (isSideMenuFilter) {
      immediateFilter();
    }
  };

  const renderCategoryButton = () => {
    return categoryList.map(({ key, value, isChecked }) => {
      return (
        <StyledCategoryButton
          key={key}
          onClick={() => onClick(key)}
          isChecked={isChecked}
        >
          {isChecked && (
            <StyledCheckIcon>
              <CheckedSquareOutlined color={colors.secondary} />
            </StyledCheckIcon>
          )}
          <StyledText>{value}</StyledText>
        </StyledCategoryButton>
      );
    });
  };

  return (
    <>
      <StyledTitle>{t("carResultsPage.filterModal.category")}</StyledTitle>
      <StyledCategoryButtons>{renderCategoryButton()}</StyledCategoryButtons>
      <RenderErrorToast type={ToastType.Error} message={errorMsg} />
    </>
  );
};

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
  display: block;
  margin-top: 20px;
`;

const StyledCategoryButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 8px 0 30px;
`;

const StyledCategoryButton = styled.div<{ isChecked: boolean }>`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isChecked }) =>
    isChecked
      ? css`
          background: ${colors.primaryLight3};
          border: 1px solid ${colors.primaryLight1};
        `
      : css`
          background: ${colors.white};
          border: 1px solid ${colors.line};
        `}
`;
const StyledCheckIcon = styled.div`
  position: absolute;
  right: -8px;
  top: -8px;
`;

const StyledText = styled(LinkLabelLargeSemiBold)`
  font-size: 14px;
`;
