import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LanguageCode, LocalStorageKey } from "models/models";

export const useCurrentLanguage = () => {
  const [language, setLanguage] = useLocalStorage(LocalStorageKey.Language, "");
  let currentLanguage;
  if (!!language) {
    currentLanguage = language || LanguageCode.id;
  } else {
    // const browserLanguage = navigator.language
    // currentLanguage = browserLanguage.match(/en-.*/) ? LanguageCode.en : LanguageCode.id
    currentLanguage = LanguageCode.id;
  }
  return [currentLanguage, setLanguage];
};
