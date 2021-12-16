import React from "react";
import { LogoHomeSearch } from "components/icon/LogoHomeSearch/LogoHomeSearch";
import { LocaleDropDown } from "pages/component/LocaleDropdown/LocaleDropdown";
import styled from "styled-components";
import { CityOtrDropDown } from "pages/component/CityOtrDropDown/CityOtrDropDown";
import { colors } from "styles/colors";

export const PageHeaderHeight = "64px";
export const PageHeader = () => {
  return (
    <StyledLogoSection>
      <StyledLogoContainer>
        <LogoHomeSearch />
      </StyledLogoContainer>
      <DropdownSection>
        <CityOtrDropDown />
        <Separator />
        <LocaleDropDown />
      </DropdownSection>
    </StyledLogoSection>
  );
};

const StyledLogoSection = styled.div`
  height: ${PageHeaderHeight};
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 16px;
  background-color: white;
`;

const StyledLogoContainer = styled.div`
  align-items: center;
  display: flex;
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
