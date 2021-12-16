import { colors } from "styles/colors";
import { NewFunnelLoanPermutationsKey, NewFunnelLoanRank } from "models/models";
import { NewFunnelLoanRankName } from "types/types";

export const newFunnelLoanNameList: NewFunnelLoanRankName[] = [
  {
    name: NewFunnelLoanPermutationsKey.DpAmount,
    value: "newFunnelLoanRank.downPayment",
  },
  {
    name: NewFunnelLoanPermutationsKey.MonthlyInstallment,
    value: "newFunnelLoanRank.monthlyInstallments",
  },
  {
    name: NewFunnelLoanPermutationsKey.Tenure,
    value: "newFunnelLoanRank.tenure",
  },
];

export const defaultNewFunnelLoanData = [
  {
    dpAmount: 29710000,
    loanRank: "Green",
    monthlyInstallment: 10882119,
    tenure: 1,
    dpPercentage: 20,
  },
  {
    dpAmount: 14855000,
    loanRank: "Red",
    monthlyInstallment: 12193691,
    tenure: 1,
    dpPercentage: 10,
  },
  {
    dpAmount: 22282500,
    loanRank: "Yellow",
    monthlyInstallment: 11537905,
    tenure: 1,
    dpPercentage: 15,
  },
];

export const loanRankColor = {
  [NewFunnelLoanRank.Red]: colors.error,
  [NewFunnelLoanRank.Yellow]: colors.secondaryDark2,
  [NewFunnelLoanRank.Green]: colors.secondary,
  [NewFunnelLoanRank.Grey]: colors.line,
};

export const loanRankColorSeva = {
  [NewFunnelLoanRank.Red]: colors.label,
  [NewFunnelLoanRank.Yellow]: colors.lightBlue,
  [NewFunnelLoanRank.Green]: colors.error,
  [NewFunnelLoanRank.Grey]: colors.line,
};
