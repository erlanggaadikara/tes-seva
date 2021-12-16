import { NewFunnelLoanPermutations } from "types/types";
import { LoanPickerData } from "./component/LoanPicker";
import {
  LanguageCode,
  NewFunnelLoanPermutationsKey,
  NewFunnelLoanRank,
} from "models/models";
import {
  loanRankColor,
  loanRankColorSeva,
} from "./newFunnelLoanCalculatorPage.config";
import { transformToJtWithTargetDecimal } from "utils/numberUtils/numberUtils";
import { hundred } from "const/const";

export const convertLoanPermutationsToLoanPickerData = (
  type: NewFunnelLoanPermutationsKey,
  data: NewFunnelLoanPermutations[]
): LoanPickerData[] => {
  return data
    .map((item) => {
      const rank = item[NewFunnelLoanPermutationsKey.LoanRank];
      return {
        label: item[type].toString(),
        value: Number(item[type]),
        color: loanRankColor[rank as NewFunnelLoanRank],
      };
    })
    .sort((a, b) => a.value - b.value);
};

const transformPrice = (data: LoanPickerData[], languageId: LanguageCode) =>
  data.map(({ value }) => ({
    color: loanRankColor[NewFunnelLoanRank.Grey],
    value,
    label: transformToJtWithTargetDecimal(value, languageId, hundred, false),
  }));

export const formatPickerData = (
  type: NewFunnelLoanPermutationsKey,
  data: LoanPickerData[],
  languageId: LanguageCode = LanguageCode.id,
  translation: (key: string, value: Record<string, number>) => string
): LoanPickerData[] => {
  let result: LoanPickerData[];
  let needRemoveAllDuplicates = true;
  switch (type) {
    case NewFunnelLoanPermutationsKey.MonthlyInstallment:
      needRemoveAllDuplicates = false;
      result = transformPrice(data, languageId);
      break;
    case NewFunnelLoanPermutationsKey.DpAmount:
      result = transformPrice(data, languageId);
      break;
    case NewFunnelLoanPermutationsKey.Tenure:
      result = data.map(({ value }) => ({
        color: loanRankColor[NewFunnelLoanRank.Grey],
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
  type: NewFunnelLoanPermutationsKey,
  data: NewFunnelLoanPermutations[],
  target: NewFunnelLoanPermutations
): NewFunnelLoanPermutations => {
  let result: NewFunnelLoanPermutations | undefined;
  switch (type) {
    case NewFunnelLoanPermutationsKey.MonthlyInstallment:
      result = data.find(
        (item) =>
          item[NewFunnelLoanPermutationsKey.MonthlyInstallment] ===
          target[NewFunnelLoanPermutationsKey.MonthlyInstallment]
      );
      break;
    case NewFunnelLoanPermutationsKey.DpAmount:
    case NewFunnelLoanPermutationsKey.Tenure:
      result = data.find(
        (item) =>
          item[NewFunnelLoanPermutationsKey.DpAmount] ===
            target[NewFunnelLoanPermutationsKey.DpAmount] &&
          item[NewFunnelLoanPermutationsKey.Tenure] ===
            target[NewFunnelLoanPermutationsKey.Tenure]
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
  selectData: NewFunnelLoanPermutations,
  selectedIndex: number
): LoanPickerData[] =>
  data.map((item, index) => {
    const rank = selectData[NewFunnelLoanPermutationsKey.LoanRank];
    return index === selectedIndex
      ? {
          ...item,
          color: loanRankColor[rank as NewFunnelLoanRank],
        }
      : item;
  });

export const modifyColorByIndex = (
  index: number,
  name: NewFunnelLoanPermutationsKey,
  loanPickerData: LoanPickerData[],
  currentSelectedItem: NewFunnelLoanPermutations,
  data: NewFunnelLoanPermutations[]
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

export const wrapperDataForColorSeva = (
  data: LoanPickerData[],
  selectData: NewFunnelLoanPermutations,
  selectedIndex: number
): LoanPickerData[] =>
  data.map((item, index) => {
    const rank = selectData[NewFunnelLoanPermutationsKey.LoanRank];
    return index === selectedIndex
      ? {
          ...item,
          color: loanRankColorSeva[rank as NewFunnelLoanRank],
        }
      : item;
  });

export const modifyColorByIndexSeva = (
  index: number,
  name: NewFunnelLoanPermutationsKey,
  loanPickerData: LoanPickerData[],
  currentSelectedItem: NewFunnelLoanPermutations,
  data: NewFunnelLoanPermutations[]
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
  return wrapperDataForColorSeva(
    loanPickerData,
    newFunnelLoanPermutations,
    index
  );
};
