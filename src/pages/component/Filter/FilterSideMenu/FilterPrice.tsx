import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { FormControlValue } from "types/types";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { Select } from "components/form/Select/Select";
import { downPaymentConfig } from "pages/component/DownPaymentAmount/downPaymentAmount.config";

export const FilterPrice = () => {
  const { t } = useTranslation();
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData();

  const handleMinOnChange = (optionValue: FormControlValue) => {
    patchFunnelQuery({
      minPrice: optionValue,
    });
  };

  const handleMaxOnChange = (optionValue: FormControlValue) => {
    patchFunnelQuery({
      maxPrice: optionValue,
    });
  };

  return (
    <Wrapper>
      <StyledTitle>{t("carResultsPage.filterModal.priceRange")}</StyledTitle>
      <StyledSpacing />
      <Select
        value={funnelQuery.downPaymentAmount}
        options={downPaymentConfig.options}
        name={"downPaymentAmount"}
        onChoose={handleMinOnChange}
        suffixIcon={DownOutlined}
        placeholder={"Min price"}
      />
      <StyledSpacing />
      <Select
        value={funnelQuery.downPaymentAmount}
        options={downPaymentConfig.options}
        name={"downPaymentAmount"}
        onChoose={handleMaxOnChange}
        suffixIcon={DownOutlined}
        placeholder={"Max price"}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
  display: block;
  margin-top: 20px;
`;

const StyledSpacing = styled.div`
  height: 10px;
`;
