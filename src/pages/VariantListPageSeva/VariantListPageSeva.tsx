import React, { useState, useLayoutEffect, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { MaxWidthStyle } from "styles/MaxWidthStyle";
import { VariantListShare } from "./Share/VarianListShare";
import { isMobileDevice } from "utils/window";
import { maxPageWidth } from "styles/GlobalStyle";
import { useContextCarModelDetails } from "context/carModelDetailsContext/carModelDetailsContext";
import { useContextCarVariantDetails } from "context/carVariantDetailsContext/carVariantDetailsContext";
import {
  getCarModelDetailsById,
  getCarVariantDetailsById,
} from "services/recommendations";
import { ProductOverview } from "./ProductOverview/ProductOverview";
import { PreApprovalBanner } from "./PreApprovalBanner/PreApprovalBanner";
import { Article } from "./Article/Article";
import { Galery } from "./Galery/Galery";
import { Loading } from "pages/component/loading/Loading";
import { handleProgressUpdate } from "component/loading/loadingUtils";
import { FooterSeva } from "pages/component/FooterSeva/FooterSeva";
import { VariantOptionsSeva } from "pages/component/VariantOptionsSeva/VariantOptionsSeva";
import HeaderVariant from "pages/HomePageSeva/Header/Header";
import { PageHeaderSeva } from "pages/component/PageHeaderSeva/PageHeaderSeva";
import PreviousViewedCar from "pages/HomePageSeva/PreviousViewedCars/PreviousViewedCars";

interface Params {
  id: string;
}

export default function VariantListPageSeva() {
  const { id } = useParams<Params>();
  const [progress, setProgress] = useState(0);
  const [isShowLoading, setShowLoading] = useState(false);
  const [loadingTitle] = useState("loadingPage.title");
  const { carModelDetails, setCarModelDetails } = useContextCarModelDetails();
  const { carVariantDetails, setCarVariantDetails } =
    useContextCarVariantDetails();
  const carouseSizeRatio = 1.4;
  const initCarouseHeight = isMobileDevice
    ? 245
    : parseInt(maxPageWidth) / carouseSizeRatio;
  const [carouseHeight, setCarouseHeight] = useState<number>(initCarouseHeight);
  const getCarouseHeight = () => {
    const screenWidth = document.body.clientWidth;
    setCarouseHeight(
      (screenWidth - parseInt(pagePadding) * 2) / carouseSizeRatio
    );
  };
  useLayoutEffect(() => {
    getCarouseHeight();
  }, [carModelDetails]);

  useEffect(() => {
    getCarModelDetailsById(id, {
      onDownloadProgress: handleProgressUpdate(setProgress),
    }).then((result) => {
      getCarVariantDetailsById(result.data.variants[0].id).then((result) => {
        setCarVariantDetails(result.data);
      });
      setCarModelDetails(result.data);

      setShowLoading(false);
    });
  }, []);

  return (
    <>
      <MaxWidthStyle />
      <PageHeaderSeva>
        <HeaderVariant />
      </PageHeaderSeva>
      <VariantListShare
        height={carouseHeight}
        carModelDetails={carModelDetails}
      />
      <StyledOverviewContainer>
        <ProductOverview
          brochure={carVariantDetails?.variantDetail.pdfUrl}
          description={
            carVariantDetails?.variantDetail.description || { id: "", en: "" }
          }
        />
        <PreApprovalBanner />
      </StyledOverviewContainer>
      <Galery
        carModelImages={carVariantDetails?.variantDetail.images || [""]}
      />
      <Article />
      <VariantOptionsSeva id={id} />
      <PreviousViewedCar />
      <FooterSeva />
      <Loading
        isShowLoading={isShowLoading}
        progress={progress}
        message={loadingTitle}
      />
    </>
  );
}
const pagePadding = "16px";

const StyledOverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 769px) {
    flex-direction: column-reverse;
  }
  margin: 20px 0;
`;
