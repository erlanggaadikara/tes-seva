import React from "react";
import styled from "styled-components";
import { surveyFormUrl } from "routes/routes";
import { useHistory } from "react-router-dom";
import background from "./images/bg.png";
import { SurveyImage } from "./images/Survey/Survey";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { useTranslation } from "react-i18next";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { Button, ButtonType } from "components/Button/Button";
import { colors } from "styles/colors";
import { trackSelectHomeStartSurvey } from "helpers/amplitude/newHomePageEventTracking";

export const SurveySection = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const onCTA = () => {
    trackSelectHomeStartSurvey();
    history.push(surveyFormUrl);
  };

  return (
    <StyledContainer>
      <StyledContentContainer>
        <StyledSurveyImageContainer>
          <SurveyImage width={"100%"} height={"100%"} />
        </StyledSurveyImageContainer>
        <StyledTitle>
          <H2MediumBold>{t("homePageSearch.survey.title")}</H2MediumBold>
        </StyledTitle>
        <StyledDesc>
          <TextMediumRegular>
            {t("homePageSearch.survey.desc")}
          </TextMediumRegular>
        </StyledDesc>
        <StyledButton
          width="90%"
          buttonType={ButtonType.primary1}
          onClick={onCTA}
        >
          {t(`homePageSearch.survey.cta`)}
        </StyledButton>
      </StyledContentContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background: url(${background});
  background-size: cover;
  padding: 48px 16px 56px;
`;

const StyledContentContainer = styled.div`
  padding: 0 24px 48px;
  background-color: ${colors.white};
  box-shadow: 0 1px 16px rgba(3, 24, 56, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const StyledSurveyImageContainer = styled.div`
  display: flex;
`;
const StyledTitle = styled.div`
  text-align: center;
  margin: 16px;
`;

const StyledDesc = styled.div`
  text-align: center;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 54px;
`;

const StyledButton = styled(Button)`
  flex-shrink: 0;
`;
