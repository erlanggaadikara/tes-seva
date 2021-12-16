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
        <StyledLinkHomepage onClick={toHome}>
          {t(`contactUsPage.navbar.home`)}
        </StyledLinkHomepage>
        <ALink href={urls.about}>
          <StyledLink>{t("contactUsPage.navbar.aboutUs")}</StyledLink>
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
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 100px;
`;
const StyledLinkHomepage = styled(H2MediumBold)`
  color: ${colors.title};
  text-align: left;
  margin-top: 300px;
`;
const StyledLink = styled(H2MediumBold)`
  color: ${colors.title};
  text-align: left;
`;

const StyledButton = styled(Button)`
  width: 150px;
  background: ${colors.secondaryDark2};
  border-radius: 5px;
  margin-top: 200px;
`;
