import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "SectionHeader/SectionHeader";

import { TextSmallRegularStyle } from "components/typography/TextSmallRegular";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";
import { carResultsUrl } from "routes/routes";
import { useToast, ToastType } from "components/Toast/Toast";
import { useHistory } from "react-router";
import { Brands, Brand } from "./brand.config";
import { generateQuery } from "utils/httpUtils/httpUtils";
import { QueryKeys } from "models/models";
import { colors } from "styles/colors";
import { getSpacing } from "utils/componentUtils";
import {
  trackSelectHomeBanner,
  NewHomePageVersion,
} from "helpers/amplitude/newHomePageEventTracking";

export const BrandSection = () => {
  const { t } = useTranslation();
  const { RenderToast } = useToast();
  const history = useHistory();
  const { patchFunnelQuery, clearFunnelQuery } = useFunnelQueryData();

  const onBrand = (brand: Brand) => {
    trackSelectHomeBanner(brand.name, NewHomePageVersion.phone);
    clearFunnelQuery();
    const brands = [brand.name];
    patchFunnelQuery({ brand: brands });
    requestCarRequest(brands);
  };

  const requestCarRequest = (brands: string[]) => {
    history.push({
      pathname: carResultsUrl,
      search: generateQuery({
        [QueryKeys.CarBrand]: brands.join(","),
      }),
    });
  };

  return (
    <StyledContainer>
      <SectionHeader text={t("homePageSearch.browseByBrand.text")} />
      <StyledBrandsContainer>
        {Brands.map((brand) => (
          <StyledBrandContainer key={brand.name} onClick={() => onBrand(brand)}>
            {brand.logo}
            <StyledLabel>{brand.name}</StyledLabel>
          </StyledBrandContainer>
        ))}
      </StyledBrandsContainer>
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </StyledContainer>
  );
};
const itemWidth = 100;
const spacing = getSpacing(itemWidth, 3);

const StyledContainer = styled.div`
  background-color: ${colors.white};
`;
const StyledBrandsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: ${spacing}px;
`;

const StyledBrandContainer = styled.div`
  background: ${colors.white};
  border: 1.5px solid ${colors.line};
  box-sizing: border-box;
  border-radius: 16px;
  height: 112px;
  width: ${itemWidth}px;
  margin-right: ${spacing}px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLabel = styled.p`
  ${TextSmallRegularStyle};
  margin-top: 6px;
`;
