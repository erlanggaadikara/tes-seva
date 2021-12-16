import React, { useMemo } from "react";
import styled from "styled-components";
import { useDropdownMenu } from "components/DropdownMenu/DropdownMenu";
import { FlagIndonesia } from "components/icon/FlagIndonesia/FlagIndonesia";
import { FlagUSA } from "components/icon/FlagUSA/FlagUSA";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { colors } from "styles/colors";
import { LanguageCode } from "models/models";
import { useTranslation } from "react-i18next";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
interface LocaleOption {
  value: LanguageCode;
  displayShortText: string;
  displayText: string;
  flag: JSX.Element;
}

const LocaleOptions: Array<LocaleOption> = [
  {
    value: LanguageCode.id,
    displayShortText: LanguageCode.id.toUpperCase(),
    displayText: "Bahasa Indonesia",
    flag: <FlagIndonesia />,
  },
  {
    value: LanguageCode.en,
    displayShortText: LanguageCode.en.toUpperCase(),
    displayText: "English",
    flag: <FlagUSA />,
  },
];

export const LocaleDropDown = () => {
  const { DropdownMenu, setDropdownDisplay } = useDropdownMenu();

  const { i18n } = useTranslation();

  const { currentLanguage, setCurrentLanguage } =
    useCurrentLanguageFromContext();

  const changeLanguage = (targetLanguage: LanguageCode) => {
    i18n.changeLanguage(targetLanguage);
    setCurrentLanguage(targetLanguage);
    setDropdownDisplay(false);
  };

  const currentLanguageOption = useMemo(
    () =>
      LocaleOptions.find((option) => option.value === currentLanguage) ??
      LocaleOptions[0],
    [currentLanguage]
  );

  const displayLanguageOption = () => setDropdownDisplay(true);

  return (
    <StyledLocaleDropdown>
      <StyledCurrentLocale onClick={displayLanguageOption}>
        {currentLanguageOption.flag}
        <StyledLocaleText>
          {currentLanguageOption?.displayShortText}
        </StyledLocaleText>
        <StyledDownOutlined width={12} height={12} color={colors.title} />
      </StyledCurrentLocale>
      <DropdownMenu>
        {LocaleOptions.map((option) => (
          <StyledLocaleItem
            key={option.value}
            onClick={() => changeLanguage(option.value)}
          >
            {option.flag}
            <StyledLocaleText>{option.displayText}</StyledLocaleText>
          </StyledLocaleItem>
        ))}
      </DropdownMenu>
    </StyledLocaleDropdown>
  );
};

const StyledDownOutlined = styled(DownOutlined)`
  margin-left: 8px;
`;

const StyledLocaleDropdown = styled.div`
  position: relative;
`;

const StyledLocaleItem = styled.div`
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

const StyledCurrentLocale = styled(StyledLocaleItem)`
  height: 100%;
  width: auto;
  :hover {
    background-color: unset;
  }
`;
const StyledLocaleText = styled(TextLegalMedium)`
  margin-left: 8px;
`;
