import React from "react";
import styled from "styled-components";
// import image from './image/carDetail.webp'
import { useTranslation } from "react-i18next";
import { PageHeaderHeight } from "component/PageHeader/PageHeader";
import { FloatingBackButton } from "components/FloatingBackButton/FloatingBackButton";
import { H3MediumMedium } from "components/typography/H3MediumMedium";
import { H0LargeBold } from "components/typography/H0LargeBold";
import { Share } from "components/icon/Share/Share";
import { ImageCarousel } from "components/ImageSwipe/ImageCarouselSeva";
import { isMobileDevice } from "utils/window";
import { useHistory } from "react-router-dom";
import { useShareModal } from "components/ShareModal/ShareModal";
import { useContactUsModal } from "components/ContactUsModal/ContactUsModal";

interface ImageSwipeProps {
  height?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carModelDetails?: any;
}

export const VariantListShare = ({
  height = "auto",
  carModelDetails,
}: ImageSwipeProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  const { showModal: showShareModal, ShareModal } = useShareModal();
  const { showModal: showContactUsModal, ContactUsModal } = useContactUsModal();

  return (
    <StyleShareComponent>
      <ImageCarousel
        urls={carModelDetails?.images}
        height={isMobileDevice ? "" : height}
        width={"inherit"}
        // onIndexChange={onCarouselIndexChange}
        autoPlay={true}
      />
      <StyledBackButton onClick={handleGoBack} />
      <StyleBackground>
        <StyleTitleComponent>
          <StyleTextMerk>{carModelDetails?.brand}</StyleTextMerk>
          <StyleComponentDetail>
            <StyleComponentLeft>
              <StyleTextType>{carModelDetails?.model}</StyleTextType>
              <StyleTextRangePrice>
                {localStorage.getItem("carDetail")}
              </StyleTextRangePrice>
            </StyleComponentLeft>
            <StyleComponentRight>
              <StyleComponentButton>
                <StyleShareButton onClick={() => showShareModal()}>
                  <StyledShare />
                  {!isMobileDevice && <p>Share</p>}
                </StyleShareButton>
                <StyleContactUseButton onClick={() => showContactUsModal()}>
                  Contact Us
                </StyleContactUseButton>
              </StyleComponentButton>
            </StyleComponentRight>
          </StyleComponentDetail>
        </StyleTitleComponent>
      </StyleBackground>
      <ShareModal />
      <ContactUsModal
        title={t("carResultsPage.questionTitle")}
        onSubmitSuccess={showContactUsModal}
      />
    </StyleShareComponent>
  );
};
const StyleShareComponent = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: calc(${PageHeaderHeight} - 30px);
  @media (max-width: 425px) {
    flex-direction: row;
  }
`;
const StyledBackButton = styled(FloatingBackButton)`
  top: calc(40px + ${PageHeaderHeight});
  left: calc(8px + ${PageHeaderHeight});
  @media (max-width: 425px) {
    top: calc(8px + ${PageHeaderHeight});
    left: calc(${PageHeaderHeight} - 35px);
  }
`;
const StyleTitleComponent = styled.div`
  display: flex;
  /* margin-top: calc(${PageHeaderHeight} - 280px); */
  flex-direction: column;
  margin-left: 100px;
  @media (max-width: 425px) {
    margin-left: 0;
  }
  @media (max-width: 850px) {
    margin-left: 0;
  }
`;
const StyleComponentDetail = styled.div`
  display: flex;
  flex-direction: row;
  color: #ffffff;
  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }
`;
const StyleComponentLeft = styled.div`
  flex-direction: column;
  flex: 1;
  @media (max-width: 425px) {
    flex-direction: row;
  }
`;
const StyleComponentRight = styled.div`
  flex-direction: column;
  flex: 1;
  @media (max-width: 425px) {
    flex-direction: row;
  }
`;
const StyleComponentButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: right;
  justify-content: center;
  @media (max-width: 425px) {
    margin-top: 50px;
    margin-left: 15px;
    margin-right: 15px;
  }
`;
const StyleTextMerk = styled(H3MediumMedium)`
  line-height: 36px;
  width: auto;
  color: #ffffff;
  @media (max-width: 425px) {
    font-weight: 600;
    font-size: 20px;
    flex-direction: row;
    display: flex;
    line-height: 28px;
  }
`;
const StyleTextType = styled(H0LargeBold)`
  line-height: 64px;
  font-weight: 700;
  display: flex;
  @media (max-width: 425px) {
    font-weight: 700;
    font-size: 32px;
    line-height: 48px;
  }
`;
const StyleTextRangePrice = styled.span`
  display: flex;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: 0.75px;
  @media (max-width: 425px) {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
  }
`;
const StyleShareButton = styled.div`
  height: 64px;
  border: 1px solid #ffffff;
  border-radius: 16px;
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-right: 30px;
  @media (max-width: 425px) {
    flex: 1;
    height: 56px;
  }
`;
const StyleContactUseButton = styled.div`
  height: 64px;
  border: 1px solid #ec0a23;
  border-radius: 16px;
  background-color: #ec0a23;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 425px) {
    flex: 4;
    height: 56px;
  }
`;
const StyleBackground = styled.div`
  position: relative;
  margin-top: 10px;
  box-shadow: 0px 0px 15px rgba(3, 24, 56, 0.5) 0%;
  background-image: linear-gradient(
    180deg,
    rgba(3, 24, 56, 0) 0%,
    rgba(3, 24, 56, 0.8) 100%
  );
  margin-top: calc(${PageHeaderHeight} - 230px);
  z-index: 1;
  padding: 10px;
  @media (max-width: 425px) {
    margin-top: calc(${PageHeaderHeight} - 250px);
    background-image: linear-gradient(
      rgba(3, 24, 56, 0.2) 0%,
      rgba(3, 24, 56, 0.8) 100%
    );
  }
`;
const StyledShare = styled(Share)`
  @media (max-width: 425px) {
    padding: 10px;
  }
`;
