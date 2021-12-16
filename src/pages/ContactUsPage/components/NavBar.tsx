import React from "react";
import styled from "styled-components";
import { LogoHomeSearch } from "components/icon/LogoHomeSearch/LogoHomeSearch";
import { colors } from "styles/colors";
import { Button, ButtonType } from "components/Button/Button";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useTranslation } from "react-i18next";
import Hamburger from "hamburger-react";
import { ALink } from "components/ALink/ALink";
import urls from "helpers/urls";
import { useHistory } from "react-router-dom";
import { homeUrl } from "routes/routes";
import { carResultsUrl } from "routes/routes";

interface NavBarProps {
  openMenu: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function NavBar({ openMenu }: NavBarProps) {
  const { t } = useTranslation();
  const history = useHistory();

  const toHome = () => {
    history.push(homeUrl);
  };

  const toCarResults = () => {
    history.push(carResultsUrl);
  };

  return (
    <>
      <Nav>
        <NavLogo>
          <LogoHomeSearch />
        </NavLogo>
        <NavMenu>
          <LinkWrapper>
            <NavLink onClick={toHome}>{t(`contactUsPage.navbar.home`)}</NavLink>
            <ALink href={urls.about}>
              <NavLink>{t(`contactUsPage.navbar.aboutUs`)}</NavLink>
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
          </LinkWrapper>
          <HamburgerWrapper onClick={openMenu}>
            <Hamburger />
          </HamburgerWrapper>
        </NavMenu>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  background: ${colors.white};
  height: 85px;
  display: flex;
  justify-content: space-between;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3rem;
`;

const NavLink = styled(LinkLabelSmallSemiBold)`
  color: ${colors.primary1};
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 3rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  white-space: nowrap;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  width: 150px;
  background: ${colors.secondaryDark2};
  border-radius: 5px;
`;

const HamburgerWrapper = styled.div`
  display: none;

  @media screen and (max-width: 1000px) {
    display: block;
  }
`;
