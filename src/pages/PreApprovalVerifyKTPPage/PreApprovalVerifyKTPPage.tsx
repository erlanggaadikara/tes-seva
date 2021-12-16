import React, { ReactElement } from "react";
import { PreApprovalVerifyKTPIcon } from "./images/PreApprovalVerifyKTPIcon";
import styled from "styled-components";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { ImageUpload } from "component/ImageUpload/ImageUpload";
import { useTranslation } from "react-i18next";
import { PreApprovalProgress } from "component/PreApprovalProgress/PreApprovalProgress";
import { PreApprovalProgressType } from "models/models";
import { colors } from "styles/colors";
import { screenHeight } from "styles/GlobalStyle";
import { useAmplitudePageView } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { trackViewPreapprovalKTPUpload } from "helpers/amplitude/preApprovalEventTracking";
import { LogoAstra } from "components/icon/LogoAstra/LogoAstra";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";

export default function PreApprovalVerifyKTPPage(): ReactElement {
  useAmplitudePageView(trackViewPreapprovalKTPUpload);

  const { t } = useTranslation();
  return (
    <StyledWrapper>
      <StyledHeader>
        <PreApprovalProgress progressType={PreApprovalProgressType.Files} />
      </StyledHeader>
      <StyledContent>
        <StyledSupportByText>{t(`verifyKTP.supportBy`)}</StyledSupportByText>
        <LogoAstra />
        <PreApprovalVerifyKTPIcon width={"50%"} />
        <StyledTitle> {t("verifyKTP.title")}</StyledTitle>
        <StyledSubtitle>{t("verifyKTP.subtitle")}</StyledSubtitle>
      </StyledContent>
      <ImageUpload />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  min-height: ${screenHeight}px;
  background: ${colors.offWhite};
  position: relative;
  flex-direction: column;
  display: flex;
`;
const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 24px;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  margin-top: 6px;
  color: ${colors.title};
`;

const StyledSubtitle = styled(TextSmallRegular)`
  color: ${colors.body};
  margin-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
`;

const StyledHeader = styled.div`
  width: 100%;
`;

const StyledSupportByText = styled(LinkLabelLegalSemiBold)`
  display: block;
`;
