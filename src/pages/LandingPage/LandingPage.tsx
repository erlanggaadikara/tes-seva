import React, { useEffect } from "react";
import styled from "styled-components";
import { MasterImage } from "./images/MasterImage/MasterImage";
import { useTranslation } from "react-i18next";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { Button, ButtonType } from "components/Button/Button";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { ALink } from "components/ALink/ALink";
import { LanguageSetting } from "./LanguageSetting/LanguageSetting";
import { colors } from "styles/colors";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { useHistory } from "react-router-dom";
import { surveyFormUrl } from "routes/routes";
import { H2MediumBold } from "components/typography/H2MediumBold";
import {
  trackSurveyLandingPage,
  trackStartSurvey,
} from "helpers/trackingEvents";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";

export default function LandingPage() {
  const { t } = useTranslation();

  const history = useHistory();
  const goToSurveyForm = () => {
    trackStartSurvey();
    history.push(surveyFormUrl);
  };
  const [currentLanguage] = useCurrentLanguage();

  useEffect(() => {
    trackSurveyLandingPage(currentLanguage);
  }, []);

  return (
    <StyledLandingPage>
      <StyledWrapper>
        <StyledLanguageSetting>
          <LanguageSetting />
        </StyledLanguageSetting>
        <MasterImage width={"90%"} height={"auto"} />
        <StyledTitle>{t("landingPage.title")}</StyledTitle>

        <StyledSubtitle>
          <TextSmallRegular>{t("landingPage.subtitle")}</TextSmallRegular>
        </StyledSubtitle>
        <Button
          buttonType={ButtonType.primary1}
          width={"73%"}
          onClick={goToSurveyForm}
        >
          <LinkLabelSmallSemiBold>
            {t("landingPage.forwardButtonText")}
          </LinkLabelSmallSemiBold>
        </Button>
        <StyledLegalText>
          <TextLegalMedium>{t("landingPage.legal.beginText")}</TextLegalMedium>
          <ALink href={"/terms-conditions"} target="_self">
            <StyledLinkText>
              {t("landingPage.legal.termsAndConditions")}
            </StyledLinkText>
          </ALink>
          <TextLegalMedium>{t("landingPage.legal.and")}</TextLegalMedium>
          <ALink href={"/privacy-policy"}>
            <StyledLinkText>
              {t("landingPage.legal.privacyPolicy")}
            </StyledLinkText>
          </ALink>
          <span>.</span>
        </StyledLegalText>
      </StyledWrapper>
    </StyledLandingPage>
  );
}
const StyledLandingPage = styled.section`
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;
const StyledWrapper = styled.div`
  width: 90%;
  padding: 60px 0 24px;
`;
const StyledTitle = styled(H2MediumBold)`
  margin-top: 30px;
  padding: 0 34px;
`;
const StyledSubtitle = styled.p`
  margin: 30px 20px 38px;
`;
const StyledLegalText = styled.p`
  margin-top: 18px;
  color: ${colors.placeholder};
`;
const StyledLanguageSetting = styled.div`
  position: absolute;
  right: 5%;
  top: 28px;
`;
const StyledLinkText = styled(TextLegalMedium)`
  color: ${colors.primary1};
`;
