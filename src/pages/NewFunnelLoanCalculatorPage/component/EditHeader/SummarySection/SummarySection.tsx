import React from "react";
import { SummaryContent } from "./SummaryContent";
import { transformToJtWithTargetDecimal } from "utils/numberUtils/numberUtils";
import { SurveyFormKey } from "models/models";
import { Edit } from "components/icon/Edit/Edit";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { NewFunnelCarVariantDetails } from "types/types";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";

interface MiniEditProps {
  onEditClick: () => void;
  carVariantDetails?: NewFunnelCarVariantDetails;
}

export const SummarySection = ({
  carVariantDetails,
  onEditClick,
}: MiniEditProps) => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const { currentLanguage } = useCurrentLanguageFromContext();

  return (
    <StyledWrapper>
      <StyledImg
        src={carVariantDetails?.variantDetail.newFunnelMainColorImage}
      />
      <SummaryContent
        label={t(
          "newFunnelLoanCalculatorPage.editHeader.summarySection.monthlyIncome"
        )}
        value={transformToJtWithTargetDecimal(
          surveyFormData[SurveyFormKey.TotalIncome]?.value as number,
          currentLanguage
        )}
      />
      <SummaryContent
        label={t("newFunnelLoanCalculatorPage.editHeader.summarySection.age")}
        value={surveyFormData[SurveyFormKey.Age]?.value}
      />
      <StyledEditIcon onClick={onEditClick}>
        <Edit />
      </StyledEditIcon>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: ${colors.white};
  height: 72px;
  width: 100%;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const StyledImg = styled.img`
  width: 74px;
  height: 40px;
  border-radius: 8px;
  border: transparent;
`;

const StyledEditIcon = styled.div`
  margin: auto 0;
`;
