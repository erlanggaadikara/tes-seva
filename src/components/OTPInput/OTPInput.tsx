import React, { ChangeEvent, memo, useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { colors } from "styles/colors";
import { TextMediumRegularStyle } from "components/typography/TextMediumRegular";

interface OTPInputProps {
  length: number;
  onChangeOTP: (otp: string) => void;
  hasError?: boolean;
  errorText?: string;
}

export type OTPInputRef = {
  clearOtp: () => void;
};

const OTPInputComponent = React.forwardRef(
  (props: OTPInputProps, ref?: React.Ref<OTPInputRef>) => {
    const { length, onChangeOTP, hasError, errorText } = props;
    const [otpCode, setOtpCode] = useState("");
    const oneTimeCodeRef = useRef<HTMLInputElement>(null);
    const inputGroup = [
      { key: "firstCode", value: otpCode[0] },
      { key: "secondCode", value: otpCode[1] },
      { key: "thirdCode", value: otpCode[2] },
      { key: "fourthCode", value: otpCode[3] },
      { key: "fifthCode", value: otpCode[4] },
      { key: "sixthCode", value: otpCode[5] },
    ];

    React.useImperativeHandle(ref, () => ({
      clearOtp: () => {
        setOtpCode("");
        oneTimeCodeRef.current?.focus();
      },
    }));

    const oneTimeCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
      setOtpCode(event.target.value);
      handleOtpChange(event.target.value);
    };

    const handleOtpChange = useCallback(
      (otp: string) => {
        onChangeOTP(otp);
      },
      [onChangeOTP]
    );

    return (
      <div>
        <StyledOTPInput>
          <OneTimeCodeInput
            value={otpCode}
            autoFocus
            ref={oneTimeCodeRef}
            maxLength={length}
            type="tel"
            onChange={oneTimeCodeChange}
          />
          {inputGroup.map((item) => {
            return (
              <CodeInput
                readOnly
                value={item.value || ""}
                key={item.key}
                maxLength={1}
                onFocus={() => oneTimeCodeRef.current?.focus()}
                hasValue={!!item.value || item.key === "firstCode"}
                isError={!!hasError}
              />
            );
          })}
        </StyledOTPInput>
        {hasError && <StyledErrorText>{errorText}</StyledErrorText>}
      </div>
    );
  }
);

export const OTPInput = memo(OTPInputComponent);

interface InputProps {
  hasValue: boolean;
  isError: boolean;
}

const FocusedStyle = css`
  border: 2px solid ${colors.primaryLight1};
  background: ${colors.white};
`;

const ErrorStyle = css`
  border: 2px solid ${colors.error};
  background: ${colors.white};
`;

const StyledOTPInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OneTimeCodeInput = styled.input`
  position: absolute;
  opacity: 0;
`;

const CodeInput = styled.input<InputProps>`
  width: 49px;
  height: 56px;
  text-align: center;
  border-radius: 16px;
  border: 1px solid ${colors.line};
  color: ${colors.black};
  background-color: ${colors.white};
  ${TextMediumRegularStyle}

  ${({ hasValue }) => hasValue && FocusedStyle}
  ${({ isError }) => isError && ErrorStyle}
`;

const StyledErrorText = styled(TextLegalMedium)`
  color: ${colors.error};
`;
