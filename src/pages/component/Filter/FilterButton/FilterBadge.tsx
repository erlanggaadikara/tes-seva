import React, { useEffect, useState } from "react";
import { LinkLabelXSmallSemiBold } from "components/typography/LinkLabelXSmallSemiBold";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import styled from "styled-components";
import { colors } from "styles/colors";

export const FilterBadge = () => {
  const { funnelQuery } = useFunnelQueryData();
  const [badge, setBadge] = useState<number>(0);

  useEffect(() => {
    const {
      monthlyInstallment,
      downPaymentAmount,
      downPaymentPercentage,
      brand,
      bodyType,
    } = funnelQuery;
    const badgeGroups = [
      monthlyInstallment,
      downPaymentAmount,
      downPaymentPercentage,
      brand?.join(""),
      bodyType?.join(""),
    ];
    setBadge(badgeGroups.filter((item) => !!item).length);
  }, [funnelQuery]);

  return (
    <>
      {!!badge && (
        <StyledBadge>
          <LinkLabelXSmallSemiBold>{badge}</LinkLabelXSmallSemiBold>
        </StyledBadge>
      )}
    </>
  );
};

const StyledBadge = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background: ${colors.white};
  color: ${colors.primary1};
  text-align: center;
  position: absolute;
  right: -5px;
  top: -8px;
`;
