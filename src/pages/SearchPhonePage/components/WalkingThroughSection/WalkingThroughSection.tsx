import React, { CSSProperties, useState } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { Button, ButtonType } from "components/Button/Button";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { WalkingThroughConfig } from "./WalkingThrough.config";
import { colors, transparent } from "styles/colors";
import {
  trackSelectHomeFindOutMore,
  NewHomePageVersion,
} from "helpers/amplitude/newHomePageEventTracking";

export const indicatorCSSProperties = (isSelected: boolean): CSSProperties => {
  return {
    background: isSelected ? colors.primaryLight1 : transparent("white", 0.5),
    width: 8,
    height: 8,
    display: "inline-block",
    marginRight: 3,
    marginLeft: 3,
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 10,
  };
};

export const indicatorStyle = (
  onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
  isSelected: boolean,
  index: number,
  label: string
) => {
  return (
    <li
      style={indicatorCSSProperties(isSelected)}
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      value={index}
      key={index}
      role="button"
      tabIndex={isSelected ? 0 : undefined}
      title={`${label} ${index + 1}`}
      aria-label={`${label} ${index + 1}`}
    />
  );
};

export const WalkingThroughSection = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onCTA = () => {
    trackSelectHomeFindOutMore(NewHomePageVersion.phone);
    history.push(WalkingThroughConfig[currentIndex].destination);
  };

  return (
    <StyledContainer>
      <StyledCarousel
        showArrows={false}
        emulateTouch={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={false}
        renderIndicator={indicatorStyle}
        onChange={(index) => setCurrentIndex(index)}
      >
        {WalkingThroughConfig.map((config) => (
          <StyledContentContainer key={config.title}>
            <StyledTitle>
              <LinkLabelLargeSemiBold>{t(config.title)}</LinkLabelLargeSemiBold>
            </StyledTitle>
            <WebpPicture
              src={config.webpImg}
              fallbackImage={<img src={config.originImg} alt="car image" />}
            />
            <StyledDesc>
              <LinkLabelLargeSemiBold>{t(config.desc)}</LinkLabelLargeSemiBold>
            </StyledDesc>
          </StyledContentContainer>
        ))}
      </StyledCarousel>
      <StyledButton buttonType={ButtonType.primary2} onClick={onCTA}>
        {t(`homePageSearch.walkingThrough.cta`)}
      </StyledButton>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: ${colors.primary1};
  align-items: stretch;
  justify-content: stretch;
  display: flex;
  flex-direction: column;
`;

const StyledCarousel = styled(Carousel)`
  && .slide {
    background: none;
    padding-bottom: 30px;
  }
  && .control-dots {
    bottom: 12px;
    padding: 0 16px 0 16px;
    margin: 0;
  }
`;

const StyledContentContainer = styled.div`
  position: relative;
  background-color: ${colors.primary1};
  color: white;
  text-align: center;
`;
const StyledTitle = styled.div`
  position: absolute;
  top: 56px;
  left: 24px;
  right: 24px;
  width: calc(100% - 48px);
`;

const StyledDesc = styled.div`
  margin: 0 24px 20px;
`;

const StyledButton = styled(Button)`
  margin: 24px 24px 48px;
`;
