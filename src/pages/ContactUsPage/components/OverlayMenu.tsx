import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { Button, ButtonType } from "components/Button/Button";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useTranslation } from "react-i18next";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { ALink } from "components/ALink/ALink";
import urls from "helpers/urls";
import { useHistory } from "react-router-dom";
import { homeUrl } from "routes/routes";
import { carResultsUrl } from "routes/routes";

export default function OverlayMenu() {
  const { t } = useTranslation();
  const history = useHistory();

  const toHome = () => {
    history.push(homeUrl);
  };

  const toCarResults = () => {
    history.push(carResultsUrl);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <StyledLink onClick={toHome}>
          {t(`contactUsPage.navbar.home`)}
        </StyledLink>
        <ALink href={urls.about}>
          <StyledLink2>{t("contactUsPage.navbar.aboutUs")}</StyledLink2>
        </ALink>
        <StyledButton
          height={"40px"}
          buttonType={ButtonType.primary2}
          loading={false}
          onClick={toCarResults}
        >
          <LinkLabelSmallSemiBold>
            {t(`contactUsPage.navbar.find`)}
          </LinkLabelSmallSemiBold>
        </StyledButton>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 100px;
`;

const StyledLink = styled(H2MediumBold)`
  color: ${colors.title};
  text-align: center;
  margin-top: 30vh;
  font-size: 3rem;
`;

const StyledLink2 = styled(H2MediumBold)`
  color: ${colors.title};
  text-align: center;
  font-size: 3rem;
  margin-top: 10vh;
  line-height: 3rem;
`;

const StyledButton = styled(Button)`
  width: 50%;
  background: ${colors.secondaryDark2};
  border-radius: 5px;
  margin-top: 25vh;
`;
