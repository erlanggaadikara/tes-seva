import React, { ChangeEvent, ReactElement, useRef, useState } from "react";
import { Footer } from "components/Footer/Footer";
import { Button, ButtonType } from "components/Button/Button";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { cameraUrl, imageCropPageUrl } from "routes/routes";
import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import { thePageBeforeLast } from "const/const";
import { ImageType, LocationStateKey, UploadChannel } from "models/models";
import { getImageBase64ByFile } from "utils/imageUtils";

import {
  trackSelectPreapprovalKTPUploadCamera,
  trackSelectPreapprovalKTPUploadGallery,
  trackSelectPreapprovalKTPUploadFailureGallery,
  trackSelectPreapprovalKTPUploadFailureCamera,
} from "helpers/amplitude/preApprovalEventTracking";
import { useContextForGallery } from "context/galleryContext/galleryContext";
interface ImageUploadProps {
  uploadChannel?: UploadChannel;
  isFromUploadFailurePage?: boolean;
}

export const ImageUpload = ({
  uploadChannel,
  isFromUploadFailurePage = false,
}: ImageUploadProps): ReactElement => {
  const { t } = useTranslation();
  const history = useHistory();
  const { showToast, RenderToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const commonErrorMessage = "common.errorMessage";
  const imageTypeErrorMessage = "gallery.imageTypeError";
  const [errorMessage, setErrorMessage] = useState<string>(commonErrorMessage);
  const { setGalleryFile } = useContextForGallery();

  const onCameraClick = () => {
    if (!isFromUploadFailurePage) {
      history.push(cameraUrl);
    } else {
      if (uploadChannel === UploadChannel.Camera) {
        history.go(thePageBeforeLast);
      } else {
        history.goBack();
        const timeout = setTimeout(() => {
          history.replace(cameraUrl);
          clearTimeout(timeout);
        }, 100);
      }
    }

    if (isFromUploadFailurePage) {
      trackSelectPreapprovalKTPUploadFailureCamera();
    } else {
      trackSelectPreapprovalKTPUploadCamera();
    }
  };

  const onGalleryInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length < 1) {
      setErrorMessage(commonErrorMessage);
      showToast();
      return;
    }
    if (Object.values(ImageType).includes(files[0].type as ImageType)) {
      handleImage(files[0]);
    } else {
      setErrorMessage(imageTypeErrorMessage);
      showToast();
    }
  };

  const handleImage = (file: File) => {
    getImageBase64ByFile(file, (value) => {
      if (!!value) {
        setGalleryFile(value as string);
        const nextLocation = {
          pathname: imageCropPageUrl,
          state: {
            [LocationStateKey.Base64]: value,
            [LocationStateKey.Channel]: UploadChannel.Gallery,
          },
        };
        if (!isFromUploadFailurePage) {
          history.push(nextLocation);
        } else {
          if (uploadChannel === UploadChannel.Camera) {
            history.go(thePageBeforeLast);
            const timeout = setTimeout(() => {
              history.replace(nextLocation);
              clearTimeout(timeout);
            }, 100);
          } else {
            history.goBack();
          }
        }
      } else {
        showToast();
      }
    });
  };

  const onGalleryInputButtonClick = () => {
    inputRef.current?.click();

    if (isFromUploadFailurePage) {
      trackSelectPreapprovalKTPUploadFailureGallery();
    } else {
      trackSelectPreapprovalKTPUploadGallery();
    }
  };

  return (
    <StyledWrapper>
      <Footer padding={"24px 16px 32px"} showShadow={true}>
        <StyledButton buttonType={ButtonType.primary1} onClick={onCameraClick}>
          {t("verifyKTP.useCamera")}
        </StyledButton>
        <StyledButton
          buttonType={ButtonType.secondary1}
          onClick={onGalleryInputButtonClick}
        >
          {t("verifyKTP.uploadFromGallery")}
        </StyledButton>
        <StyledInput
          ref={inputRef}
          type={"file"}
          accept={[ImageType.PNG, ImageType.JPEG, ImageType.JPG].join(",")}
          onChange={onGalleryInputChange}
        />
      </Footer>
      <RenderToast type={ToastType.Error} message={t(errorMessage)} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`;
const StyledInput = styled.input`
  position: absolute;
  display: none;
`;
