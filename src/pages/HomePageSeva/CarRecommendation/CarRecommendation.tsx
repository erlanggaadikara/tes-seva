import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import arrow from "./images/Forward.svg";
import leftArrow from "./images/buttonLeft.svg";
import rightArrow from "./images/buttonRight.svg";
import { H3MediumMedium } from "components/typography/H3MediumMedium";
import { H2MediumMedium } from "components/typography/H2MediumMedium";
import { TextMediumRegular } from "components/typography/TextMediumRegular";

export default function CarRecommendation() {
  return (
    <>
      <GlobalStyle />
      <StyledWrapper>
        <TitleWrapper>
          <H3MediumMedium> Featured cars</H3MediumMedium>
          <StyledP>
            See all cars <StyledImg />
          </StyledP>
        </TitleWrapper>

        <StyledContentWrapper>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
            visibleSlides={2}
          >
            <Slider>
              <Slide index={0}>
                <SliderInnerWrapper>
                  <StyledH2>BMW M5</StyledH2>
                  <StyledH5>Rp 20.000 - 25.500 jt</StyledH5>
                  <StyledH6>New car • Ready stock</StyledH6>
                </SliderInnerWrapper>
              </Slide>
              <Slide index={1}>
                <SliderInnerWrapper>
                  <StyledH2>Toyota Supra</StyledH2>
                  <StyledH5>Rp 20.000 - 25.500 jt</StyledH5>
                  <StyledH6>New car • Ready stock</StyledH6>
                </SliderInnerWrapper>
              </Slide>
              <Slide index={2}>
                <SliderInnerWrapper>
                  <StyledH2>Toyota Mark-X</StyledH2>
                  <StyledH5>Rp 10.000 - 12.000 jt</StyledH5>
                  <StyledH6>New car • Ready stock</StyledH6>
                </SliderInnerWrapper>
              </Slide>
            </Slider>
            <ButtonBack
              style={{
                position: "absolute",
                top: "274px",
                left: "-10px",
                zIndex: 99,
                border: "none",
              }}
            >
              <StyledLeftButton />
            </ButtonBack>
            <ButtonNext
              style={{
                position: "absolute",
                top: "274px",
                right: "-32px",
                zIndex: 99,
                border: "none",
              }}
            >
              <StyledRightButton />
            </ButtonNext>
          </CarouselProvider>
        </StyledContentWrapper>
      </StyledWrapper>
    </>
  );
}

export const GlobalStyle = createGlobalStyle`
  html body {
    background: #ffffff;
    margin: 0 auto;
    max-width: 1440px;
  }
`;
const StyledWrapper = styled.div`
  filter: drop-shadow(0px 32px 64px rgba(17, 17, 17, 0.08));
  margin-bottom: 16px;
  margin-top: 20px;
  margin-right: 6vw;
  margin-left: 6vw;
  gap: 20px;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    max-height: auto;

    background-size: cover;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 2vw;
  margin-right: 2vw;
`;
const StyledH2 = styled(H2MediumMedium)`
  color: #ffffff;
  padding-top: 362px;
  padding-left: 20px;
  font-size: 24px;
  @media (max-width: 700px) {
    padding-top: 215px;
    font-size: 16px;
    line-height: 29px;
    letter-spacing: 0.75px;
  }
`;

const StyledH6 = styled(H2MediumMedium)`
  color: #ffffff;
  padding-left: 20px;
  font-size: 20px;
  line-height: 40px;
  @media (max-width: 700px) {
    font-size: 14px;
    line-height: 32px;
  }
`;
const StyledH5 = styled(H2MediumMedium)`
  color: #ffffff;
  padding-left: 20px;
  font-size: 32px;
  line-height: 40px;
  @media (max-width: 700px) {
    font-size: 24px;
    line-height: 32px;
  }
`;
const StyledContentWrapper = styled.div`
  max-width: 1440px;
  margin: 20px;
  .carousel__inner-slide {
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    left: 10px;
    top: 10px;
  }
  @media (max-width: 700px) {
    .slide___3-Nqo {
      position: relative;
      display: block;
      box-sizing: border-box;
      height: 0;
      margin: 0;
      list-style-type: none;
    }
    .carousel__inner-slide {
      width: 856px;
      height: calc(100% - 10px);
      left: -10px;
      top: 10px;
    }
  }
`;
const StyledImg = styled(Image).attrs({
  src: arrow,
})`
src`;
const StyledLeftButton = styled(Image).attrs({
  src: leftArrow,
})`

@media (max-width: 700px) {
  display: none;
  }
  src`;
const StyledRightButton = styled(Image).attrs({
  src: rightArrow,
})`

@media (max-width: 700px) {
  display: none;
  }
  src`;
const StyledP = styled(TextMediumRegular)`
  color: #002373;
  margin-left: 30vw;
`;
const SliderInnerWrapper = styled.div`
  height: 241px;
  margin: 10px;
  border-radius: 10px; */
  background-size: 632px 504px;
  max-width: 632px;
  height: 504px;
  border-radius: 16px;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      rgba(245, 244, 252, 0.02),
      rgba(7, 9, 63, 0.93)
    ),
    url("/image/image19.png");
  @media (max-width: 700px) {
    background-size: 414px auto;
    height: 334px;
    border-radius: 10px;
    border-radius: 16px;
    background-repeat: no-repeat;
    background-image: linear-gradient( rgba(245,244,252,0.02), rgba(7,9,63,0.93) ), url(/static/media/image19.28e294d4.png);
  }
}
`;
