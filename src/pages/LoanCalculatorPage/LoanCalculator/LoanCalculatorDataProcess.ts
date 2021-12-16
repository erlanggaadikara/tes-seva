import { DragSourceType } from "./dragAndDropModel";
import { LoanPermutation } from "LoanCalculatorType";
import { LoanRank } from "models/models";
import { LoanRankKey, RankMap } from "utils/DetailsDataProcess";
import { colors } from "styles/colors";

export const findLoanPermutationByDpAndTenure = (
  loanPermutationList: LoanPermutation[],
  dp: number,
  tenureValue: number
) => {
  const defaultValue = {
    dpAmount: 0,
    tenure: 0,
    monthlyInstallment: 0,
    loanRank: LoanRank.Red,
  };
  return (
    loanPermutationList.find(({ dpAmount, tenure }) => {
      return dp === dpAmount && tenure === tenureValue;
    }) || defaultValue
  );
};
export const getCurrentPermutationList = (
  loanPermutationList: LoanPermutation[],
  tenureValue: number
) => {
  return loanPermutationList.filter(({ tenure }) => {
    return tenureValue === tenure;
  });
};
const loanCalculatorRankColorMap: RankMap = {
  [LoanRank.Green]: colors.success,
  [LoanRank.Yellow]: colors.secondaryDark,
  [LoanRank.Red]: colors.error,
};
export const getLoanCalculatorRankColor = (loanRank: LoanRankKey) => {
  return loanCalculatorRankColorMap[loanRank];
};
export const generateDpCalculatorList = (
  loanPermutationList: LoanPermutation[],
  selectedData: number
) => {
  return loanPermutationList.map(({ dpAmount, loanRank, dpPercentage }) => {
    return {
      data: {
        value: dpAmount,
        dpPercentage,
        isSelected: selectedData === dpAmount,
      },
      label: "",
      isTextRight: true,
      dragSourceType: DragSourceType.Dp,
      color: getLoanCalculatorRankColor(loanRank),
    };
  });
};
const generateTenureList = (loanPermutationList: LoanPermutation[]) => {
  const init: number[] = [];
  const tenures = loanPermutationList.reduce(
    (acc: number[], current: LoanPermutation) => {
      if (acc.includes(current.tenure)) {
        return acc;
      }
      return acc.concat(current.tenure);
    },
    init
  );
  return tenures.sort((a, b) => b - a);
};
export const generateTenureCalculatorList = (
  selectedDp: number,
  selectedData: number,
  loanPermutationList: LoanPermutation[]
) => {
  const tenureList = generateTenureList(loanPermutationList);

  return tenureList.map((tenure) => {
    const currentPermutation = findLoanPermutationByDpAndTenure(
      loanPermutationList,
      selectedDp,
      tenure
    );
    return {
      data: {
        value: tenure,
        isSelected: selectedData === tenure,
      },
      label: "",
      isTextRight: false,
      dragSourceType: DragSourceType.Dp,
      color: getLoanCalculatorRankColor(currentPermutation.loanRank),
    };
  });
};
