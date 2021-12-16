import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Comment } from "components/icon/Comment/Comment";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { RightOutlined } from "components/icon/RightOutlined/RightOutlined";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LanguageCode, LocalStorageKey } from "models/models";
import { trackSelectLanguage } from "helpers/trackingEvents";

const StyledLanguageSection = styled.div`
  width: 102px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 10px;
  background: white;
  cursor: pointer;
`;

type LanguageConfig = { code: LanguageCode; displayText: "English" | "Bahasa" };

type LanguageMap = { [key in LanguageCode]: LanguageConfig };
const languageMap: LanguageMap = {
  [LanguageCode.en]: {
    code: LanguageCode.en,
    displayText: "English",
  },
  [LanguageCode.id]: {
    code: LanguageCode.id,
    displayText: "Bahasa",
  },
};

export const LanguageSetting = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useLocalStorage<LanguageCode>(
    LocalStorageKey.Language,
    LanguageCode.id
  );
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>(() => {
    return language;
  });

  const changeLanguage = () => {
    i18n.changeLanguage(targetLanguage);
    setLanguage(targetLanguage);
    trackSelectLanguage(targetLanguage);
  };
  useEffect(() => {
    const targetLanguage: LanguageCode =
      language === LanguageCode.en ? LanguageCode.id : LanguageCode.en;
    setTargetLanguage(targetLanguage);
  });
  return (
    <StyledLanguageSection onClick={changeLanguage}>
      <Comment />
      <LinkLabelLegalSemiBold>
        {languageMap[targetLanguage].displayText}
      </LinkLabelLegalSemiBold>
      <RightOutlined width={"4px"} height={"auto"} />
    </StyledLanguageSection>
  );
};
