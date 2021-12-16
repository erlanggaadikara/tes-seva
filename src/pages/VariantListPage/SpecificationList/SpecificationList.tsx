import React from "react";
import styled from "styled-components";
import { SpecificationItem } from "SpecificationItem/SpecificationItem";
import {
  getSpecificationList,
  SpecificationsUtils,
} from "utils/specificationUtils/specificationsUtils";
import { useTranslation } from "react-i18next";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import { VariantSpecificationsType } from "models/models";

interface SpecificationListProps {
  specifications: SpecificationsUtils;
}

export const SpecificationList = ({
  specifications,
}: SpecificationListProps) => {
  const { t } = useTranslation();
  const [currentLanguage] = useCurrentLanguage();
  const items = getSpecificationList({
    specifications,
    t,
    currentLanguage,
    sortBy: [
      VariantSpecificationsType.CarSeats,
      VariantSpecificationsType.FuelType,
      VariantSpecificationsType.Transmission,
    ],
  });
  return (
    <StyledWrapper>
      {items.map((item, index) => (
        <SpecificationItem
          key={index}
          icon={item.icon}
          description={item.content}
        />
      ))}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
