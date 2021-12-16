import { colors } from "styles/colors";
import { Button, ButtonType } from "components/Button/Button";
import React, { useState } from "react";
import styled from "styled-components";
import { maxPageWidth } from "styles/GlobalStyle";
import { useTranslation } from "react-i18next";
import { PreApprovalProgress } from "component/PreApprovalProgress/PreApprovalProgress";
import {
  HTTPResponseStatusCode,
  PreApprovalProgressType,
  PreApprovalResultScore,
} from "models/models";
import { UploadSuccess } from "components/icon/UploadSuccess/UploadSuccess";
import { Footer } from "components/Footer/Footer";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { useHistory } from "react-router-dom";
import {
  bankSelectionUrl,
  preApprovalFailureUrl,
  startEkycUrl,
} from "routes/routes";
import { ToastType, useToast } from "components/Toast/Toast";
import {
  checkPreApprovalStageTwo,
  handlePreApprovalFlowError,
  PreApprovalCheckResult,
} from "services/preApproval";
import { AxiosResponse } from "axios";
import getCurrentEnvironment from "helpers/environments";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import { extractKTPInfo, startEkyc } from "services/ekyc";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import {
  trackViewPreapprovalKTPUploadSuccess,
  trackSelectPreapprovalKTPUploadSuccessStart,
  trackViewPreapprovalRejected,
} from "helpers/amplitude/preApprovalEventTracking";

export default function SuccessPage() {
  useAmplitudePageView(trackViewPreapprovalKTPUploadSuccess);
  const history = useHistory();
  const { t } = useTranslation();
  const { showToast, RenderToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentLanguage] = useCurrentLanguage();
  const enableEkycCheck = getCurrentEnvironment.featureToggles.enableEkycCheck;
  const commonErrorMessage = "common.errorMessage";
  const tooFrequentErrorMessage = "imageQualityCheckPage.success.errorMessage";
  const [errorMessage, setErrorMessage] = useState<string>(commonErrorMessage);

  const handleStartEkyc = async () => {
    setErrorMessage(commonErrorMessage); // reset to common error message
    setLoading(true);
    try {
      if (enableEkycCheck) {
        await extractKTPInfo();
      }
    } catch (e) {}
    // TODO: change feature toggle to control enabling ekyc or not
    if (enableEkycCheck) {
      try {
        const response = await startEkyc(currentLanguage);
        history.push({
          pathname: startEkycUrl,
          state: {
            url: response.data.url,
          },
        });
      } catch (e) {
        setLoading(false);
        if (e.response?.status === HTTPResponseStatusCode.TooManyRequest) {
          setErrorMessage(tooFrequentErrorMessage);
        }
        showToast();
      }
    } else {
      try {
        const result: AxiosResponse<PreApprovalCheckResult> =
          await checkPreApprovalStageTwo();
        if (result.data.score === PreApprovalResultScore.PASS) {
          history.push(bankSelectionUrl);
        } else {
          history.push(preApprovalFailureUrl);
          trackViewPreapprovalRejected("vida", result.data.reasonCode);
        }
      } catch (e) {
        setLoading(false);
        handlePreApprovalFlowError("vida", e, history, showToast);
      }
    }
    trackSelectPreapprovalKTPUploadSuccessStart();
  };

  return (
    <StyledPage>
      <StyledHeader>
        <PreApprovalProgress
          progressType={PreApprovalProgressType.Files}
          currentLocation={1}
        />
      </StyledHeader>

      <StyledContent>
        <StyledImage width="83.5%" height="auto" />

        <StyledMessage>
          {t("imageQualityCheckPage.success.message")}
        </StyledMessage>

        <Footer background={"transparent"}>
          <StyledButton
            width="100%"
            buttonType={ButtonType.primary1}
            onClick={handleStartEkyc}
            loading={loading}
          >
            {enableEkycCheck
              ? t("imageQualityCheckPage.success.cta")
              : t("preApprovalQuestionFlow.submit")}
          </StyledButton>
        </Footer>
      </StyledContent>
      <RenderToast type={ToastType.Error} message={t(errorMessage)} />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  width: 100%;
  background: ${colors.offWhite};
  max-width: ${maxPageWidth};
  height: 100vh;
`;

const StyledHeader = styled.div`
  position: relative;
`;

const StyledContent = styled.div`
  padding: 18px 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMessage = styled(H2MediumBold)`
  color: ${colors.body};
  text-align: center;
  display: block;
`;

const StyledImage = styled(UploadSuccess)`
  margin: 32px 0;
`;

const StyledButton = styled(Button)`
  margin-bottom: 16px;
`;
