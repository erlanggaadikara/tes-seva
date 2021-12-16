import React from "react";
import { LogoSeva } from "components/icon/LogoSeva/LogoSeva";
import { LocaleDropDown } from "pages/component/LocaleDropdown/LocaleDropdown";
import styled from "styled-components";
import { colors } from "styles/colors";
import { CityOtrDropDown } from "pages/component/CityOtrDropDown/CityOtrDropDown";

interface PageHeaderSevaProps {
  children?: JSX.Element;
}

export const PageHeaderSevaHeight = "64px";
export const PageHeaderSeva = (props: PageHeaderSevaProps) => {
  return (
    <StyledLogoSection>
      <StyledLogoContainer>
        <LogoSeva />
      </StyledLogoContainer>
      {props.children}
      <DropdownSection>
        <CityOtrDropDown />
        <Separator />
        <LocaleDropDown />
      </DropdownSection>
    </StyledLogoSection>
  );
};

const StyledLogoSection = styled.div`
  height: ${PageHeaderSevaHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: white;
`;

const StyledLogoContainer = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
`;

const DropdownSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Separator = styled.div`
  width: 1px;
  height: 50%;
  background-color: ${colors.placeholder};
`;
