import React, { useEffect } from "react";
import { ArrowLeftOutlined } from "components/icon/ArrowLeftOutlined/ArrowLeftOutlined";
import { colors } from "styles/colors";
import {
  modelDetailsUrl,
  otpInputPage,
  recommendationsUrl,
  variantDetailsUrl,
} from "routes/routes";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { H2MediumBold } from "components/typography/H2MediumBold";
import styled from "styled-components";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { FormPurchaseTime } from "./FormPurchaseTime/FormPurchaseTime";
import { FormContactTime } from "./FormContactTime/FormContactTime";
import {
  FormPhoneNumber,
  isValidPhoneNumber,
} from "./FormPhoneNumber/FormPhoneNumber";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";
import { SendOtp } from "./SendOtp/SendOtp";
import { LocalStorageKey, LocationStateKey } from "models/models";
import { CarVariantLoan } from "types/types";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { screenHeight } from "styles/GlobalStyle";
import {
  ContactFromPage,
  trackViewContactScreen,
} from "helpers/trackingEvents";
import { FormName } from "./FormName/FormName";

export default function ScheduleAppointmentPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const { name, purchaseTime, contactTime, phoneNumber } =
    useContextContactFormData();
  const [selectedLoanDetails] = useLocalStorage<CarVariantLoan | null>(
    LocalStorageKey.SelectedLoan,
    null
  );
  const location = useLocation<{ from: string } | undefined>();

  const handleGoBack = () => {
    const from = location.state?.from;
    const variantId = selectedLoanDetails?.id;
    if (from) {
      history.push(from);
    } else if (variantId) {
      history.push(variantDetailsUrl.replace(":id", variantId));
    } else {
      history.push(recommendationsUrl);
    }
  };

  const shouldEnableBtn = () => {
    return (
      name &&
      purchaseTime &&
      contactTime &&
      phoneNumber &&
      isValidPhoneNumber(phoneNumber)
    );
  };
  const handleSuccessSendOtp = () => {
    history.push({
      pathname: otpInputPage,
      state: {
        [LocationStateKey.OtpSent]: true,
        [LocationStateKey.IsFromLoginPage]: false,
      },
    });
  };

  useEffect(() => {
    const from = location.state?.from;
    let fromPage: ContactFromPage;
    if (from === recommendationsUrl) {
      fromPage = "car_recommendation";
    } else if (
      from?.indexOf(
        modelDetailsUrl.substring(0, modelDetailsUrl.lastIndexOf("/"))
      ) !== -1
    ) {
      fromPage = "model_selection";
    } else if (
      from?.indexOf(
        variantDetailsUrl.substring(0, variantDetailsUrl.lastIndexOf("/"))
      ) !== -1
    ) {
      fromPage = "loan_selection";
    } else {
      fromPage = "car_recommendation";
    }
    trackViewContactScreen(fromPage);
  }, []);

  return (
    <>
      <StyledPage>
        <div>
          <div onClick={handleGoBack}>
            <ArrowLeftOutlined width={24} height={24} color={colors.label} />
          </div>
          <StyledMessage>
            <H2MediumBold>{t("scheduleAppointmentPage.congrats")}</H2MediumBold>
          </StyledMessage>
          <StyledFormTitle>
            <TextSmallRegular>
              {t("scheduleAppointmentPage.form.title")}
            </TextSmallRegular>
          </StyledFormTitle>
          <FormName />
          <FormPurchaseTime />
          <FormContactTime />
          <FormPhoneNumber />
        </div>
        <StyledOTPButton
          phoneNumber={phoneNumber}
          disabled={!shouldEnableBtn()}
          onApiSuccess={handleSuccessSendOtp}
        >
          <LinkLabelSmallSemiBold>
            {t("scheduleAppointmentPage.form.submit")}
          </LinkLabelSmallSemiBold>
        </StyledOTPButton>
      </StyledPage>
    </>
  );
}

const PagePadding = "16px";

const StyledPage = styled.div`
  width: 100%;
  min-height: ${screenHeight - 80}px;
  display: flex;
  flex-direction: column;
  background: ${colors.pageBg};
  padding: ${PagePadding};
  height: 100vh;
`;

const StyledMessage = styled.div`
  margin: 36px 0 15px 0;
  color: ${colors.title};
`;

const StyledFormTitle = styled.div`
  color: ${colors.body};
  margin-bottom: 16px;
`;

const StyledOTPButton = styled(SendOtp)`
  margin: 46px auto 7px;
  width: 100%;
`;
