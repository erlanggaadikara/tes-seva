import React, { CSSProperties } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { replaceSuffixWith } from "utils/stringUtils";
import { FileFormat } from "models/models";
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import { isMobileDevice } from "utils/window";

interface ImageSwipeProps {
  urls: string[];
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  onIndexChange?: (currentIndex: number) => void;
  showIndicators?: boolean;
  interval?: number;
  autoPlay?: boolean;
}

export const ImageCarousel = ({
  urls,
  width = "100%",
  height = "none",
  padding = 16,
  onIndexChange,
  showIndicators = true,
}: ImageSwipeProps) => {
  const preloadedUrls: string[] = [];

  const indicatorCSSProperties = (isSelected: boolean): CSSProperties => {
    return {
      background: isSelected ? colors.primaryLight1 : colors.line,
      width: 8,
      height: 8,
      display: "inline-block",
      marginRight: 3,
      marginLeft: 3,
      padding: 0,
      marginTop: 0,
      marginBottom: 0,
      borderRadius: 10,
      position: "relative",
      left: isMobileDevice ? "none" : 450,
      bottom: isMobileDevice ? 30 : "none",
      zIndex: 9,
    };
  };
  const indicatorStyle = (
    onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string
  ) => {
    return (
      //   <StyleIndicator>
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
      //   </StyleIndicator>
    );
  };

  const handleChange = (selectedIndex: number) => {
    onIndexChange && onIndexChange(selectedIndex);
    const url = urls[selectedIndex + 1];
    if (!url) {
      return;
    }
    const webpUrl = encodeURI(
      replaceSuffixWith(url, FileFormat.Webp.toString())
    );
    if (selectedIndex > 0 && !preloadedUrls.includes(webpUrl)) {
      const img = new Image();
      img.src = webpUrl;
      preloadedUrls.push(webpUrl);
    }
  };
  console.log(height);
  return (
    <StyledCarousel
      padding={padding}
      showArrows={false}
      emulateTouch={true}
      showThumbs={false}
      showStatus={false}
      showIndicators={showIndicators}
      renderIndicator={indicatorStyle}
      autoPlay={true}
      infiniteLoop={true}
      interval={4000}
      height={"700px"}
      onChange={handleChange}
    >
      {urls &&
        urls.map((url, index) => {
          return (
            <WebpPicture
              key={index}
              src={url}
              fallbackImage={
                <StyledRoundImage
                  width={width}
                  src={url}
                  alt="car image"
                  visibleByDefault={index <= 1}
                />
              }
            />
          );
        })}
    </StyledCarousel>
  );
};

const StyledRoundImage = styled(LazyLoadImage)`
  border-radius: 8px;
  z-index: -1;
`;
const StyledCarousel = styled(Carousel)<{
  padding: number | string;
  height?: string | number;
}>`
  && .slide {
    background: none;
    height: ${isMobileDevice ? "none" : ({ height }) => height};
    padding: ${({ padding }) => padding};
    padding-bottom: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  && .control-dots {
    bottom: 12px;
    padding: 0 16px 0 16px;
    margin: 0;
  }
  && .carousel * {
    box-sizing: border-box;
    width: inherit;
  }
  && .carousel-indicator {
    text-align: right;
    float: right;
    right: 2% !important;
    left: inherit;
  }
`;
