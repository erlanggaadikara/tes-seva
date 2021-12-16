import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { CityOtrCode, LocalStorageKey } from "models/models";

export const useCurrentCityOtr = () => {
  const [cityOtr, setCityOtr] = useLocalStorage(LocalStorageKey.CityOtr, "");
  let currentCityOtr;
  if (!!cityOtr) {
    currentCityOtr = cityOtr || CityOtrCode.jabodetabek;
  } else {
    currentCityOtr = CityOtrCode.jabodetabek;
  }
  return [currentCityOtr, setCityOtr];
};
