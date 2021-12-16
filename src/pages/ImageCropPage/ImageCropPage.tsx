import React, { ReactElement, useCallback, useState } from "react";
import { LocationStateKey, UploadChannel } from "models/models";
import { useHistory, useLocation } from "react-router-dom";
import {
  DocumentType,
  FrameType,
  getCroppedImg,
  getFrameSize,
} from "utils/imageUtils";
import styled from "styled-components";
import { Footer } from "components/Footer/Footer";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { ArrowBack } from "components/ArrowBack/ArrowBack";
import { imageQualityCheckUrl } from "routes/routes";
import { ImageRotate } from "./images/ImageRotate";
import { maxPageWidth } from "styles/GlobalStyle";
import Cropper from "react-easy-crop";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { ToastType, useToast } from "components/Toast/Toast";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { trackViewPreapprovalKTPUploadGalleryCropping } from "helpers/amplitude/preApprovalEventTracking";
import { useContextForGallery } from "context/galleryContext/galleryContext";

export default function ImageCropPage(): ReactElement {
  useAmplitudePageView(trackViewPreapprovalKTPUploadGalleryCropping);
  const { t } = useTranslation();
  const location = useLocation<
    | {
        [LocationStateKey.Base64]: string;
        [LocationStateKey.Channel]: UploadChannel;
      }
    | undefined
  >();
  const history = useHistory();
  const { galleryFile } = useContextForGallery();
  const channel = location.state?.channel;
  const { showToast, RenderToast } = useToast();
  const { width: frameWidth, height: frameHeight } = getFrameSize(
    DocumentType.KTP,
    FrameType.Crop
  );
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: frameWidth,
    height: frameHeight,
    x: 0,
    y: 0,
  });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onChooseClick = useCallback(async () => {
    if (!galleryFile) {
      showToast();
      return;
    }
    try {
      const file = await getCroppedImg(
        galleryFile,
        croppedAreaPixels,
        rotation,
        crop
      );
      history.push({
        pathname: imageQualityCheckUrl,
        state: {
          [LocationStateKey.File]: file,
          [LocationStateKey.Channel]: channel,
        },
      });
    } catch (e) {
      console.error(e);
      showToast();
    }
  }, [croppedAreaPixels, rotation]);

  const onCancelClick = () => {
    history.goBack();
  };
  const onRotationClick = () => {
    setRotation((preSate) => (preSate + 90) % 360);
  };

  return (
    <StyledWrapper>
      <Cropper
        restrictPosition={false}
        objectFit={"horizontal-cover"}
        image={galleryFile}
        crop={crop}
        minZoom={0.1}
        rotation={rotation}
        aspect={frameWidth / frameHeight}
        zoom={zoom}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <Footer background={"transparent"}>
        <StyledBottom>
          <StyleCancel onClick={onCancelClick}>
            {t("gallery.cancel")}
          </StyleCancel>
          <StyleChoose onClick={onChooseClick}>
            {t("gallery.choose")}
          </StyleChoose>
        </StyledBottom>
      </Footer>
      <ArrowBack fill={colors.white} />
      <StyledImageRotate onClick={onRotationClick}>
        <ImageRotate width={24} height={24} />
      </StyledImageRotate>
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  max-width: ${maxPageWidth};
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
`;
const StyleCancel = styled(LinkLabelSmallSemiBold)`
  color: ${colors.white};
`;
const StyleChoose = styled(LinkLabelSmallSemiBold)`
  color: ${colors.secondary};
`;
const StyledImageRotate = styled.div`
  position: absolute;
  top: 12px;
  right: 16px;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
