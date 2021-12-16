import { useContext } from "react";
import { CarVariantDetails } from "types/types";
import createDataContext from "context/createDataContext";

const { Context, Provider } = createDataContext<CarVariantDetails | undefined>(
  undefined
);

export const CarVariantDetailsContextProvider = Provider;

export const useContextCarVariantDetails = () => {
  const { state, setState } = useContext(Context);
  return {
    carVariantDetails: state,
    setCarVariantDetails: setState,
  };
};
