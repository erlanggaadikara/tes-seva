import React, { useMemo } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useDropdownMenu } from "components/DropdownMenu/DropdownMenu";
import { Location } from "components/icon/Location/Location";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { CityOtrCode } from "models/models";
import { useCurrentCityOtrFromContext } from "context/currentCityOtrContext/currentCityOtrContext";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";

interface CityOtrOption {
  value: CityOtrCode;
  displayShortText: string;
  displayText: string;
}

const CityOtrOptions: Array<CityOtrOption> = [
  {
    value: CityOtrCode.jabodetabek,
    displayShortText: "JAK",
    displayText: "Jabodetabek",
  },
  {
    value: CityOtrCode.surabaya,
    displayShortText: "SUB",
    displayText: "Surabaya",
  },
];

export const CityOtrDropDown = () => {
  const { DropdownMenu, setDropdownDisplay } = useDropdownMenu();

  const { currentCityOtr, setCurrentCityOtr } = useCurrentCityOtrFromContext();
  const url =
    typeof window !== "undefined"
      ? window.location.pathname
      : "".toString().includes("/new-variant-details/");

  const id =
    typeof window !== "undefined" ? window.location.pathname.split("/")[2] : "";

  const changeCityOtr = (city: CityOtrCode) => {
    setCurrentCityOtr(city);
    setDropdownDisplay(false);
    if (url) {
      window.location.href = "/new-funnel-loan-calculator/" + id;
    } else {
      location.reload();
    }
  };

  const currentCityOtrOption = useMemo(
    () =>
      CityOtrOptions.find((option) => option.value === currentCityOtr) ??
      CityOtrOptions[0],
    [currentCityOtr]
  );

  const displayCityOtrOption = () => setDropdownDisplay(true);

  return (
    <StyledCityOtrDropdown>
      <StyledCurrentCityOtr onClick={displayCityOtrOption}>
        <Location color={colors.primary1} />
        <StyledCityText>
          {currentCityOtrOption?.displayShortText}
        </StyledCityText>
        <StyledDownOutlined width={12} height={12} color={colors.title} />
      </StyledCurrentCityOtr>
      <DropdownMenu>
        {CityOtrOptions.map((option) => (
          <StyledCityOtrItem
            key={option.value}
            onClick={() => changeCityOtr(option.value)}
          >
            <StyledCityText>{option.displayText}</StyledCityText>
          </StyledCityOtrItem>
        ))}
      </DropdownMenu>
    </StyledCityOtrDropdown>
  );
};

const StyledDownOutlined = styled(DownOutlined)`
  margin-left: 8px;
`;

const StyledCityOtrDropdown = styled.div`
  position: relative;
`;

const StyledCityOtrItem = styled.div`
  display: flex;
  height: 48px;
  width: 192px;
  align-items: center;
  padding: 16px;
  :hover {
    cursor: pointer;
    background-color: #5cc9fc;
  }
`;

const StyledCurrentCityOtr = styled(StyledCityOtrItem)`
  height: 100%;
  width: auto;
  :hover {
    background-color: unset;
  }
`;
const StyledCityText = styled(TextLegalMedium)`
  margin-left: 8px;
`;
