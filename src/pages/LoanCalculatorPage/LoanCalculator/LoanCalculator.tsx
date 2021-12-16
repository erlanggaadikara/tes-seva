import React, { CSSProperties, useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { CalculatorItem } from "./CalculatorItem/CalculatorItem";
import {
  generateDpCalculatorList,
  getCurrentPermutationList,
  generateTenureCalculatorList,
} from "./LoanCalculatorDataProcess";
import {
  useLoanCalculatorData,
  useLoanCalculatorPatch,
} from "context/loanCalculatorContext/loanCalculatorContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DragSourceType } from "./dragAndDropModel";
import { TouchBackend } from "react-dnd-touch-backend";
import { BackendFactory } from "dnd-core";
import { CustomDragLayer } from "./CustomDragLayer/CustomDragLayer";
import { isMobileDevice } from "utils/window";
import { useTranslation } from "react-i18next";
import { getTenureFormatted } from "utils/translationFormatter";
import { DndProvider } from "react-dnd";
import { useLoanPermutationResponse } from "context/loanPermutationContext/loanPermutationContext";
import { formatNumberByLocalization } from "utils/numberUtils/numberUtils";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { million, ten } from "const/const";
export const CALCULATOR_ITEM_HEIGHT = 50;
export const LoanCalculator = () => {
  const { Dp, Tenure } = useLoanCalculatorData();
  const patchLoanCalculatorData = useLoanCalculatorPatch();
  const { loanPermutationResponse } = useLoanPermutationResponse();

  const currentPermutationList = loanPermutationResponse
    ? getCurrentPermutationList(
        loanPermutationResponse.loanPermutations,
        Tenure
      )
    : [];
  const dpCalculatorList = generateDpCalculatorList(currentPermutationList, Dp);

  const tenureCalculatorList = loanPermutationResponse
    ? generateTenureCalculatorList(
        Dp,
        Tenure,
        loanPermutationResponse.loanPermutations
      )
    : [];
  const resetDpListTranslate = () => {
    setDpSectionStyle({});
  };
  const setSelectedDp = (value: number) => {
    patchLoanCalculatorData({ Dp: value });
  };
  const setSelectedTenure = (value: number) => {
    patchLoanCalculatorData({ Tenure: value });
  };
  const dndBackend: BackendFactory = isMobileDevice
    ? TouchBackend
    : HTML5Backend;
  const { t } = useTranslation();
  const dpSectionRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [dpSectionStyle, setDpSectionStyle] = useState<CSSProperties>({});

  const scrollSelectedDpToView = () => {
    const dpSectionHeight = dpSectionRef.current.clientHeight;
    const currentPermutationIndex = currentPermutationList.findIndex(
      ({ dpAmount }) => {
        return dpAmount === Dp;
      }
    );
    const baseTranslateDistance = dpSectionHeight / 2;
    dpSectionRef.current.scrollTop =
      (currentPermutationIndex + 3) * CALCULATOR_ITEM_HEIGHT -
      baseTranslateDistance;
  };
  useEffect(() => {
    scrollSelectedDpToView();
  }, [dpSectionRef, Dp]);
  const onScrollHandler = () => {
    resetDpListTranslate();
  };
  const { currentLanguage } = useCurrentLanguageFromContext();
  return (
    <DndProvider backend={dndBackend}>
      <CustomDragLayer />
      <StyledSection>
        <StyledDpSection onScroll={onScrollHandler} ref={dpSectionRef}>
          <div style={dpSectionStyle}>
            <StyledCalculatorItemPlaceHolder />
            <StyledCalculatorItemPlaceHolder />
            {dpCalculatorList.map(({ data, isTextRight, color }) => {
              const label = `Rp ${formatNumberByLocalization(
                data.value,
                currentLanguage,
                million,
                ten
              )} jt (${data.dpPercentage}%)`;
              return (
                <CalculatorItem
                  data={data}
                  label={label}
                  isTextRight={isTextRight}
                  key={data.value}
                  onSelect={setSelectedDp}
                  dragSourceType={DragSourceType.Dp}
                  dragBoxWidth={"185px"}
                  color={color}
                  height={`${CALCULATOR_ITEM_HEIGHT}px`}
                />
              );
            })}
            <StyledCalculatorItemPlaceHolder />
            <StyledCalculatorItemPlaceHolder />
          </div>
        </StyledDpSection>
        <StyledTenureSection>
          {tenureCalculatorList.map(({ data, isTextRight, color }) => {
            const label = getTenureFormatted(t, data.value);
            return (
              <CalculatorItem
                data={data}
                label={label}
                isTextRight={isTextRight}
                key={data.value}
                onSelect={setSelectedTenure}
                dragSourceType={DragSourceType.Tenure}
                dragBoxWidth={"115px"}
                color={color}
                height={`${CALCULATOR_ITEM_HEIGHT}px`}
              />
            );
          })}
        </StyledTenureSection>
      </StyledSection>
    </DndProvider>
  );
};
const StyledSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 250px;
`;
const StyledDpSection = styled.div`
  width: 70%;
  max-height: 100%;
  overflow: scroll;
`;
const StyledTenureSection = styled.section`
  width: 50%;
  overflow: scroll;
`;
const StyledCalculatorItemPlaceHolder = styled.div`
  width: 100%;
  height: ${CALCULATOR_ITEM_HEIGHT}px;
`;
