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
  modifyColorByIndexSeva,
  wrapperDataForColorSeva,
} from "pages/NewFunnelLoanCalculatorPage/newFunnelLoanCalculatorUtils";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";
import { NewFunnelLoanRankComponent } from "pages/component/NewFunnelLoanRankSeva/NewFunnelLoanRankComponent";
import {
  LoanPicker,
  LoanPickerData,
} from "pages/NewFunnelLoanCalculatorPage/component/LoanPicker";
import { defaultNewFunnelLoanData } from "pages/NewFunnelLoanCalculatorPage/newFunnelLoanCalculatorPage.config";
import { NewFunnelLoanCalculatorBottom } from "pages/NewFunnelLoanCalculatorSevaPage/components/AdditionalInformationFields/NewFunnelLoanCalculatorBottomSeva/NewFunnelLoanCalculatorBottomSeva";
import background from "AdditionalInformationFields/NewFunnelLoanCalculatorBottomSeva/images/Rectangle.png";
import { H3MediumMedium } from "components/typography/H3MediumMedium";
import { colors } from "styles/colors";
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

    let wrapperList = modifyColorByIndexSeva(
      selectedIndex - 1,
      name,
      list,
      currentSelectedItem,
      data
    );
    wrapperList = modifyColorByIndexSeva(
      selectedIndex + 1,
      name,
      wrapperList,
      currentSelectedItem,
      data
    );
    wrapperList = wrapperDataForColorSeva(
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
            <StyledHeader>
              <StyledHeaderCalculatorSection>
                {t("newFunnelLoanCalculatorPage.editHeader.title")}
              </StyledHeaderCalculatorSection>
            </StyledHeader>
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
          </StyledSectionWrapper>
          {currentSelectedItem && (
            <StyledActionArea
              carVariantDetails={carVariantDetails}
              data={currentSelectedItem}
            />
          )}
          {sectionDisabled && <StyledMask />}
        </StyledWrapper>
      )}
    </>
  );
};

const StyledSectionWrapper = styled.div<{ isOpacity: boolean }>`
  opacity: ${({ isOpacity }) => (isOpacity ? 1 : 1)};
  padding-bottom: 40px;
  ${({ isOpacity }) => (isOpacity ? "filter: grayscale(100%)" : "")}
`;
const StyledWrapper = styled.div`
  position: relative;
  margin-top: 14vh;
`;
const StyledHeader = styled.div`
  margin: 0 auto;
  background: url(${background}) no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
`;
const StyledPickerWrapper = styled.div`
  margin-bottom: 30px;
`;
const StyledHeaderCalculatorSection = styled(H3MediumMedium)`
  line-height: 36px;
  color: ${colors.white};
  @media (max-width: 700px) {
    font-size: 20px;
    line-height: 28px;
  }
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
