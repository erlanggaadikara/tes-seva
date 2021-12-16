import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { H2MediumBold } from "components/typography/H2MediumBold";
import {
  CarRecommendation,
  CarRecommendationResponse,
  CarVariantLoan,
} from "types/types";
import {
  getCarModelDetailsById,
  getCarRecommendations,
  handleCarModelDetailsUpdate,
  handleCarRecommendationsError,
} from "services/recommendations";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import styled, { css } from "styled-components";
import { colors } from "styles/colors";
import { CarModelTile } from "./CarModelTile/CarModelTile";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { AlertInfo } from "components/icon/AlertInfo/AlertInfo";
import { Button, ButtonType } from "components/Button/Button";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { CarTileSize, LoanRank, LocalStorageKey } from "models/models";
import { ColorNotification } from "./ColorNotification/ColorNotification";
import {
  modelDetailsUrl,
  recommendationsUrl,
  scheduleAppointmentUrl,
  surveyFormUrl,
} from "routes/routes";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import { Loading } from "component/loading/Loading";
import { maxPageWidth } from "styles/GlobalStyle";
import {
  trackSelectCar,
  trackViewRecommendations,
} from "helpers/trackingEvents";
import { handleProgressUpdate } from "component/loading/loadingUtils";

const FinancialStepIndex = 6;

export default function Recommendations() {
  const { t } = useTranslation();
  const history = useHistory();
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);
  const [currentStep, setCurrentStep] = useLocalStorage<number>(
    LocalStorageKey.CurrentStep,
    -1
  );
  const { recommendations, setRecommendations } = useContextRecommendations();
  const { setCarModelDetails } = useContextCarModelDetails();
  const { showToast, RenderToast } = useToast();

  const [isColorNotificationVisible, setIsColorNotificationVisible] =
    useState(false);
  const [colorNotificationModalShown] = useLocalStorage(
    LocalStorageKey.ColorNotificationModalShown,
    false
  );
  const [, setLoanDetails] = useLocalStorage<CarVariantLoan | null>(
    LocalStorageKey.SelectedLoan,
    null
  );

  const showColorNotificationModal = () => {
    setIsColorNotificationVisible(true);
  };
  const hideColorNotificationModal = () => {
    setIsColorNotificationVisible(false);
  };
  useEffect(() => {
    !colorNotificationModalShown && showColorNotificationModal();
  }, [colorNotificationModalShown]);

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };

  useEffect(() => {
    if (recommendations.length === 0) {
      setShowLoading(true);
      getCarRecommendations({
        onDownloadProgress: handleProgressUpdate(setProgress),
      })
        .then((response: AxiosResponse<CarRecommendationResponse>) => {
          setRecommendations(response.data.carRecommendations || []);
          resetLoadingState();
        })
        .catch((e) => {
          resetLoadingState();
          handleCarRecommendationsError(e, history, showToast);
        });
    }
    trackViewRecommendations();
  }, []);

  const greenOptions = recommendations.filter(
    (car: CarRecommendation) => car.loanRank === LoanRank.Green
  );
  const hasGreenOptions = greenOptions.length > 0;
  const nonGreenOptions = recommendations.filter(
    (car: CarRecommendation) => car.loanRank !== LoanRank.Green
  );
  const greenSectionCars = hasGreenOptions ? greenOptions : nonGreenOptions;

  const handleAdjustButtonClick = () => {
    currentStep >= 0 && setCurrentStep(FinancialStepIndex);
    history.push(surveyFormUrl);
  };

  const goToScheduleAppointment = (
    { id: modelId, loanRank }: CarRecommendation,
    index: number
  ) => {
    setLoanDetails({
      modelId,
      loanRank,
    });
    trackSelectCar(index, modelId, loanRank, "contact_us_car_results");
    history.push({
      pathname: scheduleAppointmentUrl,
      state: {
        from: recommendationsUrl,
      },
    });
  };

  const handleCarTileClick = (
    { id: modelId, loanRank }: CarRecommendation,
    index: number
  ) => {
    setLoanDetails({
      modelId,
      loanRank,
    });
    trackSelectCar(index, modelId, loanRank, "view_more_car_results");
    getCarModelDetailsById(modelId)
      .then(handleCarModelDetailsUpdate(recommendations, setCarModelDetails))
      .then(() => {
        history.push(modelDetailsUrl.replace(":id", modelId));
      })
      .catch((error) => {
        console.log(error);
        showToast();
      });
  };

  return (
    <StyledRecommendationsPage hasGreenOptions={hasGreenOptions}>
      <EasierChanceSection>
        <TitleWrapper>
          <StyledTitle>{t("recommendations.title")}</StyledTitle>
          <div onClick={showColorNotificationModal}>
            <AlertInfo color={"#F7AA20"} width={14} />
          </div>
        </TitleWrapper>
        <StyledMessage>
          {hasGreenOptions
            ? t("recommendations.message")
            : t("recommendations.noGreenMessage")}
        </StyledMessage>
        {greenSectionCars.map((car, index) => {
          return (
            <CarModelTile
              key={car.id}
              recommendation={car}
              size={CarTileSize.Big}
              onModelClick={() => handleCarTileClick(car, index)}
              onClickContactUs={() => goToScheduleAppointment(car, index)}
            />
          );
        })}
      </EasierChanceSection>
      {hasGreenOptions && nonGreenOptions.length > 0 && (
        <HarderChanceSection>
          <HarderChanceSectionHeader>
            <LinkLabelSmallSemiBold>
              {t("recommendations.otherOptions.title").toUpperCase()}
            </LinkLabelSmallSemiBold>
            <StyledMessage>{t("recommendations.message")}</StyledMessage>
          </HarderChanceSectionHeader>
          <HarderChanceOptionsContainer>
            {nonGreenOptions.map((car, index) => {
              return (
                <CarWrapper key={car.id}>
                  <CarModelTile
                    recommendation={car}
                    size={CarTileSize.Small}
                    onModelClick={() => handleCarTileClick(car, index)}
                    onClickContactUs={() => goToScheduleAppointment(car, index)}
                  />
                </CarWrapper>
              );
            })}
          </HarderChanceOptionsContainer>
        </HarderChanceSection>
      )}
      <AdjustButtonWrapper hasGreenOptions={hasGreenOptions}>
        <StyledButton
          hasGreenOptions={hasGreenOptions}
          width="90%"
          buttonType={
            hasGreenOptions ? ButtonType.secondary1 : ButtonType.primary1
          }
          onClick={handleAdjustButtonClick}
        >
          {t("recommendations.button")}
        </StyledButton>
      </AdjustButtonWrapper>

      <ColorNotification
        isVisible={isColorNotificationVisible}
        onClose={hideColorNotificationModal}
      />
      <Loading isShowLoading={isShowLoading} progress={progress} />
      <RenderToast
        type={ToastType.Error}
        message={t("common.recommendationErrorMessage")}
      />
    </StyledRecommendationsPage>
  );
}

const PagePadding = "16px";

interface AdjustProps {
  hasGreenOptions: boolean;
}

const StyledRecommendationsPage = styled.div<AdjustProps>`
  width: 100%;
  min-height: 100vh;
  background: ${colors.carBg};
  padding-bottom: ${({ hasGreenOptions }) =>
    hasGreenOptions ? "6px" : "170px"};
`;

const EasierChanceSection = styled.section`
  width: 100%;
  padding: 24px ${PagePadding};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTitle = styled(H2MediumBold)`
  color: ${colors.title};
  margin-right: 8px;
`;

const StyledMessage = styled(TextSmallRegular)`
  display: block;
  margin: 8px 0 40px;
  color: ${colors.label};
`;

const HarderChanceSection = styled.div`
  padding: 24px 0;
`;

const HarderChanceSectionHeader = styled.div`
  padding: 0 ${PagePadding};
  color: ${colors.label};

  ${StyledMessage} {
    margin: 8px 0 24px;
  }
`;

const HarderChanceOptionsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 ${PagePadding};

  ::-webkit-scrollbar {
    display: none;
  }
`;

const CarWrapper = styled.div`
  flex: 0 0 auto;
  margin-right: 20px;

  :last-child {
    padding-right: ${PagePadding};
  }
`;

const AdjustButtonWrapper = styled.div<AdjustProps>`
  width: 100%;
  display: flex;
  justify-content: space-around;

  ${({ hasGreenOptions }) =>
    hasGreenOptions
      ? css`
          flex-direction: column-reverse;
          margin-top: 6px;
        `
      : css`
          flex-direction: column;
          position: fixed;
          left: 0;
          right: 0;
          margin-left: auto;
          margin-right: auto;
          bottom: 0;
          z-index: 2;
          max-width: ${maxPageWidth};
          background: ${colors.white};
          padding: 16px 0;
        `}
`;

const StyledButton = styled(Button)<{ hasGreenOptions: boolean }>`
  margin-bottom: ${({ hasGreenOptions }) => (hasGreenOptions ? "24px" : "0px")};
`;
