import { useContext } from "react";
import patchDataContext from "context/patchDataContext/patchDataContext";
import { FormControlValue } from "types/types";
import { DownPaymentType, PaymentType } from "models/models";

export interface FunnelQuery {
  paymentType?: FormControlValue | string;
  downPaymentType?: FormControlValue;
  monthlyInstallment?: FormControlValue;
  downPaymentAmount?: FormControlValue;
  downPaymentPercentage?: FormControlValue;
  brand?: string[];
  monthlyIncome?: FormControlValue;
  age?: FormControlValue;
  bodyType?: string[];
  category?: string[];
  minPrice?: FormControlValue;
  maxPrice?: FormControlValue;
}

const initData = {
  paymentType: PaymentType.CarModel,
  downPaymentType: DownPaymentType.DownPaymentAmount,
  monthlyInstallment: "",
  downPaymentAmount: "",
  downPaymentPercentage: "",
  brand: [],
  bodyType: [],
  category: [],
  minPrice: "",
  maxPrice: "",
};
const { Context, Provider } = patchDataContext<FunnelQuery>(initData);

export const FunnelQueryContextProvider = Provider;

export const useFunnelQueryData = () => {
  const { state, setState, patchState, clearState } = useContext(Context);
  return {
    funnelQuery: state,
    setFunnelQuery: setState,
    patchFunnelQuery: patchState,
    clearFunnelQuery: clearState,
  };
};
