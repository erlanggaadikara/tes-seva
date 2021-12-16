import { useContext } from "react";
import patchDataContext from "context/patchDataContext/patchDataContext";
import { FormControlValue } from "types/types";

export interface FunnelForm {
  monthlyInstallment?: FormControlValue;
  downPaymentAmount?: FormControlValue;
}

const initData = {
  monthlyInstallment: "",
  downPaymentAmount: "",
};
const { Context, Provider } = patchDataContext<FunnelForm>(initData);

export const FunnelFormContextProvider = Provider;

export const useFunnelFormData = () => {
  const { state, setState, patchState, clearState } = useContext(Context);
  return {
    funnelForm: state,
    setFunnelForm: setState,
    patchFunnelForm: patchState,
    clearFunnelForm: clearState,
  };
};
