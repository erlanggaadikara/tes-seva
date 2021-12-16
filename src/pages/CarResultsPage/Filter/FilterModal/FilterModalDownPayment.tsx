import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import { colors } from "styles/colors";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { useTranslation } from "react-i18next";
import { SwitchButton } from "components/form/SwitchButton/SwitchButton";
import { DownPaymentType, FunnelQueryKey } from "models/models";
import { FiledSection } from "HomePage/components/FiledSection/FiledSection";
import { DownPaymentAmount } from "component/DownPaymentAmount/DownPaymentAmount";
import { DownPaymentPercentage } from "component/DownPaymentPercentage/DownPaymentPercentage";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";

export const FilterModalDownPayment = () => {
  const { t } = useTranslation();
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData();
  const [switchValue, setSwitchValue] = useState<boolean>(
    funnelQuery.downPaymentType === DownPaymentType.DownPaymentAmount
  );
  const switchBtnValues = [
    t("carResultsPage.filterModal.amount"),
    t("carResultsPage.filterModal.percentage"),
  ];
  const switchClick = (value: boolean) => {
    setSwitchValue(value);
    value
      ? patchFunnelQuery({
          [FunnelQueryKey.DownPaymentType]: DownPaymentType.DownPaymentAmount,
          [FunnelQueryKey.DownPaymentPercentage]: "",
        })
      : patchFunnelQuery({
          [FunnelQueryKey.DownPaymentType]:
            DownPaymentType.DownPaymentPercentage,
          [FunnelQueryKey.DownPaymentAmount]: "",
        });
  };

  useEffect(() => {
    setSwitchValue(
      funnelQuery.downPaymentType === DownPaymentType.DownPaymentAmount
    );
  }, [funnelQuery]);

  return (
    <>
      <StyledTitle>
        {t("carResultsPage.filterModal.downpaymentTitle")}
      </StyledTitle>
      <StyledSubtitle>
        {t("carResultsPage.filterModal.downpaymentSubtitle")}
      </StyledSubtitle>
      <StyledSwitch>
        <SwitchButton
          isChecked={switchValue}
          switchClick={switchClick}
          switchBtnValues={switchBtnValues}
        />
      </StyledSwitch>
      {funnelQuery.downPaymentType === DownPaymentType.DownPaymentAmount && (
        <FiledSection fieldLabel={"carResultsPage.filterModal.amountText"}>
          <DownPaymentAmount />
        </FiledSection>
      )}
      {funnelQuery.downPaymentType ===
        DownPaymentType.DownPaymentPercentage && (
        <FiledSection fieldLabel={"carResultsPage.filterModal.percentageText"}>
          <DownPaymentPercentage />
        </FiledSection>
      )}
    </>
  );
};

const StyledTitle = styled(LinkLabelMediumSemiBold)`
  color: ${colors.title};
  display: block;
  margin-top: 20px;
`;

const StyledSubtitle = styled(LinkLabelLegalSemiBold)`
  color: ${colors.label};
  display: block;
  margin-bottom: 16px;
`;

const StyledSwitch = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
`;
