import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { getRpFormattedPrice } from "utils/translationFormatter";
import { useTranslation } from "react-i18next";

// e.g. input:147600000 output: 147.600.000
export const useFormattedPrice = (value: string | number) => {
  const { t } = useTranslation();
  const { currentLanguage } = useCurrentLanguageFromContext();
  const formattedPrice = getRpFormattedPrice(t, value ?? "", currentLanguage);
  return [formattedPrice];
};
