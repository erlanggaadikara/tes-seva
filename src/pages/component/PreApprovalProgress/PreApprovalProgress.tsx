import React from "react";
import styled from "styled-components";
import { PreApprovalProgressType } from "models/models";
import { LinkLabelSmallSemiBoldStyle } from "components/typography/LinkLabelSmallSemiBold";
import { PreApprovalProgressConfig } from "./PreApprovalProgress.config";
import { useTranslation } from "react-i18next";
import { colors, transparent } from "styles/colors";
import { ArrowBack } from "components/ArrowBack/ArrowBack";

interface PreApprovalProgressProps {
  progressType: PreApprovalProgressType;
  currentLocation?: number;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const PreApprovalProgress = ({
  progressType,
  currentLocation = -1,
  showBackButton = true,
  onBackClick: onBackClick,
}: PreApprovalProgressProps) => {
  const { t } = useTranslation();

  const progressTypeIndex = PreApprovalProgressConfig.findIndex(
    (item) => item.type === progressType
  );
  const isActiveIcon = (iconIndex: number) => {
    if (progressType === PreApprovalProgressType.Bank) {
      return true;
    }
    return iconIndex <= progressTypeIndex;
  };

  const isActiveStep = (iconIndex: number, stepIndex: number) => {
    if (progressType === PreApprovalProgressType.Bank) {
      return true;
    }
    if (iconIndex === progressTypeIndex) {
      return stepIndex <= currentLocation;
    } else if (iconIndex < progressTypeIndex) {
      return true;
    }
    return false;
  };

  return (
    <StyledWrapper>
      <StyledTitle>{t("preApprovalProgress.title")}</StyledTitle>
      {showBackButton && (
        <ArrowBack fill={colors.white} onClick={onBackClick} />
      )}
      <StyledContent>
        {PreApprovalProgressConfig.map((item, iconIndex) => {
          const icon = item.icon;
          return (
            <React.Fragment key={item.type}>
              {icon(
                isActiveIcon(iconIndex)
                  ? {
                      backgroundColor: colors.primaryLight1,
                      borderColor: colors.secondary,
                    }
                  : {}
              )}
              {item.children?.map((child, stepIndex) => (
                <StyledStep
                  key={child}
                  isActive={isActiveStep(iconIndex, stepIndex)}
                />
              ))}
            </React.Fragment>
          );
        })}
      </StyledContent>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: ${colors.primary1};
  height: 100px;
  width: 100%;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const StyledTitle = styled.div`
  padding-top: 20px;
  text-align: center;
  color: ${colors.white};
  ${LinkLabelSmallSemiBoldStyle};
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 55px 0;
`;

const StyledStep = styled.div<{ isActive: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: ${({ isActive }) =>
    isActive ? colors.primaryLight1 : transparent("white", 0.5)};
  margin: 0 6px;
`;
