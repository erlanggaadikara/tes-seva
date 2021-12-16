import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import image from "images/survey-image.png";
import background from "images/survey-background.png";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { Button, ButtonType } from "components/Button/Button";
import {
  trackTakeCarResultsSurvey,
  trackViewCarResult,
} from "helpers/amplitude/newFunnelEventTracking";
import {
  useAmplitudePageView,
  useCarResultParameter,
} from "hooks/useAmplitudePageView/useAmplitudePageView";
import { surveyFormUrl } from "routes/routes";

export const TakeSurveyTile = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const carResultParameters = useCarResultParameter();
  useAmplitudePageView(() => {
    trackViewCarResult(carResultParameters);
  });

  const goToSurveyForm = () => {
    trackTakeCarResultsSurvey(carResultParameters);
    history.push(surveyFormUrl);
  };

  return (
    <StyledTileWrapper>
      <Tile>
        <ContentWrapper>
          <StyledImage src={image} />
          <StyledTitle
            dangerouslySetInnerHTML={{
              __html: t("carResultsPage.surveyTitle"),
            }}
          />
          <StyledSubtitleText>
            {t(`carResultsPage.surveySubtitle`)}
          </StyledSubtitleText>
          <StyledButton
            height={"40px"}
            buttonType={ButtonType.subtle}
            loading={false}
            onClick={goToSurveyForm}
          >
            <LinkLabelSmallSemiBold>
              {t(`carResultsPage.surveyButton`)}
            </LinkLabelSmallSemiBold>
          </StyledButton>
        </ContentWrapper>
      </Tile>
    </StyledTileWrapper>
  );
};

const StyledTileWrapper = styled.div`
  border-radius: 8px;
  filter: drop-shadow(0px 32px 64px rgba(17, 17, 17, 0.08));
  margin-bottom: 16px;
`;

const Tile = styled.div`
  width: 100%;
  background: url(${background}) no-repeat center;
  background-size: cover;
  border-radius: 8px;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
`;

const StyledImage = styled.img`
  max-width: 50%;
  height: auto;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.white};
  font-size: 30px;
  text-align: center;
`;

const StyledSubtitleText = styled(LinkLabelLegalSemiBold)`
  color: ${colors.white};
  font-size: 15px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background: ${colors.secondary};
`;
