import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { Button, ButtonType } from "components/Button/Button";
import { CarDetail } from "./components/CarDetail";
import { LoanDetail } from "component/LoanDetail/LoanDetail";
import { Loading } from "./components/Loading";
import { ProgressInfo } from "./components/ProgressInfo";
import { getPreApprovalResultByCustomId } from "services/preApproval";
import { CustomerPreApprovalResponse } from "types/types";
import urls from "helpers/urls";
import { preApprovalFailureUrl } from "routes/routes";
import { Footer } from "components/Footer/Footer";
import { DownloadCountdown } from "pages/AppDownloadPage/component/DownloadGuide";
import { useCountDownTimer } from "hooks/useCountDownTimer/useCountDownTimer";
import { getCustomerAssistantWhatsAppNumber } from "services/lead";
import { CustomerPreApprovalStatus } from "models/models";
import { PageHeader } from "component/PageHeader/PageHeader";
import { Line } from "components/Line/Line";
import {
  trackViewPreapprovalSuccess,
  trackSelectPreapprovalSuccessStartApplication,
  trackSelectPreapprovalSuccessDownload,
  trackSelectPreapprovalSuccessWhatsApp,
  trackViewPreapprovalRejected,
} from "helpers/amplitude/preApprovalEventTracking";
import { convertSlashesInStringToVerticalLines } from "utils/stringUtils";
export default function PreApprovalConfirmationPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const limitTime = 48 * 60 * 60 * 1000;
  const [isOverLimitTime, setOverLimitTime] = useState<boolean>();
  const { customerId }: { customerId: string } = useParams();
  const [approvalInfo, setApprovalInfo] =
    useState<CustomerPreApprovalResponse | null>(null);
  const onEndOfTime = () => {
    setOverLimitTime(true);
  };
  const [loadingWhatsApp, setLoadingWhatsApp] = useState(false);
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

  const { countDownTime, startCountDownTime, setCountDownTimeInMilliseconds } =
    useCountDownTimer({
      countDownTimeInMilliseconds: limitTime,
      onEndOfTime,
    });

  const onChatToAgentClick = async () => {
    if (!approvalInfo) {
      return;
    }
    const {
      loanDownPayment,
      loanMonthlyInstallment,
      variantDetail: { name },
      modelDetail: { brand, model },
    } = approvalInfo;
    const message = t("preApprovalProgress.confirm.whatsAppMessage", {
      carBrand: brand,
      carModel: model,
      carVariant: convertSlashesInStringToVerticalLines(name),
      dp: loanDownPayment,
      monthlyInstalment: loanMonthlyInstallment,
    });
    setLoadingWhatsApp(true);
    const whatsAppUrl = await getCustomerAssistantWhatsAppNumber();
    setLoadingWhatsApp(false);
    window.open(`${whatsAppUrl}?text=${encodeURI(message)}`, "_blank");
    trackSelectPreapprovalSuccessWhatsApp();
  };

  const onStartApplication = () => {
    window.open(urls.googlePlayHref);
    trackSelectPreapprovalSuccessStartApplication();
  };

  const onGooglePlayClick = () => {
    trackSelectPreapprovalSuccessDownload();
  };

  useEffect(() => {
    setLoading(true);
    getPreApprovalResultByCustomId(customerId)
      .then((response: AxiosResponse<CustomerPreApprovalResponse>) => {
        setLoading(false);
        if (response.data.status === CustomerPreApprovalStatus.Success) {
          trackViewPreapprovalSuccess();
          setApprovalInfo(response.data);
          getCountTimer(response.data.finishedAt);
        } else {
          trackViewPreapprovalRejected("final", response.data.status);
          history.push(preApprovalFailureUrl);
        }
      })
      .catch(() => {
        history.push(preApprovalFailureUrl);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <StyledWrapper>
      <PageHeader />
      <Line width={"100%"} height={"1px"} background={colors.line} />
      <StyledContentWrapper>
        <ProgressInfo finco={approvalInfo?.finco} />
        {approvalInfo?.modelDetail && (
          <StyledCarAndLoanInfo>
            <CarDetail
              carModel={approvalInfo.modelDetail}
              variant={approvalInfo.variantDetail}
            />
            <StyledSeparator />
            <LoanDetail
              monthlyInstallment={approvalInfo.loanMonthlyInstallment}
              downPayment={approvalInfo.loanDownPayment}
              tenure={approvalInfo.loanTenure}
              finco={approvalInfo?.finco}
            />
          </StyledCarAndLoanInfo>
        )}
        <StyledDownloadGuide
          countDownTime={isOverLimitTime ? undefined : countDownTime}
          onGooglePlayClick={onGooglePlayClick}
        />
      </StyledContentWrapper>
      <Footer showShadow={true}>
        <Button width={"100%"} onClick={onStartApplication}>
          {t("preApprovalProgress.confirm.startBtn")}
        </Button>
        <StyledAdvisorBtn
          width={"100%"}
          buttonType={ButtonType.secondary1}
          onClick={onChatToAgentClick}
          loading={loadingWhatsApp}
        >
          {t("preApprovalProgress.confirm.chatBtn")}
        </StyledAdvisorBtn>
      </Footer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: ${colors.offWhite};
  text-align: center;
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

const StyledContentWrapper = styled.div`
  padding-bottom: 148px;
`;

const StyledCarAndLoanInfo = styled.div`
  margin: 0 16px;
  box-shadow: 0 1px 16px rgba(3, 24, 56, 0.1);
  border-radius: 16px;
  overflow: hidden;
`;

const StyledSeparator = styled.div`
  border: 1px solid ${colors.line};
  margin: 0 16px;
`;

const StyledAdvisorBtn = styled(Button)`
  margin-top: 18px;
`;

const StyledDownloadGuide = styled(DownloadCountdown)`
  margin: 16px 16px;
`;
