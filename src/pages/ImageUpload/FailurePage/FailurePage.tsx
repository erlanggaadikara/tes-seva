import { colors } from "styles/colors";
import React from "react";
import styled from "styled-components";
import { maxPageWidth } from "styles/GlobalStyle";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { UploadFail } from "components/icon/UploadFail/UploadFail";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { TextMediumRegular } from "components/typography/TextMediumRegular";
import { ImageUpload } from "component/ImageUpload/ImageUpload";
import { Button, ButtonType } from "components/Button/Button";
import { preApprovalVerifyKTPUrl } from "routes/routes";
import { ArrowBack } from "components/ArrowBack/ArrowBack";
import { LocationStateKey, UploadChannel } from "models/models";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import {
  trackViewPreapprovalKTPUploadFailure,
  trackSelectPreapprovalKTPUploadFailureClose,
} from "helpers/amplitude/preApprovalEventTracking";

export default function FailurePage() {
  useAmplitudePageView(trackViewPreapprovalKTPUploadFailure);

  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation<
    | {
        [LocationStateKey.Channel]: UploadChannel;
      }
    | undefined
  >();

  const handleClose = () => {
    history.push(preApprovalVerifyKTPUrl);
    trackSelectPreapprovalKTPUploadFailureClose();
  };

  return (
    <StyledPage>
      <StyledHeader>
        <StyledBack />
        <StyledCloseButton buttonType={ButtonType.subtle} onClick={handleClose}>
          {t("imageQualityCheckPage.fail.close")}
        </StyledCloseButton>
      </StyledHeader>

      <StyledImage width="71%" height="auto" />

      <StyledMessage>{t("imageQualityCheckPage.fail.message")}</StyledMessage>
      <StyledInstruction>
        {t("imageQualityCheckPage.fail.instruction")}
      </StyledInstruction>

      <ImageUpload
        isFromUploadFailurePage={true}
        uploadChannel={location.state?.channel}
      />
    </StyledPage>
  );
}

const StyledPage = styled.div`
  width: 100%;
  background: ${colors.inputBg};
  padding: 18px 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${maxPageWidth};
  height: 100vh;
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const StyledBack = styled(ArrowBack)`
  position: absolute;
  left: 0;
`;

const StyledCloseButton = styled(Button)`
  margin: 0;
`;

const StyledImage = styled(UploadFail)`
  margin: 8px 0 32px;
`;

const StyledMessage = styled(H2MediumBold)`
  color: ${colors.title};
  text-align: center;
`;

const StyledInstruction = styled(TextMediumRegular)`
  color: ${colors.body};
  text-align: center;
  display: block;
  margin-top: 16px;
`;
