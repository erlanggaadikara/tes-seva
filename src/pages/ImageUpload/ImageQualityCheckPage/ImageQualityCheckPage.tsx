import { colors } from "styles/colors";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { maxPageWidth } from "styles/GlobalStyle";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footer } from "components/Footer/Footer";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { buildFileUploadData, uploadImageFile } from "services/upload";
import { ProgressBar } from "components/ProgressBar/ProgressBar";
import {
  DocumentFileNameKey,
  DocumentType,
  FrameType,
  getFrameSize,
} from "utils/imageUtils";
import {
  ocrFailureUrl,
  ocrSuccessUrl,
  preApprovalVerifyKTPUrl,
} from "routes/routes";
import { LocationStateKey, UploadChannel } from "models/models";
import { ScanEffect } from "components/icon/ScanEffect/ScanEffect";
import { handleProgressUpdate } from "component/loading/loadingUtils";

export default function ImageQualityCheckPage() {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation<
    | {
        [LocationStateKey.File]: File;
        [LocationStateKey.Channel]: UploadChannel;
      }
    | undefined
  >();
  const file = location.state?.file;
  const image = file ? URL.createObjectURL(file) : "";

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!file) {
      history.replace(preApprovalVerifyKTPUrl);
      return;
    }

    uploadImageFile({
      data: buildFileUploadData(
        file,
        DocumentFileNameKey.Self,
        DocumentType.KTP
      ),
      onUploadProgress: handleProgressUpdate(setProgress),
    })
      .then(() => {
        history.replace(ocrSuccessUrl);
      })
      .catch(() => {
        history.replace({
          pathname: ocrFailureUrl,
          state: {
            [LocationStateKey.Channel]: location.state?.channel,
          },
        });
      });
  }, []);

  const {
    width: imageFrameWidth,
    height: imageFrameHeight,
    horizontalMargin,
  } = getFrameSize(DocumentType.KTP, FrameType.Preview);

  return (
    <StyledPage>
      <StyledHeader>
        <StyledTitle>{t("imageQualityCheckPage.title")}</StyledTitle>
      </StyledHeader>

      <Mask margin={horizontalMargin}>
        <StyledImage
          src={image}
          alt="KTP image"
          frameHeight={imageFrameHeight}
        />
        <StyledScanEffect
          width={imageFrameWidth}
          $frameHeight={imageFrameHeight}
        />
      </Mask>

      <Footer>
        <ProgressBarWrapper>
          <ProgressBar percentage={progress} />
        </ProgressBarWrapper>
        <StyledMessage>{t("imageQualityCheckPage.message")}</StyledMessage>
      </Footer>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  width: 100%;
  background: ${colors.pageBg};
  padding: 18px 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: ${maxPageWidth};
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 0 16px;
  justify-content: center;
  margin-bottom: 8px;
  position: relative;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
  padding: 0 16px;
`;

const Mask = styled.div<{ margin: number }>`
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  margin: 80px ${({ margin }) => margin}px 0;
`;

const StyledImage = styled.img<{ frameHeight: number }>`
  width: 100%;
  height: ${({ frameHeight }) => frameHeight}px;
`;

const scanningAnimation = (frameHeight: number) => keyframes`
 0% { top: 0; }
 100% { top: ${frameHeight}px; }
`;

const StyledScanEffect = styled(ScanEffect)<{ $frameHeight: number }>`
  position: absolute;
  left: 0;
  right: 0;
  animation-name: ${({ $frameHeight }) => scanningAnimation($frameHeight)};
  animation-duration: 3s;
  animation-iteration-count: infinite;
`;

const ProgressBarWrapper = styled.div`
  width: 50%;
  max-width: calc(${maxPageWidth} / 2);
  margin: 36px auto 0;
`;

const StyledMessage = styled(TextSmallRegular)`
  color: ${colors.body};
  text-align: center;
  display: block;
  margin-bottom: 32px;
`;
