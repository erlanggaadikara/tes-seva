import React, { createContext, useContext } from "react";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LocalStorageKey } from "models/models";

interface ActionContextType {
  lastOtpSentTime: number;
  setLastOtpSentTime: (value: number) => void;
}
const defaultContextValue: ActionContextType = {
  lastOtpSentTime: 0,
  setLastOtpSentTime: (value: number) => {
    console.log(value);
    return;
  },
};
const LastOtpSentTimeContext = createContext(defaultContextValue);

export const LastOtpSentTimeContextProvider = ({ children }: HTMLElement) => {
  const [lastOtpSentTime, setLastOtpSentTime] = useLocalStorage<number>(
    LocalStorageKey.LastOtpSent,
    0
  );

  return (
    <LastOtpSentTimeContext.Provider
      value={{ lastOtpSentTime, setLastOtpSentTime }}
    >
      {children}
    </LastOtpSentTimeContext.Provider>
  );
};

export const useLastOtpSentTime = () => useContext(LastOtpSentTimeContext);
