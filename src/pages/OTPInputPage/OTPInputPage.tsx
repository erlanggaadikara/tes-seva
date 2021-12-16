import React, { useEffect, useState } from "react";
import { OTPInput, OTPInputRef } from "components/OTPInput/OTPInput";
import { colors } from "styles/colors";
import styled from "styled-components";
import {
  appDownloadUrl,
  preApprovalConfirmationUrl,
  preApprovalSMSUrl,
  preApprovalStartUrl,
} from "routes/routes";
import { useHistory, useLocation } from "react-router-dom";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { useTranslation } from "react-i18next";
import { maskPhoneNumber } from "utils/stringUtils";
import { Button, ButtonType } from "components/Button/Button";
import { ToastType, useToast } from "components/Toast/Toast";
import { verifyOTP } from "services/auth";
import { saveCustomerInfo } from "services/customer";
import { CustomerInfo, Token, WebviewMessageData } from "types/types";
import { useModal } from "components/Modal/Modal";
import { maxPageWidth, screenHeight } from "styles/GlobalStyle";
import { ResendOtp } from "./ResendOtp/ResendOtp";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";
import {
  trackSubmitContactInfo,
  trackValidatePhoneNumber,
} from "helpers/trackingEvents";
import ReactPixel from "react-facebook-pixel";
import { FBPixelStandardEvent } from "helpers/facebookPixel";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import {
  CustomerPreApprovalStatus,
  LocalStorageKey,
  LocationStateKey,
  SessionStorageKey,
  WebviewMessageType,
} from "models/models";
import { resetStateParam } from "utils/locationUtils";
import { getPreApprovalStatus } from "preApprovalUitls";
import { fetchCustomerId } from "utils/httpUtils/customerUtils";
import { AxiosResponse } from "axios";
import { ArrowBack } from "components/ArrowBack/ArrowBack";
import { saveLocalStorage } from "utils/localstorageUtils";
import {
  trackSelectAccountCreationOTPResend,
  trackSelectAccountCreationOTPSubmit,
  trackViewAccountCreationOTP,
} from "helpers/amplitude/preApprovalEventTracking";
import { saveSessionStorage } from "utils/sessionstorageUtils";

const OTPLength = 6;

export default function OTPInputPage() {
  const { t } = useTranslation();
  const location = useLocation<
    | {
        [LocationStateKey.OtpSent]?: boolean;
        [LocationStateKey.IsFromLoginPage]?: boolean;
      }
    | undefined
  >();
  const history = useHistory();
  const { phoneNumber } = useContextContactFormData();
  const [hasError, setHasError] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { showToast, RenderToast } = useToast();
  const { showToast: showErrorToast, RenderToast: RenderErrorToast } =
    useToast();
  const otpInputRef = React.useRef<OTPInputRef>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const { showModal, hideModal, RenderModal } = useModal();
  const [errorMsg, setErrorMsg] = useState<string>(t("common.errorMessage"));
  const [, setLastLoginTime] = useLocalStorage<number>(
    LocalStorageKey.LastLoginTime,
    -1
  );
  const [, setToken] = useLocalStorage<Token | null>(
    LocalStorageKey.Token,
    null
  );

  useEffect(() => {
    if (location.state?.isFromLoginPage) {
      trackViewAccountCreationOTP();
    }
  }, []);

  useEffect(() => {
    if (location.state?.otpSent) {
      showToast();
      resetStateParam(location, LocationStateKey.OtpSent);
    }
  }, []);

  function handleOTPChange(otp: string) {
    setHasError(false);
    setOtp(otp);
    if (otp && otp.length >= OTPLength) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }

  const startLoading = () => {
    setLoading(true);
    showModal();
  };

  const stopLoading = () => {
    setLoading(false);
    hideModal();
  };

  const goToPreApprovalStartPage = () => {
    history.replace({
      ...location,
      pathname: preApprovalStartUrl,
    });
  };
  const goToPreApprovalSMSPendingPage = () => {
    history.replace({
      ...location,
      pathname: preApprovalSMSUrl,
    });
  };
  const goToPreApprovalConfirmationPage = (id: string) => {
    history.push(preApprovalConfirmationUrl.replace(":customerId", id));
  };

  const handleVerifyOtpOperation = async () => {
    const tokenResponse = await verifyOTP(otp);
    const tokenData: Token = tokenResponse.data;
    setLastLoginTime(Date.now());
    setToken(tokenData);
    const webviewTokenData: WebviewMessageData<Token> = {
      type: WebviewMessageType.Token,
      value: tokenData,
    };
    window.ReactNativeWebView?.postMessage(JSON.stringify(webviewTokenData));
    trackValidatePhoneNumber();
  };

  const handlePreApprovalAction = async () => {
    const id = await fetchCustomerId();
    if (id === null) {
      goToPreApprovalStartPage();
      return;
    }
    const preApprovalStatus = await getPreApprovalStatus(id);
    if (preApprovalStatus === CustomerPreApprovalStatus.PendingResult) {
      goToPreApprovalSMSPendingPage();
    } else if (
      status === CustomerPreApprovalStatus.Success ||
      status === CustomerPreApprovalStatus.Failed
    ) {
      goToPreApprovalConfirmationPage(id);
    } else {
      goToPreApprovalStartPage();
    }
  };

  const handleJumpAction = () => {
    location.state?.isFromLoginPage
      ? handlePreApprovalAction()
      : saveCustomerInfo()
          .then((response: AxiosResponse<CustomerInfo>) => {
            ReactPixel.track(FBPixelStandardEvent.Lead);
            trackSubmitContactInfo();
            history.push(appDownloadUrl);
            // save customer id
            saveLocalStorage(LocalStorageKey.CustomerId, response.data?.id);
            saveSessionStorage(SessionStorageKey.CustomerId, response.data?.id);
          })
          .catch(() => {
            setErrorMsg(t("otpPage.error.customerInfo"));
            showErrorToast();
          });
    stopLoading();
  };

  const handleSubmit = async () => {
    try {
      startLoading();
      await handleVerifyOtpOperation();
      handleJumpAction();
      resetStateParam(location, LocationStateKey.IsFromLoginPage);
    } catch (e) {
      const errorResponse = e.response?.data;
      stopLoading();
      setCanSubmit(false);
      if (errorResponse?.message === "INVALID_CODE") {
        setHasError(true);
      } else {
        setErrorMsg(t("otpPage.error.otp"));
        showErrorToast();
      }
    }
    trackSelectAccountCreationOTPSubmit();
  };

  const clearInput = () => {
    otpInputRef.current?.clearOtp();
    handleOTPChange("");
    trackSelectAccountCreationOTPResend();
  };

  return (
    <StyledPage>
      <div>
        <ArrowBack />
        <StyledTitle>{t("otpPage.title")}</StyledTitle>
        {phoneNumber && (
          <StyledMessage>
            {t("otpPage.message", {
              phoneNumber: maskPhoneNumber(phoneNumber),
            })}
          </StyledMessage>
        )}
        <OTPInput
          ref={otpInputRef}
          length={OTPLength}
          onChangeOTP={handleOTPChange}
          hasError={hasError}
          errorText={t("otpPage.errorText")}
        />
        <StyledSendOtpSection>
          <ResendOtp phoneNumber={phoneNumber} onSendOtpClick={clearInput} />
        </StyledSendOtpSection>
      </div>
      <StyledButton
        width="100%"
        buttonType={ButtonType.primary1}
        onClick={handleSubmit}
        disabled={!canSubmit}
        loading={loading}
      >
        {t("otpPage.submit")}
      </StyledButton>
      <RenderModal transparent={true} />
      <RenderToast type={ToastType.Info} message={t("otpPage.toastMsg")} />
      <RenderErrorToast type={ToastType.Error} message={errorMsg} />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  width: 100%;
  min-height: ${screenHeight}px;
  background: ${colors.pageBg};
  padding: 18px 16px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: ${maxPageWidth};
  position: relative;
`;

const StyledTitle = styled(H2MediumBold)`
  color: ${colors.title};
  margin-top: 36px;
`;

const StyledMessage = styled(TextSmallRegular)`
  display: block;
  margin: 22px 0 44px;
  color: ${colors.body};
`;

const StyledSendOtpSection = styled.div`
  margin-top: 27px;
  margin-bottom: 136px;
`;

const StyledButton = styled(Button)`
  margin-bottom: 80px;
`;
