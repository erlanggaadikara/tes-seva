import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "components/Button/Button";
import { useTranslation } from "react-i18next";
import { Folder } from "./images/Folder";
import { colors } from "styles/colors";
import { H2MediumBoldStyle } from "components/typography/H2MediumBold";
import { TextSmallRegularStyle } from "components/typography/TextSmallRegular";
import { TextLargeBoldStyle } from "components/typography/TextLargeBold";
import { Check } from "components/icon/Check/Check";
import { Close } from "components/icon/Close/Close";
import { ToastType, useToast } from "components/Toast/Toast";
import { Config } from "./BrickLinkCalcRequestPage.config";
import { useHistory } from "react-router-dom";
import { preApprovalSMSUrl } from "routes/routes";
import { submitPreApprovalCalcRequest } from "services/preApproval";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { handlePreApprovalFlowError } from "services/preApproval";
import { Footer } from "components/Footer/Footer";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { trackViewPreapprovalProcessing } from "helpers/amplitude/preApprovalEventTracking";

export default function BrickLinkCalcRequestPage() {
  useAmplitudePageView(trackViewPreapprovalProcessing);

  const history = useHistory();

  const { showToast, RenderToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [bankId, setBankId] = useState<string | null>(null);
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get("accessToken");
    const bankId = urlParams.get("bankId");
    setBankId(bankId);
    setAccessToken(accessToken);
  }, []);

  const onCTA = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    submitPreApprovalCalcRequest({
      accessToken,
      bankId,
      bankLink: !!accessToken,
      monthlyIncome: Number(surveyFormData.totalIncome?.value),
    })
      .then(() => {
        history.replace(preApprovalSMSUrl);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        handlePreApprovalFlowError("bankLinking", e, history, showToast);
      });
  };

  const renderProgressStatusIcon = (
    isFirstItem: boolean,
    isLastItem: boolean
  ) => {
    if (isFirstItem) {
      return <Check color={colors.white} />;
    } else if (isLastItem) {
      return !!accessToken ? (
        <Check color={colors.secondary} />
      ) : (
        <Close width={17} height={17} color={colors.error} />
      );
    } else {
      return <Check color={colors.secondary} />;
    }
  };

  return (
    <StyledWrapper>
      <StyledContainer>
        <Folder />
        <StyledTitle>
          {t("preApprovalProgress.calcRequestPage.title")}
        </StyledTitle>
        <StyledDesc>{t("preApprovalProgress.calcRequestPage.desc")}</StyledDesc>
        <StyledProgressContainer>
          {Config.map((config, index) => {
            const isFirstItem = index === 0;
            const isLastItem = index === Config.length - 1;
            return (
              <div key={index}>
                <StyledProgressItem key={index}>
                  <StyledFillCheck fill={isFirstItem}>
                    {renderProgressStatusIcon(isFirstItem, isLastItem)}
                  </StyledFillCheck>
                  {isFirstItem ? (
                    <StyledProgressTitle>{t(config)}</StyledProgressTitle>
                  ) : (
                    <StyledProgressText>{t(config)}</StyledProgressText>
                  )}
                </StyledProgressItem>
                {!isLastItem && <StyledProgressIndicatorLine />}
              </div>
            );
          })}
        </StyledProgressContainer>
      </StyledContainer>
      <StyledButtonContainer>
        <Button width={"100%"} onClick={onCTA} loading={isLoading}>
          {t("preApprovalProgress.calcRequestPage.cta")}
        </Button>
      </StyledButtonContainer>
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </StyledWrapper>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  background-color: ${colors.white};
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 38px;
  justify-content: space-between;
  height: 100vh;
  background-color: ${colors.white};
`;

const StyledTitle = styled.span`
  ${H2MediumBoldStyle};
  margin-top: 12px;
  color: ${colors.title};
`;

const StyledDesc = styled.span`
  ${TextSmallRegularStyle};
  text-align: center;
  margin: 5px 25px 0;
  color: ${colors.body};
`;

const StyledProgressContainer = styled.div`
  background: ${colors.white};
  box-shadow: 0 1px 16px rgba(3, 24, 56, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding: 24px;
  width: calc(100% - 32px);
`;

const StyledProgressItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledFillCheck = styled.div<{ fill: boolean }>`
  background-color: ${({ fill }) =>
    fill ? colors.primaryLight1 : colors.white};
  border-radius: 50%;
  padding: 10px 8px 6px;
`;

const StyledProgressTitle = styled.span`
  ${TextLargeBoldStyle};
  margin-left: 16px;
  color: ${colors.title};
`;

const StyledProgressText = styled.span`
  ${TextSmallRegularStyle};
  margin-left: 16px;
  color: ${colors.title};
`;
const StyledProgressIndicatorLine = styled.div`
  border: 1px solid ${colors.line};
  width: 2px;
  height: 20px;
  margin-left: 15px;
`;

const StyledButtonContainer = styled(Footer)`
  background: ${colors.white};
  box-shadow: 0 1px 16px rgba(3, 24, 56, 0.1);
  margin-top: 24px;
  width: 100%;
  padding: 16px;
`;
