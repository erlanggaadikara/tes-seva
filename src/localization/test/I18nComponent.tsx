import React from "react";
import { useTranslation } from "react-i18next";
import { LanguageCode } from "models/models";

export const I18nComponent = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <section>
      {t("title")}
      <section>
        <div>
          <button
            type="button"
            onClick={() => changeLanguage(LanguageCode.en)}
            data-testid={"english-button"}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => changeLanguage(LanguageCode.id)}
            data-testid={"bahasa-button"}
          >
            Bahasa
          </button>
        </div>
      </section>
    </section>
  );
};
