import React from "react";
import styled from "styled-components";
import { maxPageWidth, screenHeight } from "styles/GlobalStyle";
import { colors } from "styles/colors";
import { preApprovalQuestionFlowUrl } from "routes/routes";
import { useHistory, useLocation } from "react-router-dom";
import { StartImg } from "./images/StartImg";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { useTranslation } from "react-i18next";
import { TextSmallRegularStyle } from "components/typography/TextSmallRegular";
import { Footer } from "components/Footer/Footer";
import { Button, ButtonType } from "components/Button/Button";
import { ArrowBack } from "components/ArrowBack/ArrowBack";
import { LocationStateKey } from "models/models";
import { back3Pages } from "const/const";
import { trackViewPreapprovalStarted } from "helpers/amplitude/preApprovalEventTracking";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";

export default function PreApprovalStart() {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation<
    { [LocationStateKey.IsFromLoginPage]: boolean } | undefined
  >();

  useAmplitudePageView(trackViewPreapprovalStarted);

  const handleSubmit = () => {
    history.push(preApprovalQuestionFlowUrl);
  };

  const handleGoBack = () => {
    location.state?.isFromLoginPage ? history.goBack() : history.go(back3Pages);
  };
  return (
    <StyledPage>
      <ArrowBack onClick={handleGoBack} />
      <StyledImgContainer>
        <StartImg width="70%" height="auto" />
      </StyledImgContainer>
      <StyledTitle>{t("preApprovalStartPage.title")}</StyledTitle>
      <StyledSubtitle>{t("preApprovalStartPage.subtitle")}</StyledSubtitle>
      <Footer
        background={"transparent"}
        padding={"0 16px 32px"}
        showShadow={false}
      >
        <Button
          width="100%"
          buttonType={ButtonType.primary1}
          onClick={handleSubmit}
        >
          {t("preApprovalStartPage.submit")}
        </Button>
      </Footer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  width: 100%;
  min-height: ${screenHeight}px;
  background: ${colors.offWhite};
  padding: 16px 16px 100px;
  max-width: ${maxPageWidth};
  position: relative;
`;

const StyledImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 56px;
  margin-bottom: 32px;
`;

const StyledTitle = styled(H2MediumBold)`
  color: ${colors.title};
  text-align: center;
  margin-bottom: 16px;
`;

const StyledSubtitle = styled.div`
  ${TextSmallRegularStyle};
  color: ${colors.body};
  text-align: center;
`;
