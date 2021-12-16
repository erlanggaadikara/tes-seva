import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { FilterBrand } from "./FilterBrand";
import { FilterBody } from "./FilterBody";
import { FilterMonthly } from "./FilterMonthly";
import { FilterDownPayment } from "./FilterDownPayment";
import { Line } from "components/Line/Line";

export const FilterSideMenu = () => {
  return (
    <Wrapper>
      <StyledTitle>Filter by</StyledTitle>
      <FilterBrand isSideMenuFilter={true} />
      <Line width={"100%"} height={"1px"} background={colors.line} />
      <FilterBody isSideMenuFilter={true} />
      <Line width={"100%"} height={"1px"} background={colors.line} />
      <FilterMonthly isSideMenuFilter={true} />
      <Line width={"100%"} height={"1px"} background={colors.line} />
      <FilterDownPayment isSideMenuFilter={true} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  font-size: 28px;
  margin-bottom: 30px;
`;
