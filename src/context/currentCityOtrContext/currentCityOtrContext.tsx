import React, { createContext, useContext } from "react";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { CityOtrCode, LocalStorageKey } from "models/models";

interface ActionContextType {
  currentCityOtr: CityOtrCode;
  setCurrentCityOtr: (value: CityOtrCode) => void;
}
const defaultContextValue: ActionContextType = {
  currentCityOtr: CityOtrCode.jabodetabek,
  setCurrentCityOtr: (value: CityOtrCode) => {
    console.log("context", value);
    return;
  },
};
const CurrenCityOtrContext = createContext(defaultContextValue);

export const CurrenCityOtrContextProvider = ({ children }: HTMLElement) => {
  const [currentCityOtr, setCurrentCityOtr] = useLocalStorage<CityOtrCode>(
    LocalStorageKey.CityOtr,
    CityOtrCode.jabodetabek
  );

  return (
    <CurrenCityOtrContext.Provider
      value={{ currentCityOtr, setCurrentCityOtr }}
    >
      {children}
    </CurrenCityOtrContext.Provider>
  );
};

export const useCurrentCityOtrFromContext = () =>
  useContext(CurrenCityOtrContext);
