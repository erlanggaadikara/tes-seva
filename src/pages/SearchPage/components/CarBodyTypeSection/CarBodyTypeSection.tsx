import React from "react";
import { SectionHeader } from "SectionHeader/SectionHeader";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { BodyTypeConfig, BodyType } from "./CarBodyTypeSection.config";
import { TextSmallRegularStyle } from "components/typography/TextSmallRegular";
import { useHistory } from "react-router-dom";
import { carResultsUrl } from "routes/routes";
import { QueryKeys } from "models/models";
import { generateQuery } from "utils/httpUtils/httpUtils";
import { colors } from "styles/colors";
import { getSpacing } from "utils/componentUtils";
import { trackSelectHomeBodyType } from "helpers/amplitude/newHomePageEventTracking";

export const CarBodyTypeSection = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const onBodyTypeClick = (bodyType: BodyType) => {
    trackSelectHomeBodyType(bodyType.type);
    history.push({
      pathname: carResultsUrl,
      search: generateQuery({
        [QueryKeys.CarBodyType]: bodyType.type,
      }),
    });
  };

  return (
    <StyledWrapper>
      <SectionHeader text={t("homePageSearch.carBodyType.title")} />
      <StyledContainer>
        {BodyTypeConfig.map((config) => (
          <StyledItem
            key={config.type}
            isPlaceholder={false}
            onClick={() => onBodyTypeClick(config)}
          >
            {config.img}
            <StyledText>
              {t(`variantDetails.variantBodyType.${config.type}`)}
            </StyledText>
          </StyledItem>
        ))}

        <StyledItem isPlaceholder={true} />
      </StyledContainer>
    </StyledWrapper>
  );
};

const itemWidth = 156;
const spacing = getSpacing(itemWidth);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: ${spacing}px;
`;

const StyledItem = styled.div<{ isPlaceholder: boolean }>`
  visibility: ${({ isPlaceholder }) => (isPlaceholder ? "hidden" : "visible")};
  border-radius: 16px;
  background: ${colors.white};
  border: 1.5px solid ${colors.line};
  box-sizing: border-box;
  width: ${itemWidth}px;
  margin-right: ${spacing}px;
  height: 112px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
`;

const StyledText = styled.span`
  ${TextSmallRegularStyle};
  margin-top: 5px;
`;
