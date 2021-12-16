import React, { ReactElement, useRef, useState } from "react";
import { getRecaptchaToken } from "firebase/firebaseAuth";
import { AxiosError, AxiosResponse } from "axios";
import { SMSResponse } from "types/types";
import { sendSMS } from "services/auth";
import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import { useModal } from "components/Modal/Modal";
import { Button, ButtonProps, ButtonType } from "components/Button/Button";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import styled from "styled-components";
import { HTTPResponseStatusCode, LocalStorageKey } from "models/models";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { useLastOtpSentTime } from "context/lastOtpSentTimeContext/lastOtpSentTimeContext";

interface SendOtpProps extends ButtonProps {
  buttonType?: ButtonType;
  children?: ReactElement;
  onApiSuccess?: (response: AxiosResponse<SMSResponse>) => void;
  onApiError?: (error: AxiosError) => void;
  onApiLoading?: (isLoading: boolean) => void;
  phoneNumber: string | undefined;
  onSendOtpClick?: () => void;
}
const RECAPTCHA_CONTAINER = "recaptcha-container";
const RecaptchaNode = `<div id=${RECAPTCHA_CONTAINER}></div>`;

export const SendOtp = ({
  children,
  disabled,
  onApiSuccess,
  onApiError,
  onApiLoading,
  onSendOtpClick,
  phoneNumber,
  buttonType = ButtonType.primary1,
  ...restProps
}: SendOtpProps) => {
  const [currentLanguage] = useCurrentLanguage();
  const [loading, setLoading] = useState(false);
  const { showModal, hideModal, RenderModal } = useModal();
  const { t } = useTranslation();
  const { showToast, RenderToast } = useToast();
  const [errorMessage, setErrorMessage] = useState("common.otpSentError");
  const recaptchaWrapperRef =
    useRef() as React.MutableRefObject<HTMLDivElement>;
  const { setLastOtpSentTime } = useLastOtpSentTime();
  const [, setLastOptSentPhoneNumber] = useLocalStorage<string>(
    LocalStorageKey.LastOtpSentPhoneNumber,
    ""
  );

  function showLoading() {
    setLoading(true);
    showModal();
    onApiLoading && onApiLoading(true);
  }

  function stopLoading() {
    hideModal();
    setLoading(false);
    onApiLoading && onApiLoading(false);
  }

  const sendOptCode = async () => {
    onSendOtpClick && onSendOtpClick();
    try {
      showLoading();
      if (recaptchaWrapperRef) {
        recaptchaWrapperRef.current.innerHTML = RecaptchaNode;
      }
      const recaptchaToken = await getRecaptchaToken(
        currentLanguage,
        RECAPTCHA_CONTAINER
      );
      sendSMS(recaptchaToken)
        .then((response: AxiosResponse<SMSResponse>) => {
          setLastOtpSentTime(Date.now());
          setLastOptSentPhoneNumber(phoneNumber);
          stopLoading();
          onApiSuccess && onApiSuccess(response);
        })
        .catch((error: AxiosError) => {
          if (
            (error.response?.status as HTTPResponseStatusCode) ===
            HTTPResponseStatusCode.TooManyRequest
          ) {
            setErrorMessage("otpPage.error.tooManyOtpSend");
          }
          console.log(error);
          setTimeout(() => {
            stopLoading();
            showToast();
            onApiError && onApiError(error);
          }, 500);
        });
    } catch (e) {
      showToast();
      stopLoading();
      onApiError && onApiError(e);
    }
  };

  return (
    <div>
      <Button
        style={{ padding: "0 20px" }}
        buttonType={buttonType}
        onClick={sendOptCode}
        disabled={disabled}
        loading={loading}
        {...restProps}
      >
        {children}
      </Button>
      <StyledWrapper ref={recaptchaWrapperRef}>{RecaptchaNode}</StyledWrapper>
      <RenderModal transparent={true} />
      <RenderToast type={ToastType.Error} message={t(errorMessage)} />
    </div>
  );
};

const StyledWrapper = styled.div`
  opacity: 0;
  height: 0;
`;
