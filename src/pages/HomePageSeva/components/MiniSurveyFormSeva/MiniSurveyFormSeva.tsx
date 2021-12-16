import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { useTranslation } from "react-i18next";
import { PaymentTypeFieldSeva } from "pages/HomePageSeva/components/PaymentTypeFieldSeva/PaymentTypeFieldSeva";
import { Button, ButtonType } from "components/Button/Button";
import { Select } from "components/form/SelectSeva/Select";
import { FormControlValue } from "types/types";
import { useQuestionFlowForm } from "context/questionFlowContext/questionFlowContext";
import { PreApprovalQuestionsAddressKey } from "models/models";
import { isDataValid } from "pages/SurveyForm/surveyFormUtils";
import { fuzzySearch } from "utils/fuzzySearch/fuzzySearch";
import { Search } from "components/icon/Search/Search";
import { getCarModel } from "services/carModel";
import { isMobileDevice } from "utils/window";
import { CarModelLogo } from "components/icon/CarModel/CarModel";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { paymentTypeConfigMobile } from "pages/HomePageSeva/components/PaymentTypeFieldSeva/PaymentTypeSeve.config";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { FunnelQueryKey, PaymentType } from "models/models";
import { DownPaymentAmountSeva } from "pages/component/DownPaymentAmount/DownPaymentAmountSeva";
import { MonthlyInstallmentSeva } from "pages/component/MonthlyInstallment/MonthlyInstallmentSeva";
export const MiniSurveyFormSeva = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [carModelList, setcarModelList] = useState<any>();
  const { questionFlowForm, patchQuestionFlowForm } = useQuestionFlowForm();
  const [provinceValue, setProvinceValue] = useState<FormControlValue>(
    questionFlowForm[PreApprovalQuestionsAddressKey.Province].value
  );
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData();

  console.log(funnelQuery);
  const handleSearchCars = () => {
    setLoading(!loading);
  };
  useEffect(() => {
    (async () => {
      const carModel = await getCarModel();
      if (carModel) setcarModelList(carModel.data);
    })();
  }, []);
  const onChoose = (value: FormControlValue) => {
    setProvinceValue(value);
    patchQuestionFlowForm({
      [PreApprovalQuestionsAddressKey.Province]: {
        value,
        isDataValid: isDataValid(value),
      },
    });
    console.log(value);
  };
  const onChooseMobile = (optionValue: FormControlValue) => {
    // setPaymentTypeValue(value)
    patchFunnelQuery({
      [FunnelQueryKey.PaymentType]: optionValue,
    });
    if (optionValue === PaymentType.DownPayment) {
      patchFunnelQuery({ [FunnelQueryKey.MonthlyInstallment]: "" });
    } else {
      patchFunnelQuery({ [FunnelQueryKey.DownPaymentAmount]: "" });
    }
  };
  const onSearch = async (searchText: string) => {
    const carModel = await getCarModel();
    if (carModel) {
      const searchResult = fuzzySearch(searchText, carModel.data, ["label"]);
      setcarModelList(searchResult);
    }
    patchQuestionFlowForm({
      [PreApprovalQuestionsAddressKey.Province]: {
        value: "",
        isDataValid: false,
      },
    });
  };
  return (
    <StyledForm>
      <StyledTitleSection>
        <p>
          <LinkLabelLargeSemiBold>
            {t(`funnelFormPageSeva.findCar`)}
          </LinkLabelLargeSemiBold>
        </p>
        {isMobileDevice && (
          <StyledSerchBy>
            <StyledSearchByTitle>
              {t("funnelFormPageSeva.searchBy")}
            </StyledSearchByTitle>
          </StyledSerchBy>
        )}
      </StyledTitleSection>
      {isMobileDevice ? (
        <Select
          value={funnelQuery.paymentType}
          options={paymentTypeConfigMobile}
          name={"monthlyInstallment"}
          prefixIcon={() => <CarModelLogo color={colors.primary3} />}
          onChoose={onChooseMobile}
          suffixIcon={DownOutlined}
        />
      ) : (
        <StyledSelectPaymentType>
          <PaymentTypeFieldSeva />
        </StyledSelectPaymentType>
      )}
      <StyleSearch>
        <StyleSearchSelect>
          {funnelQuery.paymentType === "carModel" && (
            <Select
              options={carModelList}
              name={"province"}
              placeholder={t("funnelFormPageSeva.placeholder")}
              onChoose={onChoose}
              enableSearch={true}
              onSearch={onSearch}
              prefixIcon={() => <Search />}
              value={provinceValue}
              noOptionText={"funnelFormPageSeva.noOptionText"}
              // errorIcon={AlertInfo}
              isShowDropDownByValue={true}
              floatDropdown={true}
            />
          )}
          {funnelQuery.paymentType === "downPayment" && (
            <DownPaymentAmountSeva />
          )}
          {funnelQuery.paymentType === "monthlyInstallment" && (
            <MonthlyInstallmentSeva />
          )}
        </StyleSearchSelect>
        <Button
          width={"100%"}
          buttonType={ButtonType.primary1}
          onClick={handleSearchCars}
          loading={loading}
          height={"56px"}
        >
          {t(`find Me Car`)}
        </Button>
      </StyleSearch>
    </StyledForm>
  );
};
const StyledForm = styled.section`
  padding: 30px;
  background: ${colors.white};
  border-radius: ${isMobileDevice ? "16px" : "32px"};
  position: relative;
  margin-top: ${isMobileDevice ? "-60%" : "-23%"};
  display: flex;
  flex-direction: column;
  width: ${isMobileDevice ? "100%" : "60%"};
  margin-inline-start: ${isMobileDevice ? "5%" : "25%"};
  box-shadow: 0px 1px 16px rgba(3, 24, 56, 0.1);
`;
const StyledTitleSection = styled.section`
  margin-bottom: 16px;
`;
const StyleSearch = styled.div`
  display: flex;
  flex-direction: ${isMobileDevice ? "column" : "row"};
  justify-content: center;
  margin-top: 10px;
`;
const StyledSearchByTitle = styled.span`
  ${TextSmallRegular};
  font-weight: 500;
`;
const StyleSearchSelect = styled.div`
  margin-bottom: 10px;
  width: ${isMobileDevice ? "100%" : "200%"};
  height: 56px;
  margin-right: ${!isMobileDevice && "10px"};
`;
const StyledSelectPaymentType = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`;
const StyledSerchBy = styled.div`
  margin: 15px 0 0 0;
`;
