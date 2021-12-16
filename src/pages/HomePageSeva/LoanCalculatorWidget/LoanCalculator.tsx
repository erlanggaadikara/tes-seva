import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createGlobalStyle } from "styled-components";
import { SearchInput } from "components/SearchInput/SearchInput";
import styled from "styled-components";
import { colors } from "styles/colors";
import BackgroundImage from "./images/BackgroundImage.png";
import AstraBmw from "./images/AstraBmw.png";
import AstraDaihatsu from "./images/AstraDaihatsu.png";
import AstraFinancial from "./images/AstraFinancial.png";
import AstraInternational from "./images/AstraInternational.png";
import ToyotaAstra from "./images/ToyotaAstra.png";
import Ojk from "./images/Ojk.png";
import BackgroundImageMobile from "/images/BackgroundImageMobile.png";
import { useToast } from "components/Toast/Toast";
import { CarSuggestions, NewFunnelCarVariantDetails } from "types/types";
import { handleProgressUpdate } from "pages/component/loading/loadingUtils";
import { Loading } from "pages/component/loading/Loading";
import { fuzzySearch } from "utils/fuzzySearch/fuzzySearch";
import { getSuggestionsCars } from "services/newFunnel";
import { H0LargeBold } from "components/typography/H0LargeBold";
import { TextLegalRegular } from "components/typography/TextLegalRegular";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useTranslation } from "react-i18next";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";
import {
  getCarModelDetailsById,
  getCarVariantDetailsById,
} from "services/recommendations";
import { AxiosResponse } from "axios";

export default function LoanCalculatorWidget() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLists, setSuggestionsLists] = useState<CarSuggestions[]>(
    []
  );
  const { showToast } = useToast();
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(true);
  const { t } = useTranslation();
  const onSearchInputChange = (searchInputValue: string) => {
    setSearchInputValue(searchInputValue);
  };
  const [carVariantDetails, setCarVariantDetails] =
    useState<NewFunnelCarVariantDetails>();

  const resetLoadingState = () => {
    setProgress(0);
    setShowLoading(false);
  };
  const getAllSuggestions = () => {
    getSuggestionsCars({
      onDownloadProgress: handleProgressUpdate(setProgress),
    })
      .then((response) => {
        setSuggestions(response.data);
        resetLoadingState();
      })
      .catch(() => {
        resetLoadingState();
        showToast();
      });
  };

  const [filter, setFilter] = useState<CarSuggestions>();
  useEffect(() => {
    const filterSuggestions = searchInputValue
      ? fuzzySearch(searchInputValue, suggestions, ["variant_title"])
      : suggestions;
    setSuggestionsLists(filterSuggestions);
    if (filter) {
      setFilter(filterSuggestions[0]);
      getCarVariantDetailsById(filter?.id.toString()).then(
        (response: AxiosResponse<NewFunnelCarVariantDetails>) => {
          setCarVariantDetails(response.data);
        }
      );
    }
    if (carVariantDetails) {
      getCarModelDetailsById(carVariantDetails?.modelDetail.id).then(
        (result) => {
          console.log("byid", result.data);
        }
      );
    }
    setSuggestionsLists(filterSuggestions);
  }, [searchInputValue]);
  useEffect(() => {
    if (suggestions.length === 0) {
      setShowLoading(true);
      getAllSuggestions();
    }
    console.log("filter", suggestionsLists);
  }, []);
  return (
    <>
      <GlobalStyle />
      <WrapperLoanCalculator>
        <StyledTextWrapperTitle>
          <StyledTitle>{t("loanCalculatorWidget.title")}</StyledTitle>
        </StyledTextWrapperTitle>
        <StyledTextWrapperText>
          <StyledLegalThin>
            {t("loanCalculatorWidget.subtitle")}
          </StyledLegalThin>
        </StyledTextWrapperText>
        <StyledInput>
          <StyledInnerInput
            onSearchInputChange={onSearchInputChange}
            searchInputValue={searchInputValue}
            placeholder="search car model..."
          />
        </StyledInput>
        {suggestionsLists.length !== 0 && searchInputValue.length > 0 && (
          <StyledDataResult>
            {suggestionsLists.map((car) => {
              return (
                <StyledLink
                  key={car.id}
                  href={`new-funnel-loan-calculator/${car.id}`}
                  rel="noopener noreferrer"
                >
                  {car.variant_title && (
                    <StyledCarName
                      dangerouslySetInnerHTML={{
                        __html: car.variant_title?.replace(
                          searchInputValue,
                          '<strong style="font-weight: 700;">' +
                            searchInputValue +
                            "</strong>"
                        ),
                      }}
                    />
                  )}
                  <StyledCarPrice>{`Rp. ${car.price_value}`}</StyledCarPrice>
                </StyledLink>
              );
            })}
          </StyledDataResult>
        )}
        <Loading isShowLoading={isShowLoading} progress={progress} />
        <StyledImageWrapper>
          <TextLabel>{t("loanCalculatorWidget.textCarousel")}</TextLabel>
        </StyledImageWrapper>
        <StyledImageContainer>
          <AliceCarousel>
            <StyledImageContent>
              <StyledImageWrapper>
                <StyledImage src={AstraFinancial} />
                <StyledImage src={AstraDaihatsu} />
              </StyledImageWrapper>
              <StyledImageWrapper>
                <StyledImage src={ToyotaAstra} />
                <StyledImage src={AstraBmw} alt="Astra Financial" />
              </StyledImageWrapper>
            </StyledImageContent>
            <StyledImageContent>
              <StyledImageWrapper>
                <StyledImage src={Ojk} />
                <StyledImage src={AstraInternational} />
              </StyledImageWrapper>
            </StyledImageContent>
          </AliceCarousel>
        </StyledImageContainer>
      </WrapperLoanCalculator>
    </>
  );
}

export const GlobalStyle = createGlobalStyle`
  html body {
    max-width: 1440px;
    
  }
`;

const WrapperLoanCalculator = styled.div`
  background-image: url("/image/LoanCalculator/BackgroundImage.png");
  background-size: contain;
  background-repeat: no-repeat;
  height: 728px;
  @media (max-width: 768px) {
    background-image: url("/image/LoanCalculator/BackgroundImageMobile.png");
    background-size: 450px 100%;
    background-repeat: no-repeat;
    height: 628px;
    width: 415px;
  }
`;
const StyledTextWrapperTitle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 16px;
  align-items: center;
  width: 727px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    padding: 20px 16px;
    align-items: center;
    width: 415px;
  }
`;
const StyledTitle = styled(H0LargeBold)`
  font-family: "PoppinsBold";
  font-size: 43px;
  line-height: 54px;
  letter-spacing: 1px;
  margin-top: 10vh;
  margin-left: 10vw;
  @media (max-width: 768px) {
    width: 727px;
    margin-top: 2vh;
    margin-left: 2vw;
    font-size: 32px;
    line-height: 40px;
  }
`;
const StyledLegalThin = styled(TextLegalRegular)`
  font-family: "Poppins";
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.75px;
`;
const StyledTextWrapperText = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 16px;
  align-items: center;
  width: 524px;
  margin-left: 10vw;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    padding: 20px 16px;
    align-items: center;
    width: 342px;
    margin-left: 2vw;
  }
`;
const StyledInput = styled.div`
  width: 40%;
  height: 120px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  color: ${colors.title};
  background: ${colors.white};
  margin-left: 10vw;
  :focus {
    border-color: ${colors.primary1};
  }
  @media (max-width: 768px) {
    width: 90%;
    height: 104px;
    margin-right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    color: ${colors.title};
    background: ${colors.white};
    margin-left: 5vw;
  }
`;
const StyledInnerInput = styled(SearchInput)`
  width: 30vw;
  @media (max-width: 768px) {
    width: 335px;
  }
`;
const StyledLink = styled.a`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  :hover {
    background-color: #fde6e9;
    border-radius: 8px;
  }
  @media (max-width: 768px) {
    display: flex;
    height: 40px;
    align-items: start;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 3vh;
    margin-left: 3vw;
    margin-top: 3vh;
  }
`;
const StyledCarName = styled.div`
  color: ${colors.black};
  margin-left: 1vw;
  @media (max-width: 768px) {
    margin-left: 0vw;
  }
`;
const StyledCarPrice = styled.div`
  margin-right: 1vw;
`;
const StyledDataResult = styled.div`
  margin-top: -25px;
  width: 515px;
  border-radius: 16px;
  margin-left: 13vw;
  height: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;

  :-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 768px) {
    position: absolute;
    z-index: 99;
    margin-top: -25px;
    width: 311px;
    border-radius: 16px;
    margin-left: 16vw;
    height: 200px;
    background-color: white;
    box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
    overflow: hidden;
    overflow-y: auto;
  }
`;
const StyledImageContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    position: absolute;
    top: 480px;
    z-index: 9;
    display: flex;
    width: 100%;
    padding: 0 16px;
    .alice-carousel__prev-btn {
      left: -30px;
      bottom: -11px;
      text-align: right;
      position: absolute;
    }
    .alice-carousel__next-btn {
      bottom: -13px;
      position: absolute;
      right: -30px;
      display: inline-block;
      box-sizing: border-box;
      width: 50%;
      padding: 10px 5px;
    }
  }
`;
const StyledImageContent = styled.div`
  width: 100vw;
`;
const StyledImageWrapper = styled.div`
  line-height: initial;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  justify-content: space-evenly;
  margin-bottom: 2vh;
  flex-direction: row;
`;
const StyledImage = styled(Image)`
  width: 144px;
  height: 22px;
  filter: grayscale(1);
`;
const TextLabel = styled(LinkLabelMediumSemiBold)`
  display: none;
  color: #52627a;
  margin-top: 5vh;
  @media (max-width: 768px) {
    display: flex;
  }
`;
