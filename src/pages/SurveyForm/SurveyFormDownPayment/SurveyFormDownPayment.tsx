import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { downPaymentConfig } from "./downPayment.config";
import { FormLabel } from "component/FormLabel/FormLabel";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { CashAmountInput } from "CashAmountInput/CashAmountInput";
import { SurveyFormKey } from "models/models";

export const SurveyFormDownPayment = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const originInput = surveyFormData?.downPayment?.value?.toString() || "";
  const subTitle = t(downPaymentConfig.subtitle);

  return (
    <div>
      <FormLabel>{t(downPaymentConfig.label)}</FormLabel>
      <StyledSubtitleArea>
        <TextSmallRegular dangerouslySetInnerHTML={{ __html: subTitle }} />
      </StyledSubtitleArea>
      <CashAmountInput value={originInput} page={SurveyFormKey.DownPayment} />
    </div>
  );
};

const StyledSubtitleArea = styled.div`
  padding-top: 24px;
  padding-bottom: 48px;
`;
