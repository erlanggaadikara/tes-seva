import React, { useState } from "react";
import { Button, ButtonType } from "components/Button/Button";
import { useTranslation } from "react-i18next";
import { QuestionFlowMonthlyIncome } from "PreApprovalQuestionFlow/QuestionFlowMonthlyIncome/QuestionFlowMonthlyIncome";
import { PreApprovalProgress } from "component/PreApprovalProgress/PreApprovalProgress";
import { PreApprovalProgressType } from "models/models";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useHistory } from "react-router";
import { bankSelectionUrl } from "routes/routes";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import {
  trackViewPreapprovalBankLinkingIncome,
  trackSelectPreapprovalBankLinkingIncomeSave,
} from "helpers/amplitude/preApprovalEventTracking";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { screenHeight } from "styles/GlobalStyle";

export default function EditIncomePage() {
  useAmplitudePageView(trackViewPreapprovalBankLinkingIncome);

  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const surveyFormData = useContextSurveyFormData();

  const onClickSave = () => {
    history.push(bankSelectionUrl);
    trackSelectPreapprovalBankLinkingIncomeSave(
      Number(surveyFormData.totalIncome?.value)
    );
  };
  return (
    <StyledPage>
      <PreApprovalProgress progressType={PreApprovalProgressType.Bank} />
      <StyledPageContent>
        <QuestionFlowMonthlyIncome handleDisabled={setIsDisabled} />
        <Button
          width="100%"
          buttonType={ButtonType.primary1}
          onClick={onClickSave}
          disabled={isDisabled}
        >
          {t("common.save")}
        </Button>
      </StyledPageContent>
    </StyledPage>
  );
}
const StyledPage = styled.section`
  background: ${colors.offWhite};
  display: flex;
  flex-direction: column;
  height: ${screenHeight}px;
`;
const StyledPageContent = styled.section`
  flex: 1;
  padding: 25px 16px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
