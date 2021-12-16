import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AxiosError, AxiosResponse } from "axios";
import {
  CarVariantDetails,
  CustomerInfo,
  CarModelBasicDetailsResponse,
} from "types/types";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { useCountDownTimer } from "hooks/useCountDownTimer/useCountDownTimer";
import { DownloadCountdown } from "./component/DownloadGuide";
import { Button, ButtonType } from "components/Button/Button";
import { CongratulationsHeader } from "./component/CongratulationsHeader";
import styled from "styled-components";
import { recommendationsUrl, surveyFormUrl } from "routes/routes";
import { useHistory } from "react-router-dom";
import {
  HTTPResponseStatusCode,
  LoanRank,
  LocalStorageKey,
} from "models/models";
import { getCustomerInfoWrapper } from "services/customer";
import { colors } from "styles/colors";
import { screenHeight } from "styles/GlobalStyle";
import { useContextCarVariantDetails } from "context/carVariantDetailsContext/carVariantDetailsContext";
import {
  getCarModelDetailsById,
  getCarVariantDetailsById,
} from "services/recommendations";
import { ModelOrVariantDetails } from "./component/ModelOrVariantDetails";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";

export default function AppDownloadPage() {
  const { t } = useTranslation();
  const contactFormData = useContextContactFormData();
  const phoneNumber = contactFormData.phoneNumber;
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();
  const [isOverLimitTime, setOverLimitTime] = useState<boolean>();
  const { carVariantDetails } = useContextCarVariantDetails();
  const [carVariantDetailsForDisplay, setCarVariantDetailsForDisplay] =
    useState<CarVariantDetails>();
  const [carModelDetailForDisplay, setCarModelDetailForDisplay] =
    useState<CarModelBasicDetailsResponse>();
  const [, setCurrentStep] = useLocalStorage<number>(
    LocalStorageKey.CurrentStep,
    -1
  );
  const limitTime = 48 * 60 * 60 * 1000;
  const history = useHistory();
  const onEndOfTime = () => {
    setOverLimitTime(true);
  };
  const { countDownTime, startCountDownTime, setCountDownTimeInMilliseconds } =
    useCountDownTimer({
      countDownTimeInMilliseconds: limitTime,
      onEndOfTime,
    });
  const { showToast, RenderToast } = useToast();
  const getCustomerInfoFromNet = () => {
    if (!phoneNumber) {
      showToast();
      return;
    }
    getCustomerInfoWrapper()
      .then((response: AxiosResponse<CustomerInfo>) => {
        const customerInfo = response.data;
        setCustomerInfo(customerInfo);
        if (customerInfo.variantId) {
          const loanRank: LoanRank =
            LoanRank[customerInfo.loanRank as keyof typeof LoanRank];
          const loanDetail = {
            loanRank,
            tenure: customerInfo.loanTenure,
            dpAmount: customerInfo.loanDownPayment,
            monthlyInstallment: customerInfo.loanMonthlyInstallment,
          };
          if (!carVariantDetails) {
            getCarVariantDetailsById(customerInfo.variantId).then(
              (response: AxiosResponse<CarVariantDetails>) => {
                setCarVariantDetailsForDisplay({
                  ...response.data,
                  loanDetail,
                });
              }
            );
          } else {
            setCarVariantDetailsForDisplay({
              ...carVariantDetails,
              loanDetail,
            });
          }
        } else {
          getCarModelDetailsById(customerInfo.modelId).then(
            (response: AxiosResponse<CarModelBasicDetailsResponse>) => {
              setCarModelDetailForDisplay({
                ...response.data,
              });
            }
          );
        }
        getCountTimer(customerInfo.createdAt);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === HTTPResponseStatusCode.Unauthorized) {
          history.push(recommendationsUrl);
        } else {
          showToast();
        }
      });
  };
  const getCountTimer = (createdTime: number) => {
    let now = new Date().getTime();
    if (now < createdTime) {
      now = createdTime;
    }
    const time = limitTime - (now - createdTime);
    if (time < 0) {
      setOverLimitTime(true);
    } else {
      setOverLimitTime(false);
      setCountDownTimeInMilliseconds(time);
      startCountDownTime();
    }
  };

  const goToFormPage = () => {
    setCurrentStep(0);
    history.push(surveyFormUrl);
  };

  useEffect(getCustomerInfoFromNet, []);
  return (
    <>
      {customerInfo ? (
        <StyledPage>
          {isOverLimitTime && (
            <ModelOrVariantDetails
              carVariantDetailsForDisplay={carVariantDetailsForDisplay}
              carModelDetailForDisplay={carModelDetailForDisplay}
            />
          )}
          <StyledCongratulations>
            {!isOverLimitTime && <CongratulationsHeader />}
            <StyledDownloadGuide
              countDownTime={isOverLimitTime ? undefined : countDownTime}
            />
          </StyledCongratulations>
          {isOverLimitTime && (
            <StyledButton>
              <Button
                width={"100%"}
                buttonType={ButtonType.secondary1}
                onClick={goToFormPage}
              >
                {t("appDownloadPage.retake")}
              </Button>
            </StyledButton>
          )}
        </StyledPage>
      ) : (
        <></>
      )}
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </>
  );
}
const StyledCongratulations = styled.div`
  text-align: center;
  padding: 0 14px 21px 18px;
`;

const StyledPage = styled.div`
  background-color: ${colors.carBg};
  min-height: ${screenHeight - 80}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px 28px 16px;
`;
const StyledDownloadGuide = styled(DownloadCountdown)`
  margin-top: 16px;
`;
