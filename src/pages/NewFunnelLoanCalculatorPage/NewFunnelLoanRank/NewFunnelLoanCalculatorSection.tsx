import { NewFunnelLoanRankComponent } from "component/NewFunnelLoanRank/NewFunnelLoanRankComponent";
import { LoanPicker, LoanPickerData } from "component/LoanPicker";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NewFunnelLoanPermutationsKey, NewFunnelLoanRank } from "models/models";
import { useTranslation } from "react-i18next";
import {
  NewFunnelCarVariantDetails,
  NewFunnelLoanPermutations,
  NewFunnelLoanRankName,
} from "types/types";
import {
  convertLoanPermutationsToLoanPickerData,
  findTargetValue,
  formatPickerData,
  modifyColorByIndex,
  wrapperDataForColor,
} from "newFunnelLoanCalculatorUtils";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { NewFunnelLoanCalculatorBottom } from "./NewFunnelLoanCalculatorBottom";
import { defaultNewFunnelLoanData } from "newFunnelLoanCalculatorPage.config";

interface NewFunnelLoanRankProps {
  carVariantDetails?: NewFunnelCarVariantDetails;
  loanRank: NewFunnelLoanRank;
  loanNameList: NewFunnelLoanRankName[];
  data: NewFunnelLoanPermutations[];
  onCurrentPermutationChanged?: (value: NewFunnelLoanPermutations) => void;
}

export const NewFunnelLoanCalculatorSection = ({
  carVariantDetails,
  loanRank,
  loanNameList,
  data,
  onCurrentPermutationChanged,
}: NewFunnelLoanRankProps) => {
  const { t } = useTranslation();
  const [pickerDataCollection, setPickerDataCollection] = useState<
    Map<string, LoanPickerData[]>
  >(new Map<string, LoanPickerData[]>());

  const { currentLanguage } = useCurrentLanguageFromContext();
  const sectionDisabled = loanRank === NewFunnelLoanRank.Grey;
  const defaultItem: NewFunnelLoanPermutations =
    data.find((item) => item.isDefault) ?? defaultNewFunnelLoanData[0];

  const [currentSelectedItem, setCurrentSelectedItem] =
    useState<NewFunnelLoanPermutations>(defaultItem);

  useEffect(() => {
    setCurrentSelectedItem(defaultItem);
  }, [data]);

  useEffect(
    () =>
      onCurrentPermutationChanged &&
      onCurrentPermutationChanged(currentSelectedItem),
    [currentSelectedItem]
  );

  useEffect(() => {
    const map = new Map<string, LoanPickerData[]>();
    loanNameList.map((item) => {
      const pickerData = convertLoanPermutationsToLoanPickerData(
        item.name,
        data
      );
      const result = formatPickerData(
        item.name,
        pickerData ?? [],
        currentLanguage,
        t
      );
      map.set(item.name, result);
    });
    setPickerDataCollection(map);
  }, [data, currentLanguage]);

  const onSelectedValueChanged = (tag: string, item: LoanPickerData) => {
    if (!item) {
      return;
    }

    setCurrentSelectedItem((preState) => {
      return findTargetValue(tag as NewFunnelLoanPermutationsKey, data, {
        ...preState,
        [tag]: item.value,
      });
    });
  };

  const getSelectedIndex = (
    name: string,
    data: LoanPickerData[],
    target: number
  ) => {
    return data.findIndex((item) => item.value === target) ?? -1;
  };

  const createLoanPicker = (item: NewFunnelLoanRankName) => {
    const name = item.name;
    const list = pickerDataCollection.get(name);
    if (!list) {
      return <></>;
    }
    const selectedIndex = getSelectedIndex(
      name,
      list,
      Number(currentSelectedItem[name])
    );

    let wrapperList = modifyColorByIndex(
      selectedIndex - 1,
      name,
      list,
      currentSelectedItem,
      data
    );
    wrapperList = modifyColorByIndex(
      selectedIndex + 1,
      name,
      wrapperList,
      currentSelectedItem,
      data
    );
    wrapperList = wrapperDataForColor(
      wrapperList,
      currentSelectedItem,
      selectedIndex
    );

    return (
      <LoanPicker
        tag={name}
        label={t(item.value)}
        index={selectedIndex}
        data={wrapperList}
        onSelectedValueChanged={onSelectedValueChanged}
      />
    );
  };

  return (
    <>
      {carVariantDetails && (
        <StyledWrapper>
          <StyledSectionWrapper isOpacity={sectionDisabled}>
            <NewFunnelLoanRankComponent
              loanRank={
                currentSelectedItem[
                  NewFunnelLoanPermutationsKey.LoanRank
                ] as NewFunnelLoanRank
              }
            />
            <StyledContentWrapper>
              {pickerDataCollection.size > 0 &&
                loanNameList.map((item, index) => {
                  return (
                    <StyledPickerWrapper key={index}>
                      {createLoanPicker(item)}
                    </StyledPickerWrapper>
                  );
                })}
            </StyledContentWrapper>

            {currentSelectedItem && (
              <StyledActionArea
                carVariantDetails={carVariantDetails}
                data={currentSelectedItem}
              />
            )}
          </StyledSectionWrapper>
          {sectionDisabled && <StyledMask />}
        </StyledWrapper>
      )}
    </>
  );
};

const StyledSectionWrapper = styled.div<{ isOpacity: boolean }>`
  opacity: ${({ isOpacity }) => (isOpacity ? 0.25 : 1)};
  padding-bottom: 40px;
  ${({ isOpacity }) => (isOpacity ? "filter: grayscale(100%)" : "")}
`;
const StyledWrapper = styled.div`
  position: relative;
`;

const StyledPickerWrapper = styled.div`
  margin-bottom: 30px;
`;

const StyledMask = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
`;
const StyledContentWrapper = styled.div`
  margin-top: 38px;
  justify-content: center;
  align-items: start;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledActionArea = styled(NewFunnelLoanCalculatorBottom)`
  width: 100%;
  padding: 30px 16px;
`;
