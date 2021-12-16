import React, { useEffect, useState } from "react";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { useCountDownTimer } from "hooks/useCountDownTimer/useCountDownTimer";
import styled from "styled-components";
import { colors } from "styles/colors";
import { SendOtp } from "ScheduleAppointmentPage/SendOtp/SendOtp";
import { ButtonType } from "components/Button/Button";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useTranslation } from "react-i18next";
import { useLastOtpSentTime } from "context/lastOtpSentTimeContext/lastOtpSentTimeContext";

interface ResendOtpProps {
  phoneNumber: string | undefined;
  onSendOtpClick?: () => void;
}
export const RESEND_OTP_INTERVAL = 1000 * 60 * 2;
export const ResendOtp = ({ phoneNumber, onSendOtpClick }: ResendOtpProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCountDownEnd, setIsCountDownEnd] = useState(false);
  const [isError, setIsError] = useState(false);
  const { t } = useTranslation();
  const { lastOtpSentTime } = useLastOtpSentTime();
  const { countDownTime, startCountDownTime, setCountDownTimeInMilliseconds } =
    useCountDownTimer({
      countDownTimeInMilliseconds: 0,
      onEndOfTime: () => {
        setIsCountDownEnd(true);
      },
    });
  const startTimer = () => {
    const countDownTimeInMilliSeconds =
      RESEND_OTP_INTERVAL - (Date.now() - lastOtpSentTime);
    if (
      countDownTimeInMilliSeconds >= 0 &&
      countDownTimeInMilliSeconds <= RESEND_OTP_INTERVAL
    ) {
      setCountDownTimeInMilliseconds(countDownTimeInMilliSeconds);
      setIsCountDownEnd(false);
      startCountDownTime();
    }
  };
  useEffect(() => {
    startTimer();
  }, [isError, isCountDownEnd, isLoading]);
  const onSendOtpSuccess = () => {
    setIsError(false);
  };
  const onApiLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };
  const onApiError = () => {
    setIsError(true);
  };
  const shouldShowTimer = () => {
    return !isLoading && !isCountDownEnd && !isError;
  };
  return (
    <StyledResendComponent>
      {!shouldShowTimer() ? (
        <SendOtp
          phoneNumber={phoneNumber}
          onSendOtpClick={onSendOtpClick}
          buttonType={ButtonType.subtle}
          onApiSuccess={onSendOtpSuccess}
          onApiLoading={onApiLoading}
          onApiError={onApiError}
          height={"40px"}
        >
          <StyledResendButton>
            <LinkLabelSmallSemiBold>
              {t("otpPage.resendText")}
            </LinkLabelSmallSemiBold>
          </StyledResendButton>
        </SendOtp>
      ) : (
        <StyledCountDownTextSection>
          <StyledResendText>
            <TextSmallRegular>
              {t("otpPage.resendCountdown")}&nbsp;
            </TextSmallRegular>
          </StyledResendText>
          <StyledTimer>
            {countDownTime.minutes}:{countDownTime.seconds}
          </StyledTimer>
        </StyledCountDownTextSection>
      )}
    </StyledResendComponent>
  );
};
const StyledResendText = styled.span`
  color: ${colors.label};
`;
const StyledTimer = styled.span`
  color: ${colors.body};
`;
const StyledResendButton = styled.div`
  color: ${colors.primary1};
`;
const StyledCountDownTextSection = styled.span`
  height: 40px;
  display: flex;
  align-items: center;
`;
const StyledResendComponent = styled.div`
  display: flex;
  justify-content: center;
`;
