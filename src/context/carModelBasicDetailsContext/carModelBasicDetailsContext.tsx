import { useContext } from "react";
import { CarModelBasicDetailsResponse } from "types/types";
import createDataContext from "context/createDataContext";

const { Context, Provider } = createDataContext<
  CarModelBasicDetailsResponse | undefined
>(undefined);

export const CarModelBasicDetailsContextProvider = Provider;

export const useContextCarModelBasicDetails = () => {
  const { state, setState } = useContext(Context);
  return {
    carModelBasicDetails: state,
    setCarModelBasicDetails: setState,
  };
};
