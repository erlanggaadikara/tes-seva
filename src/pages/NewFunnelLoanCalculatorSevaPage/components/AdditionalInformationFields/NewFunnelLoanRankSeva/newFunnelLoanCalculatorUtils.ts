import { NewFunnelLoanPermutationsSeva } from "types/types";
import {
  LanguageCode,
  NewFunnelLoanPermutationsKeySeva,
  NewFunnelLoanRank,
} from "models/models";

import { transformToJtWithTargetDecimal } from "utils/numberUtils/numberUtils";
import { hundred } from "const/const";
import { loanRankColorSeva } from "pages/NewFunnelLoanCalculatorPage/newFunnelLoanCalculatorPage.config";
import { LoanPickerData } from "pages/NewFunnelLoanCalculatorPage/component/LoanPicker";

export const convertLoanPermutationsToLoanPickerData = (
  type: NewFunnelLoanPermutationsKeySeva,
  data: NewFunnelLoanPermutationsSeva[]
): LoanPickerData[] => {
  return data
    .map((item) => {
      const rank = item[NewFunnelLoanPermutationsKeySeva.LoanRankSeva];
      return {
        label: item[type].toString(),
        value: Number(item[type]),
        color: loanRankColorSeva[rank as NewFunnelLoanRank],
      };
    })
    .sort((a, b) => a.value - b.value);
};

const transformPrice = (data: LoanPickerData[], languageId: LanguageCode) =>
  data.map(({ value }) => ({
    color: loanRankColorSeva[NewFunnelLoanRank.Grey],
    value,
    label: transformToJtWithTargetDecimal(value, languageId, hundred, false),
  }));

export const formatPickerData = (
  type: NewFunnelLoanPermutationsKeySeva,
  data: LoanPickerData[],
  languageId: LanguageCode = LanguageCode.id,
  translation: (key: string, value: Record<string, number>) => string
): LoanPickerData[] => {
  let result: LoanPickerData[];
  let needRemoveAllDuplicates = true;
  switch (type) {
    case NewFunnelLoanPermutationsKeySeva.MonthlyInstallment:
      needRemoveAllDuplicates = false;
      result = transformPrice(data, languageId);
      break;
    case NewFunnelLoanPermutationsKeySeva.DpAmount:
      result = transformPrice(data, languageId);
      break;
    case NewFunnelLoanPermutationsKeySeva.Tenure:
      result = data.map(({ value }) => ({
        color: loanRankColorSeva[NewFunnelLoanRank.Grey],
        value,
        label: translation("common.tenureAmount", {
          count: value,
        }),
      }));
      break;
    default:
      result = data;
      break;
  }
  return needRemoveAllDuplicates ? removeAllDuplicates(result) : result;
};

export const removeAllDuplicates = (array: LoanPickerData[]) =>
  array.filter((item, index, self) => {
    return index === self.findIndex((t) => t.label === item.label);
  });

export const findTargetValue = (
  type: NewFunnelLoanPermutationsKeySeva,
  data: NewFunnelLoanPermutationsSeva[],
  target: NewFunnelLoanPermutationsSeva
): NewFunnelLoanPermutationsSeva => {
  let result: NewFunnelLoanPermutationsSeva | undefined;
  switch (type) {
    case NewFunnelLoanPermutationsKeySeva.MonthlyInstallment:
      result = data.find(
        (item) =>
          item[NewFunnelLoanPermutationsKeySeva.MonthlyInstallment] ===
          target[NewFunnelLoanPermutationsKeySeva.MonthlyInstallment]
      );
      break;
    case NewFunnelLoanPermutationsKeySeva.DpAmount:
    case NewFunnelLoanPermutationsKeySeva.Tenure:
      result = data.find(
        (item) =>
          item[NewFunnelLoanPermutationsKeySeva.DpAmount] ===
            target[NewFunnelLoanPermutationsKeySeva.DpAmount] &&
          item[NewFunnelLoanPermutationsKeySeva.Tenure] ===
            target[NewFunnelLoanPermutationsKeySeva.Tenure]
      );
      break;
    default:
      result = target;
      break;
  }
  return result ?? target;
};

export const wrapperDataForColor = (
  data: LoanPickerData[],
  selectData: NewFunnelLoanPermutationsSeva,
  selectedIndex: number
): LoanPickerData[] =>
  data.map((item, index) => {
    const rank = selectData[NewFunnelLoanPermutationsKeySeva.LoanRankSeva];
    return index === selectedIndex
      ? {
          ...item,
          color: loanRankColorSeva[rank as NewFunnelLoanRank],
        }
      : item;
  });

export const modifyColorByIndex = (
  index: number,
  name: NewFunnelLoanPermutationsKeySeva,
  loanPickerData: LoanPickerData[],
  currentSelectedItem: NewFunnelLoanPermutationsSeva,
  data: NewFunnelLoanPermutationsSeva[]
) => {
  if (index > loanPickerData.length - 1 || index < 0) {
    return loanPickerData;
  }
  const item = loanPickerData[index];
  if (!item) {
    return loanPickerData;
  }
  const newFunnelLoanPermutations = findTargetValue(name, data, {
    ...currentSelectedItem,
    [name]: item.value,
  });
  if (!newFunnelLoanPermutations) {
    return loanPickerData;
  }
  return wrapperDataForColor(loanPickerData, newFunnelLoanPermutations, index);
};
