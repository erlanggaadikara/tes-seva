import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import { FunnelItemStepAction, LanguageCode } from "models/models";
import styled from "styled-components";
import { colors } from "styles/colors";
import React, { ReactElement } from "react";
import funnelLandingPageStepDesId from "./images/funnelBackgroundStepDesId.png";
import funnelLandingPageStepDesEn from "./images/funnelBackgroundStepDesEn.png";
import { surveyFormUrl } from "routes/routes";
import { useHistory } from "react-router-dom";
import { FunnelStepItem } from "./FunnelStepItem/FunnelStepItem";
import { ALink } from "components/ALink/ALink";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { funnelBackgroundStepsConfig } from "./funnelBackground.config";
import urls from "helpers/urls";
import { useTranslation } from "react-i18next";
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import { PageHeader } from "PageHeader/PageHeader";
import { contactUsUrl } from "routes/routes";

interface BgImageProps {
  originBgImage: string;
  webpBgImage: string;
}

interface FunnelBackgroundProp {
  bgImage: BgImageProps;
  children: ReactElement;
}

export const FunnelBackground = ({
  bgImage,
  children,
}: FunnelBackgroundProp) => {
  const { t } = useTranslation();
  const [currentLanguage] = useCurrentLanguage();
  const history = useHistory();

  const onClick = (action: FunnelItemStepAction) => {
    switch (action) {
      case FunnelItemStepAction.SurveyContent:
      case FunnelItemStepAction.PickCar:
      case FunnelItemStepAction.TalkToAgents:
        history.push(surveyFormUrl);
        break;
      case FunnelItemStepAction.TrackProgress:
      default:
        break;
    }
  };

  const getHeaderElement = (bgImage: BgImageProps) => (
    <WebpPicture
      src={bgImage.webpBgImage}
      fallbackImage={
        <StyledHeaderImg alt="image" src={bgImage.originBgImage} />
      }
    />
  );

  const getContentElement = () => <StyledContent>{children}</StyledContent>;

  const getBottomElement = () => (
    <StyledBottom>
      <StyledStepDesContainer
        src={
          currentLanguage == LanguageCode.id
            ? funnelLandingPageStepDesId
            : funnelLandingPageStepDesEn
        }
        alt={"image"}
      />
      {funnelBackgroundStepsConfig.map((item, index) => (
        <FunnelStepItem
          key={index}
          {...item}
          step={t(item.step)}
          title={t(item.title)}
          subtitle={t(item.subtitle)}
          buttonType={
            item.buttonType
              ? {
                  action: item.buttonType.action,
                  title: t(item.buttonType.title),
                }
              : undefined
          }
          onClick={onClick}
        />
      ))}
    </StyledBottom>
  );

  const getFooterElement = () => (
    <StyledFooter>
      {getLink(
        t("funnelBackground.link.termsAndConditions"),
        urls.termsAndConditions
      )}
      {getLink(t("funnelBackground.link.privacyPolicy"), urls.privacyPolicy)}
      {/* {getLink(t('funnelBackground.link.contactUs'), urls.contactUs)} */}
      <StyledLink2 onClick={toContactUs}>
        {t("funnelBackground.link.contactUs")}
      </StyledLink2>
    </StyledFooter>
  );

  const toContactUs = () => {
    history.push(contactUsUrl);
  };

  const getLink = (message: string, url: string) => (
    <StyledLink>
      <ALink
        style={{ textDecoration: "underline" }}
        href={url}
        linkColor={colors.white}
        visitedColor={colors.white}
      >
        <TextMediumRegular>{message}</TextMediumRegular>
      </ALink>
    </StyledLink>
  );
  return (
    <StyledWrapper>
      <PageHeader />
      <StyledContentWrapper>
        {getHeaderElement(bgImage)}
        {getContentElement()}
        {getBottomElement()}
        {getFooterElement()}
      </StyledContentWrapper>
    </StyledWrapper>
  );
};

const offset = 25;
const StyledContentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const StyledWrapper = styled.div`
  background: white;
`;
const StyledHeaderImg = styled.img`
  width: 100%;
  height: auto;
`;
const StyledContent = styled.div`
  margin-top: ${-offset}px;
  width: 91%;
  background: white;
  text-align: center;
  border-radius: 8px;
  border: 1px solid ${colors.line};
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
const StyledBottom = styled.div`
  margin-top: ${-offset - 33}px;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  background: ${colors.line};
`;
const StyledStepDesContainer = styled.img`
  width: 100%;
  padding: 0 16px;
  margin-top: ${offset + 65}px;
  align-self: center;
  margin-bottom: 46px;
`;
const StyledFooter = styled.div`
  width: 100%;
  background: ${colors.primary1};
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 20px 24px;
`;
const StyledLink = styled.div`
  margin-bottom: 16px;
`;

const StyledLink2 = styled(TextMediumRegular)`
  width: 100%;
  color: ${colors.white};
  cursor: pointer;
  text-decoration: underline;
`;
