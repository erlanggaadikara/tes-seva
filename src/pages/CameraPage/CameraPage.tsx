import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { ImageType, LocationStateKey, UploadChannel } from "models/models";
import { isMobileDevice, screenSize, isFirefox } from "utils/window";
import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import { DocumentType, FrameType, getFrameSize } from "utils/imageUtils";
import { maxPageWidth, screenHeight } from "styles/GlobalStyle";
import { TakePhotoIcon } from "./images/TakePhotoIcon";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { CameraFrame } from "./images/CameraFrame";
import { colors } from "styles/colors";
import { useHistory } from "react-router";
import { imageCropPageUrl } from "routes/routes";
import { ArrowBack } from "components/ArrowBack/ArrowBack";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { trackViewPreapprovalKTPUploadCamera } from "helpers/amplitude/preApprovalEventTracking";
import { CameraSelect } from "./component/CameraSelect";
import { Loading } from "PreApprovalConfirmationPage/components/Loading";
import { ZIndex } from "styles/zIndex";
import { useContextForGallery } from "context/galleryContext/galleryContext";

export default function CameraPage() {
  useAmplitudePageView(trackViewPreapprovalKTPUploadCamera);
  const ratio = 4;
  const {
    width: frameWidth,
    height: frameHeight,
    horizontalMargin,
  } = getFrameSize(DocumentType.KTP, FrameType.Capture);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const [imageData, setImageData] = useState<string>();
  const [deviceId, setDeviceId] = useState<string>("");
  const [isUserMediaReady, setUserMediaReady] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const { showToast, RenderToast } = useToast();
  const { setGalleryFile } = useContextForGallery();
  const CameraConstraints = {
    aspectRatio: isMobileDevice
      ? frameHeight / frameWidth
      : frameWidth / frameHeight,
  };

  const capture = useCallback(() => {
    const ref = webcamRef.current;
    if (ref != null) {
      let resolution = {
        width: frameWidth * ratio,
        height: frameHeight * ratio,
      };
      if (isFirefox) {
        if (isMobileDevice) {
          // height * 2 so that the image will be more square
          // because firefox doesnt automatically crop captured image
          resolution = {
            width: frameWidth * ratio,
            height: frameHeight * ratio * 2,
          };
        } else {
          // for firefox web desktop
          // height * 1.2
          resolution = {
            width: frameWidth * ratio,
            height: frameHeight * ratio * 1.2,
          };
        }
      }
      const imageSrc = ref.getScreenshot(resolution);
      !!imageSrc && setImageData(imageSrc);
    }
  }, [webcamRef]);

  useEffect(() => {
    if (imageData) {
      setGalleryFile(imageData as string);
      const nextLocation = {
        pathname: imageCropPageUrl,
        state: {
          [LocationStateKey.Channel]: UploadChannel.Camera,
        },
      };
      history.push(nextLocation);
    }
  }, [imageData]);

  const onError = () => {
    setUserMediaReady(false);
    setLoading(false);
    showToast();
  };
  const onSelected = (deviceId: string | null) => {
    if (deviceId === null) {
      onError();
    } else {
      setLoading(false);
      setDeviceId(deviceId);
    }
  };

  const onUserMedia = () => {
    setUserMediaReady(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <StyledWrapper padding={horizontalMargin}>
        <ArrowBack />
        <StyledWebcamWrapper>
          <Webcam
            style={{
              borderRadius: "12px",
              objectFit: "cover",
              padding: "2px",
            }}
            width={frameWidth}
            height={frameHeight}
            onLoad={() => setLoading(true)}
            audio={false}
            ref={webcamRef}
            screenshotFormat={ImageType.JPEG}
            videoConstraints={{
              aspectRatio: CameraConstraints.aspectRatio,
              deviceId: deviceId || undefined,
            }}
            screenshotQuality={1}
            mirrored={false}
            imageSmoothing={true}
            onUserMedia={onUserMedia}
            onUserMediaError={onError}
          />
          <StyledFrameWrapper>
            <CameraFrame color={colors.inputBg} height={frameHeight + 4} />
          </StyledFrameWrapper>
        </StyledWebcamWrapper>

        {isUserMediaReady && (
          <StyledFooterWrapper>
            <StyledTitle margin={horizontalMargin}>
              {t("camera.tip")}
            </StyledTitle>
            <StyledCameraSelect>
              <CameraSelect onSelected={onSelected} />
            </StyledCameraSelect>
            <StyledButton>
              <TakePhotoIcon width={"100%"} onClick={capture} />
            </StyledButton>
          </StyledFooterWrapper>
        )}
      </StyledWrapper>
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </>
  );
}
const space = 15;
const StyledWrapper = styled.div<{ padding: number }>`
  max-width: ${maxPageWidth};
  min-height: ${screenHeight}px;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  color: ${colors.body};
  background: ${colors.inputBg};
  text-align: center;
`;
const StyledTitle = styled(LinkLabelSmallSemiBold)<{ margin: number }>`
  width: 100%;
  padding: 34px 0 24px 0;
  color: ${colors.black};
  @media (max-width: ${screenSize.mobileS}) {
    padding: 8px 0;
  }
`;
const StyledWebcamWrapper = styled.div`
  display: flex;
  position: relative;
  background: ${colors.inputBg};
  border-radius: 8px;
  margin-top: ${space + "%"};
`;
const StyledFrameWrapper = styled.div`
  width: 100%;
  position: absolute;
`;
const StyledFooterWrapper = styled.div`
  margin-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  flex: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: ${colors.white};
  z-index: ${ZIndex.Menubar};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
const StyledCameraSelect = styled.div`
  flex: 1;
  padding-bottom: 24px;
  @media (max-width: ${screenSize.mobileS}) {
    padding-bottom: 8px;
  }
`;
const StyledButton = styled.div`
  width: 20%;
  margin-bottom: 16px;
`;
