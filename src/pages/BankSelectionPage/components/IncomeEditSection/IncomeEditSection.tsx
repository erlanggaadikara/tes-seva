import React from "react";
import { Editable } from "components/Editable/Editable";
import { SectionTitle } from "SectionTitle/SectionTitle";
import styled from "styled-components";
import { useHistory } from "react-router";
import { editIncomePageUrl } from "routes/routes";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { transformToJtWithTwoDecimal } from "utils/numberUtils/numberUtils";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import { useTranslation } from "react-i18next";

export const IncomeEditSection = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const [currentLanguage] = useCurrentLanguage();
  const history = useHistory();
  const onClick = () => {
    history.push(editIncomePageUrl);
  };
  return (
    <StyledIncomeEditSection onClick={onClick}>
      <SectionTitle title={t("bankSelectionPage.confirmYourIncome")} />
      <Editable
        title={t("bankSelectionPage.yourEstimatedIncome")}
        value={transformToJtWithTwoDecimal(
          Number(surveyFormData.totalIncome?.value),
          currentLanguage
        )}
      />
    </StyledIncomeEditSection>
  );
};
const StyledIncomeEditSection = styled.section`
  padding: 21px 16px;
`;
