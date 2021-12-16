import React from "react";
import { SpecificationGrids } from "./SpecificationGrids";
import { ALink } from "components/ALink/ALink";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { Collapse } from "components/DropDownBox/Collapse";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { CarVariantDetails, VariantSpecifications } from "types/types";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { colors } from "styles/colors";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { getSpecificationList } from "utils/specificationUtils/specificationsUtils";
import { trackVariantDetailsEvent } from "VariantDetailsPage/variantDetailsUtils/variantDetailsUtils";
import { useCarResultParameter } from "hooks/useAmplitudePageView/useAmplitudePageView";
import {
  trackSelectCarResultVariantDetailsSpecifications,
  trackSelectCarResultVariantDetailsViewBrochure,
} from "helpers/amplitude/newFunnelEventTracking";

interface SpecificationAreaProps {
  carVariantDetails: CarVariantDetails;
  variantSpecifications: VariantSpecifications[];
  brochure: string;
  specifications: string;
  isNewFunnel: boolean;
}

export const SpecificationArea = ({
  carVariantDetails,
  specifications,
  brochure,
  isNewFunnel,
}: SpecificationAreaProps) => {
  const { t } = useTranslation();
  const [currentLanguage] = useCurrentLanguage();
  const carResultParameter = useCarResultParameter();
  const onCollapseExpand = () => {
    isNewFunnel &&
      trackVariantDetailsEvent({
        carVariantDetails,
        carResultParameter,
        trackFunction: trackSelectCarResultVariantDetailsSpecifications,
      });
  };

  const getSpecifications = (): JSX.Element => {
    if (!carVariantDetails) {
      return <> </>;
    }
    const specifications = carVariantDetails?.variantDetail;
    const items = getSpecificationList({
      specifications,
      t,
      currentLanguage,
      onlyShowSeatNumber: true,
    });
    const onBrochureClick = () => {
      isNewFunnel &&
        trackVariantDetailsEvent({
          carVariantDetails,
          carResultParameter,
          trackFunction: trackSelectCarResultVariantDetailsViewBrochure,
        });
    };
    return (
      <div>
        <SpecificationGrids items={items} />
        <StyledALink>
          <ALink
            href={carVariantDetails.variantDetail.pdfUrl}
            onClick={onBrochureClick}
          >
            <u>
              <LinkLabelSmallSemiBold>{t(brochure)}</LinkLabelSmallSemiBold>
            </u>
          </ALink>
        </StyledALink>
      </div>
    );
  };
  const suffixIcon = () => <DownOutlined color={colors.label} />;
  const generateCollapseTitle = (title: string) => (
    <LinkLabelLargeSemiBold>{title}</LinkLabelLargeSemiBold>
  );

  return (
    <StyledSpecifications>
      <Collapse
        collapseTitle={generateCollapseTitle(t(specifications))}
        suffixIcon={suffixIcon}
        content={getSpecifications()}
        style={{
          borderRadius: "16px",
        }}
        onExpand={onCollapseExpand}
      />
    </StyledSpecifications>
  );
};

const StyledSpecifications = styled.div`
  width: 100%;
  margin-bottom: 16px;
  margin-top: 24px;
  border-radius: 10px;
`;

const StyledALink = styled.div`
  text-align: center;
`;
