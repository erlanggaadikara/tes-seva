import { LoanPermutation } from "./LoanCalculatorType";
import { LoanCalculatorSelectedData } from "context/loanCalculatorContext/loanCalculatorContext";
import { trackViewLoanCalculator } from "helpers/trackingEvents";

export const findCurrentSelectedLoanPermutation = (
  loanPermutations: LoanPermutation[] | undefined
) => {
  return loanPermutations?.find(({ isDefault }) => {
    return isDefault;
  });
};
export const setDefaultLoanPermutation = (
  loanPermutations: LoanPermutation[],
  patchLoanCalculator: (value: Partial<LoanCalculatorSelectedData>) => void
) => {
  const defaultLoanPermutation =
    findCurrentSelectedLoanPermutation(loanPermutations);
  if (defaultLoanPermutation) {
    trackViewLoanCalculator(defaultLoanPermutation);
  }
  patchLoanCalculator({
    Dp: defaultLoanPermutation?.dpAmount,
    Tenure: defaultLoanPermutation?.tenure,
  });
};
