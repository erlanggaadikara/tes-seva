import React from "react";
import { CarVariantDetails, CarModelBasicDetailsResponse } from "types/types";
import { VariantDetailHeader } from "component/VariantDetailHeader/VariantDetailHeader";
import { VariantDetailBody } from "component/VariantDetailBody/VariantDetailBody";
import { variantDetailsConfig } from "VariantDetailsPage/variantDetails.config";
import { ModelDetailHeader } from "component/ModelDetailHeader/ModelDetailHeader";
import { ModelDetailBody } from "component/ModelDetailBody/ModelDetailBody";
import { VariantBasicInfo } from "component/VariantBasicInfo/VariantBasicInfo";
import styled from "styled-components";

interface DetailsHeaderProps {
  carVariantDetailsForDisplay?: CarVariantDetails;
  carModelDetailForDisplay?: CarModelBasicDetailsResponse;
}

export const ModelOrVariantDetails = ({
  carVariantDetailsForDisplay,
  carModelDetailForDisplay,
}: DetailsHeaderProps) => (
  <>
    {carModelDetailForDisplay && (
      <>
        <ModelDetailHeader carModelDetails={carModelDetailForDisplay} />
        <ModelDetailBody
          carModelDetails={carModelDetailForDisplay}
          discount={variantDetailsConfig.discount}
        />
      </>
    )}
    {carVariantDetailsForDisplay && (
      <>
        <VariantDetailHeader carVariantDetails={carVariantDetailsForDisplay} />
        <VariantBasicInfo {...carVariantDetailsForDisplay} />
        <StyledDetailsContainer>
          <VariantDetailBody
            carVariantDetails={carVariantDetailsForDisplay}
            description={variantDetailsConfig.description}
            specifications={variantDetailsConfig.specifications}
            variantSpecifications={
              variantDetailsConfig.variantSpecifications.items
            }
            brochure={variantDetailsConfig.variantSpecifications.brochure}
          />
        </StyledDetailsContainer>
      </>
    )}
  </>
);

const StyledDetailsContainer = styled.section`
  margin: 20px 0 0 0;
`;
