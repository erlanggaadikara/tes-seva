import React, { useContext, createContext } from "react";
import { NewFunnelLoanPermutations } from "types/types";
import { LocalStorageKey } from "models/models";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";

export interface LoanPermutationResponse {
  loanPermutations: NewFunnelLoanPermutations[];
}

interface ActionContextType {
  selectedNewLoanPermutation: NewFunnelLoanPermutations | undefined;
  setSelectedNewLoanPermutation: (value: NewFunnelLoanPermutations) => void;
}

const defaultContextValue: ActionContextType = {
  selectedNewLoanPermutation: undefined,
  setSelectedNewLoanPermutation: (value: NewFunnelLoanPermutations) => {
    console.log("context", value);
    return;
  },
};

const NewLoanPermutationContext = createContext(defaultContextValue);

export const NewLoanPermutationContextProvider = ({
  children,
}: HTMLElement) => {
  const [selectedNewLoanPermutation, setSelectedNewLoanPermutation] =
    useLocalStorage(LocalStorageKey.SelectedLoanPermutation, undefined);

  return (
    <NewLoanPermutationContext.Provider
      value={{ selectedNewLoanPermutation, setSelectedNewLoanPermutation }}
    >
      {children}
    </NewLoanPermutationContext.Provider>
  );
};

export const useNewLoanPermutation = () =>
  useContext(NewLoanPermutationContext);
