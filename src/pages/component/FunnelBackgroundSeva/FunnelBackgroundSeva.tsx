import React, { ReactElement } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";
import { PageHeaderSeva } from "pages/component/PageHeaderSeva/PageHeaderSeva";
import urls from "helpers/urls";
import { WebpPicture } from "components/WebpPicture/WebpPicture";
import { ALink } from "components/ALink/ALink";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { LogoSeva } from "components/icon/LogoSeva/LogoSevaFooter";
import { Banner } from "pages/HomePageSeva/Banner/Banner";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AdvisorSection } from "pages/HomePageSeva/AdvisorSection/AdvisorSection";
import { useDialogModal } from "components/DialogModal/DialogModal";
import CarRecommendation from "pages/HomePageSeva/CarRecommendation/CarRecommendation";
import { Articles } from "pages/HomePageSeva/Articles/Articles";
import { screenSize, isMobileDevice } from "utils/window";
import LoanCalculatorWidget from "pages/HomePageSeva/LoanCalculatorWidget/LoanCalculator";

interface FunnelBackgroundSevaProp {
  bgImage: string;
  children: ReactElement;
}

export const FunnelBackgroundSeva = ({
  bgImage,
  children,
}: FunnelBackgroundSevaProp) => {
  const { t } = useTranslation();
  const getHeaderElement = (bgImage: string) => (
    <Image src={bgImage} layout="responsive" />
  );
  const { DialogModal, showModal: showDialogModal } = useDialogModal();

  const getContentElement = () => <StyledContent>{children}</StyledContent>;
  const getFooterElement = () => (
    <StyledFooter>
      <LogoSeva />
      <StyleComponentFooter>
        {getLink(
          t("funnelBackground.link.termsAndConditions"),
          urls.termsAndConditionsSeva
        )}
        {getLink(
          t("funnelBackground.link.privacyPolicy"),
          urls.privacyPolicySeva
        )}
        {getLink(t("funnelBackground.link.contactUs"), urls.contactUsSeva)}
      </StyleComponentFooter>
    </StyledFooter>
  );

  const getLink = (message: string, url: string) => (
    <StyledLink>
      <ALink href={url} linkColor={colors.white} visitedColor={colors.label}>
        <StyledProgressText>{message}</StyledProgressText>
      </ALink>
    </StyledLink>
  );
  return (
    <StyledWrapper>
      <PageHeaderSeva />
      <StyledContentWrapper>
        {getHeaderElement(bgImage)}
        {/* {getTitleElement()} */}
        {getContentElement()}
      </StyledContentWrapper>
      <StyledCarousel
        showArrows={true}
        emulateTouch={true}
        showStatus={false}
        autoPlay={false}
        // renderIndicator={indicatorStyle}
        // onChange={(index) => setCurrentIndex(index)}
      >
        <BannerWrapper>
          <StyledBanner />
        </BannerWrapper>
        <BannerWrapper>
          <StyledBanner />
        </BannerWrapper>
        <BannerWrapper>
          <StyledBanner />
        </BannerWrapper>
        <BannerWrapper>
          <StyledBanner />
        </BannerWrapper>
        <BannerWrapper>
          <StyledBanner />
        </BannerWrapper>
      </StyledCarousel>
      <LoanCalculatorWidget />
      <Articles />
      <CarRecommendation />
      <AdvisorSection onSubmitSuccess={showDialogModal} />
      <DialogModal
        title={t("homePageSearch.advisor.thanksTitle")}
        desc={t("homePageSearch.advisor.thanksDesc")}
        confirmButtonText={t("homePageSearch.advisor.alertButton")}
      />
      {getFooterElement()}
    </StyledWrapper>
  );
};

const offset = 25;

const StyledWrapper = styled.div`
  background: white;
`;

const StyledContentWrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 10%;
`;

const StyledContent = styled.div`
  margin-top: ${-offset}px;
  width: 91%;
  background: white;
  text-align: center;
  border-radius: 8px;
  border: 1px solid ${colors.line};
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
const StyledFooter = styled.div`
  display: flex;
  flex-direction: ${isMobileDevice ? "column" : "row"};
  width: 100%;
  background: ${colors.line};
  text-align: center;
  align-items: ${isMobileDevice ? "left" : "center"};
  padding: 20px 24px;
  bottom: 0;
  justify-content: space-between;
  @media (max-width: ${screenSize.mobileS}) {
    width: none;
  }
  /* position: fixed; */
`;
const StyledLink = styled.div`
  margin-bottom: 16px;
  text-align: left;
`;

const StyleComponentFooter = styled.div`
  display: flex;
  flex-direction: ${isMobileDevice ? "column" : "row"};
  margin-top: ${offset}px;
  justify-content: space-between;
  width: ${isMobileDevice ? "auto" : "50%"};
  margin-right: ${isMobileDevice ? 0 : "10%"};
  margin-top: 40px;
`;
const StyledHeaderImg = styled(Image)`
  width: 100%;
  height: auto;
`;
// const StyleComponentTitle = styled.div`
//   position: relative;
//   top: -400px;
//   display: flex;
//   flex-direction: column;
// `
// const StyleComponentTextTitle = styled.span`
//   ${TextSuperLargeBoldStyle}
//   top: -400px;
//   color: ${colors.white};
//   margin-left: 100px;
// `
// const StyleComponentTextDescription = styled.span`
//   ${H2MediumMedium};
//   margin-top: 12px;
//   color: ${colors.white};
//   margin-left: 100px;
// `
const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledBanner = styled(Banner)`
  width: 80%;
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
const StyledProgressText = styled.span`
  ${TextSmallRegular};
  margin-left: 16px;
  color: ${colors.label};
`;
