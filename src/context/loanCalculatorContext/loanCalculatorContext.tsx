import React from "react";
import { createContext, useContext, useState } from "react";
import { DragSourceType } from "pages/LoanCalculatorPage/LoanCalculator/dragAndDropModel";

type keys = keyof typeof DragSourceType;
export type LoanCalculatorSelectedData = { [key in keys]: number };
const defaultSelectedDta: LoanCalculatorSelectedData = {
  Dp: 0,
  Tenure: 0,
};
const LoanCalculatorContext =
  createContext<LoanCalculatorSelectedData>(defaultSelectedDta);
const LoanCalculatorPatchContext = createContext(
  (value: Partial<LoanCalculatorSelectedData>) => {
    console.log(`value: ${value}`);
    return;
  }
);

export const LoanCalculatorProvider = (props: HTMLElement) => {
  const [selectedDate, setSelectedData] =
    useState<LoanCalculatorSelectedData>(defaultSelectedDta);
  const patchLoanCalculatorValue = (
    value: Partial<LoanCalculatorSelectedData>
  ) => {
    setSelectedData((preValue) => {
      return { ...preValue, ...value };
    });
  };

  return (
    <LoanCalculatorContext.Provider value={selectedDate}>
      <LoanCalculatorPatchContext.Provider value={patchLoanCalculatorValue}>
        {props.children}
      </LoanCalculatorPatchContext.Provider>
    </LoanCalculatorContext.Provider>
  );
};
export const useLoanCalculatorData = () => useContext(LoanCalculatorContext);
export const useLoanCalculatorPatch = () =>
  useContext(LoanCalculatorPatchContext);
