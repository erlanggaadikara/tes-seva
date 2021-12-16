import { useCallback, useEffect } from "react";
import type { AppProps } from "next/app";
import { ResetStyle } from "styles/ResetStyle";
import { GlobalStyle } from "styles/GlobalStyle";
import { GlobalContextProvider } from "context/GlobalContextProvider";
import { useTranslation } from "react-i18next";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LocalStorageKey, WebviewMessageType } from "models/models";
import {
  defaultFormValue,
  FormItem,
} from "hooks/useSurveyFormData/useSurveyFormData";
import {
  getLocalStorage,
  getWithExpiry,
  saveLocalStorage,
  setWithExpiry,
} from "utils/localstorageUtils";
import { hotjar } from "react-hotjar";
import { Token, WebviewMessageData } from "types/types";
import { useCurrentCityOtr } from "hooks/useCurrentCityOtr/useCurrentCityOtr";
import "./index.css";
import "localization/i18n";

const initHotjar = () => {
  const hjid = 2532707;
  const hjsv = 6;
  hotjar.initialize(hjid, hjsv);
};

const Initial = () => {
  const [currentStep, setCurrentStep] = useLocalStorage<number>(
    LocalStorageKey.CurrentStep,
    -1
  );
  const [, setToken] = useLocalStorage<Token | null>(
    LocalStorageKey.Token,
    null
  );
  const formData: FormItem | null = getLocalStorage(LocalStorageKey.SurveyForm);

  const handleChunkFileLoadFailure = useCallback((error) => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (error?.message && chunkFailedMessage.test(error.message)) {
      if (!getWithExpiry<string>(LocalStorageKey.ChunkLoadFailed)) {
        console.log("Loading chunk failed, will reload the app...");
        setWithExpiry<string>(LocalStorageKey.ChunkLoadFailed, "true", 10000);
        window.location.reload();
      }
    }
  }, []);

  const handleMessageFromWebview = (
    event: MessageEvent<WebviewMessageData<Token>>
  ) => {
    const dataFromNative = event.data;
    const dataValueFromNative = dataFromNative.value;
    if (
      dataFromNative.type === WebviewMessageType.Token &&
      dataValueFromNative.idToken
    ) {
      setToken(dataValueFromNative);
    }
  };

  useEffect(() => {
    if (!(formData?.age && "isDataValid" in formData?.age)) {
      saveLocalStorage(
        LocalStorageKey.SurveyForm,
        JSON.stringify(defaultFormValue)
      );
      if (currentStep >= 0) {
        setCurrentStep(0);
      }
    }
    if (currentStep >= 8) {
      setCurrentStep(8); // 8 is the last survey form question page index for now
    }
    window.addEventListener("error", handleChunkFileLoadFailure);
    window.addEventListener("message", handleMessageFromWebview);
    return () => {
      window.removeEventListener("error", handleChunkFileLoadFailure);
      window.removeEventListener("message", handleMessageFromWebview);
    };
  }, []);
  return <></>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useCurrentLanguage();
  const [currentCityOtr, setCurrentCityOtr] = useCurrentCityOtr();

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    setCurrentLanguage(currentLanguage);
    setCurrentCityOtr(currentCityOtr);
    if (process.env.REACT_APP_ENVIRONMENT === "production") {
      initHotjar();
    }
  }, []);
  return (
    <>
      <GlobalStyle />
      <ResetStyle />
      <Initial />
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
    </>
  );
}

export default MyApp;
