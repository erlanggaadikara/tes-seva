import { H3MediumMedium } from "components/typography/H3MediumMedium";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { colors } from "styles/colors";
import data from "./data.json";
interface year {
  year: string;
  value: string;
  DropRate: string;
}
interface model {
  modelId: string;
  year: year[];
}
interface Data {
  model: model;
}

export default function VariantListPage() {
  const [dataDum, setDataDum] = useState<Data[]>();
  useEffect(() => {
    setDataDum(data);
    console.log(dataDum);
  }, []);
  return (
    <>
      <GlobalStyle />
      <StyledTitleSection>Depreciation rate</StyledTitleSection>
      <StyledContentCard>
        {data.length > 0 ? (
          <StyledTable>
            <StyledTr>
              <StyledTh>{data[0].model.labelYear}</StyledTh>
              <StyledTh>{data[0].model.year[0].year}</StyledTh>
              <StyledTh>{data[0].model.year[1].year}</StyledTh>
              <StyledTh>{data[0].model.year[2].year}</StyledTh>
              <StyledTh>{data[0].model.year[3].year}</StyledTh>
              <StyledTh>{data[0].model.year[4].year}</StyledTh>
            </StyledTr>
            <StyledTr>
              <StyledTd>{data[0].model.labelValue}</StyledTd>
              <StyledTd>{data[0].model.year[0].value}</StyledTd>
              <StyledTd>{data[0].model.year[1].value}</StyledTd>
              <StyledTd>{data[0].model.year[2].value}</StyledTd>
              <StyledTd>{data[0].model.year[3].value}</StyledTd>
              <StyledTd>{data[0].model.year[4].value}</StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTd>{data[0].model.dropValue}</StyledTd>
              <StyledTd>{data[0].model.year[0].DropRate}</StyledTd>
              <StyledTd>{data[0].model.year[1].DropRate}</StyledTd>
              <StyledTd>{data[0].model.year[2].DropRate}</StyledTd>
              <StyledTd>{data[0].model.year[3].DropRate}</StyledTd>
              <StyledTd>{data[0].model.year[4].DropRate}</StyledTd>
            </StyledTr>
          </StyledTable>
        ) : (
          <h2>null</h2>
        )}
      </StyledContentCard>
    </>
  );
}
const GlobalStyle = createGlobalStyle`
  html body {
    max-width: 1440px;
    
  }
`;
const StyledContentCard = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  flex-wrap: wrap;
  position: relative;
`;
const StyledTitleSection = styled(H3MediumMedium)`
  color: ${colors.title};
  line-height: 36px;
  margin-top: 4vh;
  margin-bottom: 2vh;
  margin-left: 6vw;
`;
const StyledTable = styled.table`
  width: 80vw;
  height: 12vh;
  border: 1px solid black;
`;
const StyledTr = styled.tr``;
const StyledTh = styled.th``;
const StyledTd = styled.td``;
