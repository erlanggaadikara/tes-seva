import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { ArrowLeftOutlined } from "components/icon/ArrowLeftOutlined/ArrowLeftOutlined";
import { useHistory } from "react-router-dom";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { useTranslation } from "react-i18next";
import { TextSmallRegularStyle } from "components/typography/TextSmallRegular";
import {
  FormPhoneNumber,
  isValidPhoneNumber,
} from "ScheduleAppointmentPage/FormPhoneNumber/FormPhoneNumber";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { SendOtp } from "ScheduleAppointmentPage/SendOtp/SendOtp";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";
import { otpInputPage } from "routes/routes";
import { maxPageWidth, screenHeight } from "styles/GlobalStyle";
import { LegalText } from "./LegalText/LegalText";
import { LocationStateKey } from "models/models";

export default function LoginPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const { phoneNumber } = useContextContactFormData();

  const handleGoBack = () => {
    history.goBack();
  };

  const shouldEnableBtn = () => {
    return phoneNumber && isValidPhoneNumber(phoneNumber);
  };

  const handleSuccessSendOtp = () => {
    history.push({
      pathname: otpInputPage,
      state: {
        [LocationStateKey.OtpSent]: true,
        [LocationStateKey.IsFromLoginPage]: true,
      },
    });
  };

  return (
    <StyledPage>
      <StyledBack onClick={handleGoBack}>
        <ArrowLeftOutlined width={24} height={24} color={colors.label} />
      </StyledBack>

      <StyledWrapper>
        <StyledTitle>{t("loginPage.title")}</StyledTitle>
        <StyledSubtitle>{t("loginPage.subtitle")}</StyledSubtitle>
        <FormPhoneNumber showDefaultLabel={false} />
      </StyledWrapper>

      <StyledFooter>
        <StyledOTPButton
          phoneNumber={phoneNumber}
          disabled={!shouldEnableBtn()}
          onApiSuccess={handleSuccessSendOtp}
        >
          <LinkLabelSmallSemiBold>
            {t("loginPage.submit")}
          </LinkLabelSmallSemiBold>
        </StyledOTPButton>

        <LegalText />
      </StyledFooter>
    </StyledPage>
  );
}

const PagePadding = "16px";

const StyledPage = styled.div`
  width: 100%;
  height: ${screenHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${colors.offWhite};
  padding: ${PagePadding};
`;

const StyledBack = styled.div`
  margin-bottom: 32px;
`;

const StyledWrapper = styled.div`
  flex-grow: 1;
`;

const StyledTitle = styled(H2MediumBold)`
  color: ${colors.title};
  margin-bottom: 22px;
`;

const StyledSubtitle = styled.div`
  ${TextSmallRegularStyle};
  color: ${colors.body};
  margin-bottom: 44px;
`;

const StyledFooter = styled.div`
  padding-bottom: 20px;
  max-width: ${maxPageWidth};
  margin: 0 auto;
`;

const StyledOTPButton = styled(SendOtp)`
  width: 100%;
`;
