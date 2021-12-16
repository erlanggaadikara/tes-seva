import React from "react";
import styled from "styled-components";
import { SMS } from "./images/SMS";
import { Button, ButtonType } from "components/Button/Button";
import { GooglePlayLogo } from "components/icon/GooglePlayLogo/GooglePlayLogo";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { H2MediumBoldStyle } from "components/typography/H2MediumBold";
import { TextSmallRegularStyle } from "components/typography/TextSmallRegular";
import { LinkLabelMediumSemiBoldStyle } from "components/typography/LinkLabelMediumSemiBold";
import { TextLegalMediumStyle } from "components/typography/TextLegalMedium";
import urls from "helpers/urls";
import { isInTorqApp } from "utils/window";
import { WebviewMessageType } from "models/models";
import { WebviewMessageData } from "types/types";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import {
  trackViewPreapprovalSMS,
  trackSelectPreapprovalSMSDownload,
} from "helpers/amplitude/preApprovalEventTracking";
import { carResultsUrl } from "routes/routes";
import { useHistory } from "react-router-dom";
import { screenHeight } from "styles/GlobalStyle";

export default function BrickLinkSMSSendingPage() {
  useAmplitudePageView(trackViewPreapprovalSMS);
  const { t } = useTranslation();
  const history = useHistory();

  const onDownloadClick = () => {
    window.open(urls.googlePlayHref);
    trackSelectPreapprovalSMSDownload();
  };
  const handleBackToNativeApp = () => {
    const postMessageData: WebviewMessageData<boolean> = {
      type: WebviewMessageType.BackToNativeFromPreApprovalSuccessPage,
      value: true,
    };
    window.ReactNativeWebView?.postMessage(JSON.stringify(postMessageData));
  };

  const goToCarResults = () => {
    history.push(carResultsUrl);
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        <SMS />
        <StyledTitle>{t("preApprovalProgress.sms.title")}</StyledTitle>
        <StyledDesc
          dangerouslySetInnerHTML={{
            __html: t("preApprovalProgress.sms.desc"),
          }}
        />
        <StyledButton buttonType={ButtonType.subtle} onClick={goToCarResults}>
          {t(`checkFailurePage.cta`)}
        </StyledButton>
      </StyledContainer>
      <StyledButtonContainer>
        <StyledDownloadTitle>
          {t("preApprovalProgress.sms.downloadTitle")}
        </StyledDownloadTitle>
        <StyledDownloadDesc>
          {t("preApprovalProgress.sms.downloadDesc")}
        </StyledDownloadDesc>
        {isInTorqApp ? (
          <StyledDownloadButton
            buttonType={ButtonType.primary1}
            onClick={handleBackToNativeApp}
            width={"100%"}
          >
            {t("preApprovalProgress.sms.uploadDocuments")}
          </StyledDownloadButton>
        ) : (
          <StyledDownloadButton onClick={onDownloadClick}>
            <StyledLogoWrapper>
              <GooglePlayLogo />
            </StyledLogoWrapper>
            {t("preApprovalProgress.sms.downloadBtn")}
          </StyledDownloadButton>
        )}
      </StyledButtonContainer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 38px;
  height: ${screenHeight}px;
  justify-content: space-between;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px 0;
`;
const StyledButtonContainer = styled.div`
  background: ${colors.inputBg};
  border-radius: 16px;
  width: calc(100% - 32px);
  margin-bottom: 32px;
`;

const StyledTitle = styled.span`
  ${H2MediumBoldStyle};
  margin-top: 38px;
  color: ${colors.title};
  text-align: center;
`;

const StyledDesc = styled.span`
  ${TextSmallRegularStyle};
  margin-top: 8px;
  text-align: center;
  color: ${colors.body};
`;

const StyledButton = styled(Button)`
  margin: 10px 0;
`;

const StyledDownloadTitle = styled.p`
  ${LinkLabelMediumSemiBoldStyle};
  margin: 18px 24px 0;
  text-align: center;
`;

const StyledDownloadDesc = styled.p`
  ${TextLegalMediumStyle};
  margin: 6px 16px 0;
  text-align: center;
`;

const StyledDownloadButton = styled(Button)`
  width: calc(100% - 32px);
  margin-bottom: 16px;
  margin-top: 18px;
  justify-content: center;
`;
const StyledLogoWrapper = styled.div`
  margin-right: 16px;
`;
