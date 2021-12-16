import { useContext } from "react";
import { LoanPermutation } from "pages/LoanCalculatorPage/LoanCalculatorType";
import createDataContext from "context/createDataContext";

export interface LoanPermutationResponse {
  loanPermutations: LoanPermutation[];
}

const { Context, Provider } = createDataContext<
  LoanPermutationResponse | undefined
>(undefined);

export const LoanPermutationResponseContextProvider = Provider;

export const useLoanPermutationResponse = () => {
  const { state, setState } = useContext(Context);
  return {
    loanPermutationResponse: state,
    setLoanPermutationResponse: setState,
  };
};
