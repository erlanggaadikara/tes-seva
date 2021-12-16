import { colors } from "styles/colors";
import { Button, ButtonType } from "components/Button/Button";
import React, { useEffect } from "react";
import styled from "styled-components";
import { maxPageWidth, screenHeight } from "styles/GlobalStyle";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footer } from "components/Footer/Footer";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { DocumentType, FrameType, getFrameSize } from "utils/imageUtils";
import { imageQualityCheckUrl, preApprovalVerifyKTPUrl } from "routes/routes";
import { ArrowBack } from "components/ArrowBack/ArrowBack";
import { LocationStateKey, UploadChannel } from "models/models";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import {
  trackViewPreapprovalKTPUploadCameraPreview,
  trackSelectPreapprovalKTPUploadCameraPreviewUse,
  trackSelectPreapprovalKTPUploadCameraPreviewRetake,
} from "helpers/amplitude/preApprovalEventTracking";

export default function ImagePreviewPage() {
  useAmplitudePageView(trackViewPreapprovalKTPUploadCameraPreview);
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation<{ [LocationStateKey.File]: File } | undefined>();

  const image = location.state?.file
    ? URL.createObjectURL(location.state?.file)
    : "";

  useEffect(() => {
    if (!image) {
      history.replace(preApprovalVerifyKTPUrl);
    }
  }, []);

  const handleUsePhoto = async () => {
    history.push({
      pathname: imageQualityCheckUrl,
      state: {
        [LocationStateKey.File]: location.state?.file,
        [LocationStateKey.Channel]: UploadChannel.Camera,
      },
    });
    trackSelectPreapprovalKTPUploadCameraPreviewUse();
  };

  const handleRetakePhoto = async () => {
    history.goBack();
    trackSelectPreapprovalKTPUploadCameraPreviewRetake();
  };

  return (
    <StyledPage>
      <StyledWrapper>
        <StyledHeader>
          <StyledBack />
          <StyledTitle>{t("imagePreviewPage.title")}</StyledTitle>
        </StyledHeader>
        <StyledSubtitle>{t("imagePreviewPage.subTitle")}</StyledSubtitle>

        <StyledImage src={image} alt="KTP image" />
      </StyledWrapper>
      <Footer>
        <StyledButton
          width="100%"
          buttonType={ButtonType.primary1}
          onClick={handleUsePhoto}
        >
          {t("imagePreviewPage.use")}
        </StyledButton>
        <Button
          width="100%"
          buttonType={ButtonType.secondary1}
          onClick={handleRetakePhoto}
        >
          {t("imagePreviewPage.retake")}
        </Button>
      </Footer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  width: 100%;
  min-height: ${screenHeight}px;
  background: ${colors.pageBg};
  padding: 18px 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: ${maxPageWidth};
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  position: relative;
`;

const StyledBack = styled(ArrowBack)`
  position: absolute;
  left: 0;
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
`;

const StyledSubtitle = styled(TextSmallRegular)`
  color: ${colors.body};
  text-align: center;
  display: block;
  margin-bottom: 32px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: ${getFrameSize(DocumentType.KTP, FrameType.Preview).height}px;
  border-radius: 10px;
  object-fit: contain;
`;

const StyledButton = styled(Button)`
  margin-bottom: 16px;
`;
