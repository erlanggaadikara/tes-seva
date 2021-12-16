import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { CheckedSquareOutlined } from "components/icon/CheckedSquareOutlined/CheckedSquareOutlined";
import { VariantBodyTypeHatchback } from "components/icon/VariantBodyTypeHatchback/VariantBodyTypeHatchback";
import { VariantBodyTypeSedan } from "components/icon/VariantBodyTypeSedan/VariantBodyTypeSedan";
import { VariantBodyTypeSUV } from "components/icon/VariantBodyTypeSUV/VariantBodyTypeSUV";
import { VariantBodyTypeMPV } from "components/icon/VariantBodyTypeMPV/VariantBodyTypeMPV";
import { VariantBodyTypeSport } from "components/icon/VariantBodyTypeSport/VariantBodyTypeSport";
import { getNewFunnelRecommendations } from "services/newFunnel";
import { AxiosResponse } from "axios";
import { CarRecommendationResponse } from "types/types";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { toNumber } from "utils/stringUtils";

interface FilterBodyProps {
  isSideMenuFilter?: boolean;
}

interface BodyButtonProps {
  key: string;
  icon: JSX.Element;
  value: string;
  isChecked: boolean;
}

export const FilterBody = ({ isSideMenuFilter }: FilterBodyProps) => {
  const { t } = useTranslation();
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData();
  const { setRecommendations } = useContextRecommendations();
  const [errorMsg] = useState<string>(t("common.errorMessage"));
  const { showToast: showErrorToast, RenderToast: RenderErrorToast } =
    useToast();
  const [isCheckedGroups, setIsCheckedGroups] = useState<string[]>(
    funnelQuery.bodyType ? funnelQuery.bodyType : []
  );

  useEffect(() => {
    setIsCheckedGroups(funnelQuery.bodyType ? funnelQuery.bodyType : []);
  }, [funnelQuery]);

  const paramQuery = funnelQuery;

  const bodyList: BodyButtonProps[] = [
    {
      key: "HATCHBACK",
      icon: <VariantBodyTypeHatchback />,
      value: "Hatchback",
      isChecked: isCheckedGroups.includes("HATCHBACK"),
    },
    {
      key: "SEDAN",
      icon: <VariantBodyTypeSedan />,
      value: "Sedan",
      isChecked: isCheckedGroups.includes("SEDAN"),
    },
    {
      key: "SUV",
      icon: <VariantBodyTypeSUV />,
      value: "SUV",
      isChecked: isCheckedGroups.includes("SUV"),
    },
    {
      key: "MPV",
      icon: <VariantBodyTypeMPV />,
      value: "MPV",
      isChecked: isCheckedGroups.includes("MPV"),
    },
    {
      key: "SPORT",
      icon: <VariantBodyTypeSport />,
      value: "Sport",
      isChecked: isCheckedGroups.includes("SPORT"),
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
    };

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
    patchFunnelQuery({ bodyType: checkedGroups });
    paramQuery.bodyType = checkedGroups;
    if (isSideMenuFilter) {
      immediateFilter();
    }
  };

  const renderBodyButton = () => {
    return bodyList.map(({ key, icon, value, isChecked }) => {
      return (
        <StyledBodyButton
          key={key}
          onClick={() => onClick(key)}
          isChecked={isChecked}
        >
          {isChecked && (
            <StyledCheckIcon>
              <CheckedSquareOutlined color={colors.secondary} />
            </StyledCheckIcon>
          )}
          <StyledIcon>{icon}</StyledIcon>
          <StyledText>{value}</StyledText>
        </StyledBodyButton>
      );
    });
  };

  return (
    <>
      <StyledTitle>{t("carResultsPage.filterModal.body")}</StyledTitle>
      <StyledBodyButtons>{renderBodyButton()}</StyledBodyButtons>
      <RenderErrorToast type={ToastType.Error} message={errorMsg} />
    </>
  );
};

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
  display: block;
  margin-top: 20px;
`;

const StyledBodyButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 8px 0 30px;
`;

const StyledBodyButton = styled.div<{ isChecked: boolean }>`
  width: 160px;
  height: 100px;
  border-radius: 16px;
  text-align: center;
  position: relative;
  margin-bottom: 10px;
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
const StyledIcon = styled.div`
  width: 100%;
  margin: 20px 0px 0;
`;

const StyledText = styled(LinkLabelLegalSemiBold)`
  color: ${colors.title};
`;
