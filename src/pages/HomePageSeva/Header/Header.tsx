import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { colors } from "styles/colors";
import { useToast } from "components/Toast/Toast";
import { CarSuggestions, NewFunnelCarVariantDetails } from "types/types";
import { handleProgressUpdate } from "component/loading/loadingUtils";
import { Loading } from "component/loading/Loading";
import { fuzzySearch } from "utils/fuzzySearch/fuzzySearch";
import { getSuggestionsCars } from "services/newFunnel";
import { SearchInput } from "components/SearchInput/SearchInput";
import {
  getCarModelDetailsById,
  getCarVariantDetailsById,
} from "services/recommendations";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

export default function HeaderVariant() {
  const { t } = useTranslation();
  const [variantId, setVariantId] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLists, setSuggestionsLists] = useState<CarSuggestions[]>(
    []
  );
  const { showToast } = useToast();
  const [progress, setProgress] = useState(0);
  const history = useHistory();
  const [isShowLoading, setShowLoading] = useState(true);
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
      getAllSuggestions();
    }
    console.log("filter", suggestionsLists);
  }, []);
  const clickList = (id: any) => {
    getCarVariantDetailsById(id).then(
      (response: AxiosResponse<NewFunnelCarVariantDetails>) => {
        setVariantId(response.data.modelDetail.id);
        history.replace(`/new-variant-details/${response.data.modelDetail.id}`);
        history.push(`/new-variant-details/${response.data.modelDetail.id}`);
        window.location.reload();
      }
    );
    console.log(`/new-variant-details/${variantId}`);
  };
  return (
    <>
      <GlobalStyle />
      <StyledWrapper>
        <StyledContentWrapper>
          <StyledSearchWrapper>
            <StyledInnerInput
              onSearchInputChange={onSearchInputChange}
              searchInputValue={searchInputValue}
              placeholder={t("funnelFormPageSeva.placeholder")}
            />
            {suggestionsLists.length !== 0 && searchInputValue.length > 0 && (
              <StyledDataResult>
                {suggestionsLists.map((car) => {
                  return (
                    <StyledLink
                      onClick={() => clickList(car.id)}
                      key={car.id}
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
                    </StyledLink>
                  );
                })}
              </StyledDataResult>
            )}
            <Loading isShowLoading={isShowLoading} progress={progress} />
          </StyledSearchWrapper>
        </StyledContentWrapper>
      </StyledWrapper>
    </>
  );
}

export const GlobalStyle = createGlobalStyle`
  html body {
    margin: 0 auto;
    max-width: 100vw;
  }
`;
const StyledWrapper = styled.div`
  background: ${colors.white};
  width: 100vw;
  height: 88px;
`;
const StyledContentWrapper = styled.div`
  max-width: 100vw;
  display: flex;
  padding-top: 16px;
  padding-left: 4vw;
  padding-right: 4vw;
  margin-top: 0.5vh;
  justify-content: center;
`;

const StyledDataResult = styled.div`
  margin-top: 7px;
  width: 626px;
  margin-left: 0vw;
  border-radius: 16px;
  height: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  z-index: 99;
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
const StyledLink = styled.a`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  :hover {
    background-color: #ec0a23;
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
  margin-left: 1vw;
  @media (max-width: 768px) {
    margin-left: 0vw;
  }
`;

const StyledSearchWrapper = styled.div`
  margin: 0;
  width: 500px;
  @media (max-width: 700px) {
    display: none;
  }
`;

const StyledInnerInput = styled(SearchInput)`
  width: 100%;
  @media (max-width: 768px) {
    width: 335px;
  }
`;
