import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { Toyota } from "components/icon/Toyota/Toyota";
import { Daihatsu } from "components/icon/Daihatsu/Daihatsu";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { CheckedSquareOutlined } from "components/icon/CheckedSquareOutlined/CheckedSquareOutlined";
import { BMW } from "components/icon/BMW/BMW";

interface CarButtonProps {
  key: string;
  icon: JSX.Element;
  value: string;
  isChecked: boolean;
}

export const FilterBrand = () => {
  const { t } = useTranslation();
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData();
  const [isCheckedGroups, setIsCheckedGroups] = useState<string[]>(
    funnelQuery.brand ? funnelQuery.brand : []
  );

  useEffect(() => {
    setIsCheckedGroups(funnelQuery.brand ? funnelQuery.brand : []);
  }, [funnelQuery]);

  const carList: CarButtonProps[] = [
    {
      key: "Toyota",
      icon: <Toyota />,
      value: "Toyota",
      isChecked: isCheckedGroups.includes("Toyota"),
    },
    {
      key: "Daihatsu",
      icon: <Daihatsu />,
      value: "Daihatsu",
      isChecked: isCheckedGroups.includes("Daihatsu"),
    },
    {
      key: "BMW",
      icon: <BMW />,
      value: "BMW",
      isChecked: isCheckedGroups.includes("BMW"),
    },
  ];

  const onClick = (key: string) => {
    let checkedGroups: string[];
    if (isCheckedGroups.includes(key)) {
      checkedGroups = isCheckedGroups.filter((item) => item !== key);
    } else {
      checkedGroups = isCheckedGroups.concat(key);
    }
    patchFunnelQuery({ brand: checkedGroups });
  };

  const renderCarButton = () => {
    return carList.map(({ key, icon, value, isChecked }) => {
      return (
        <StyledCarButton
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
        </StyledCarButton>
      );
    });
  };

  return (
    <>
      <StyledTitle>{t("carResultsPage.filterModal.brand")}</StyledTitle>
      <StyledCarButtons>{renderCarButton()}</StyledCarButtons>
    </>
  );
};

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
  display: block;
  margin-top: 20px;
`;

const StyledCarButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 8px 0 80px;
`;

const StyledCarButton = styled.div<{ isChecked: boolean }>`
  width: 94px;
  height: 80px;
  border-radius: 16px;
  text-align: center;
  position: relative;
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
  width: 64px;
  height: 50px;
  margin: 10px auto 0;
`;

const StyledText = styled(LinkLabelLegalSemiBold)`
  color: ${colors.title};
`;
