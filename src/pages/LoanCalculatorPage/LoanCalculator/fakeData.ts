import { LoanRank } from "models/models";
import { LoanPermutationResponse } from "context/loanPermutationContext/loanPermutationContext";

const generateFakeData = () => {
  const tenures = [1, 2, 3, 4, 5];
  const dpAmountList = [
    1280000000, 300000000, 270000000, 260000000, 250000000, 240000000,
    130000000, 120000000, 110000000,
  ];
  const loanRankList = [
    [
      LoanRank.Green,
      LoanRank.Green,
      LoanRank.Yellow,
      LoanRank.Yellow,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
    ],
    [
      LoanRank.Green,
      LoanRank.Green,
      LoanRank.Green,
      LoanRank.Yellow,
      LoanRank.Yellow,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
    ],
    [
      LoanRank.Green,
      LoanRank.Green,
      LoanRank.Yellow,
      LoanRank.Yellow,
      LoanRank.Yellow,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
    ],
    [
      LoanRank.Green,
      LoanRank.Green,
      LoanRank.Yellow,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
    ],
    [
      LoanRank.Green,
      LoanRank.Green,
      LoanRank.Green,
      LoanRank.Green,
      LoanRank.Yellow,
      LoanRank.Yellow,
      LoanRank.Yellow,
      LoanRank.Yellow,
      LoanRank.Yellow,
    ],
    [
      LoanRank.Yellow,
      LoanRank.Yellow,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
      LoanRank.Red,
    ],
  ];
  return tenures
    .map((tenure, tenureIndex) => {
      return dpAmountList.map((dpAmount, dpIndex) => {
        return {
          tenure: tenure,
          dpAmount: dpAmount,
          monthlyInstallment: dpAmount / 10,
          loanRank: loanRankList[tenureIndex][dpIndex],
          isDefault: tenureIndex === 4 && dpIndex === 8,
        };
      });
    })
    .flat();
};
export const fakeLoanPermutationResponse: LoanPermutationResponse = {
  loanPermutations: generateFakeData(),
};

export const getFakeResponse = () => {
  return fakeLoanPermutationResponse;
};
