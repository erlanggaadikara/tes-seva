import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { SwitchButton } from "components/form/SwitchButton/SwitchButton";
import { DownPaymentAmount } from "pages/component/DownPaymentAmount/DownPaymentAmount";
import { DownPaymentPercentage } from "pages/component/DownPaymentPercentage/DownPaymentPercentage";
import { FunnelQueryKey, DownPaymentType } from "models/models";

interface FilterDownPaymentProps {
  isSideMenuFilter?: boolean;
}

export const FilterDownPayment = ({
  isSideMenuFilter,
}: FilterDownPaymentProps) => {
  const { t } = useTranslation();
  const { funnelQuery, patchFunnelQuery } = useFunnelQueryData();
  const isSideMenu = isSideMenuFilter;

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
      <StyledSpacing />
      <StyledSwitch>
        <SwitchButton
          isChecked={switchValue}
          switchClick={switchClick}
          switchBtnValues={switchBtnValues}
        />
      </StyledSwitch>
      <StyledSpacing />
      {funnelQuery.downPaymentType === DownPaymentType.DownPaymentAmount && (
        <DownPaymentAmount isSideMenuFilter={isSideMenu} />
      )}
      {funnelQuery.downPaymentType ===
        DownPaymentType.DownPaymentPercentage && (
        <DownPaymentPercentage isSideMenuFilter={isSideMenu} />
      )}
    </>
  );
};

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
  display: block;
  margin-top: 20px;
`;

const StyledSpacing = styled.div`
  height: 10px;
`;

const StyledSwitch = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
`;
