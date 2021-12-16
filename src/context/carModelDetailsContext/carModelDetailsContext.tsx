import { useContext } from "react";
import { CarModelDetailsResponse } from "types/types";
import createDataContext from "context/createDataContext";

const { Context, Provider } = createDataContext<
  CarModelDetailsResponse | undefined
>(undefined);

export const CarModelDetailsContextProvider = Provider;

export const useContextCarModelDetails = () => {
  const { state, setState } = useContext(Context);
  return {
    carModelDetails: state,
    setCarModelDetails: setState,
  };
};
