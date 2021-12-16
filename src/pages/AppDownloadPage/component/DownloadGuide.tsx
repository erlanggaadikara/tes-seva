import { Timer } from "./Timer";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import React from "react";
import { Time } from "types/types";
import styled from "styled-components";
import { colors } from "styles/colors";
import background from "images/DownloadGuideBg.png";
import { useTranslation } from "react-i18next";
import { GooglePlayElement } from "./GooglePlayElement";
import { LinkLabelMediumSemiBold } from "components/typography/LinkLabelMediumSemiBold";

interface DownloadGuideProps {
  countDownTime?: Time;
  className?: string;
  onGooglePlayClick?: () => void;
}

const documentsRestrictions = [
  "appDownloadPage.documentsDesc.itemOne",
  "appDownloadPage.documentsDesc.itemTwo",
  "appDownloadPage.documentsDesc.itemThree",
];

export const DownloadCountdown = ({
  countDownTime,
  onGooglePlayClick,
  className,
}: DownloadGuideProps) => {
  const { t } = useTranslation();
  return (
    <StyledDownload className={className}>
      {countDownTime && (
        <StyledOuterCircle>
          <Timer countDownTime={countDownTime} />
        </StyledOuterCircle>
      )}

      <StyledDownloadTitle countDownTime={countDownTime}>
        <H2MediumBold>{t("appDownloadPage.downloadTitle")}</H2MediumBold>
      </StyledDownloadTitle>
      <StyledDocumentsSection>
        {documentsRestrictions.map((item, index) => {
          return (
            <StyledDocumentItem key={index}>
              <StyledCircle>
                <LinkLabelMediumSemiBold>
                  {`${index + 1}.`}
                </LinkLabelMediumSemiBold>
              </StyledCircle>
              <StyledDocumentText>
                <TextSmallRegular>{t(item)}</TextSmallRegular>
              </StyledDocumentText>
            </StyledDocumentItem>
          );
        })}
      </StyledDocumentsSection>
      <GooglePlayElement onClick={onGooglePlayClick} />
      <StyledDownloadTip>{t("appDownloadPage.downloadTip")}</StyledDownloadTip>
      <StyledCashBackTip>
        <LinkLabelLegalSemiBold>
          {t("appDownloadPage.cashBackTip")}
        </LinkLabelLegalSemiBold>
      </StyledCashBackTip>
    </StyledDownload>
  );
};

const StyledDownload = styled.div`
  background: url(${background}) no-repeat center;
  background-size: cover;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
`;
const StyledDownloadTitle = styled.div<{ countDownTime: Time | undefined }>`
  margin: ${({ countDownTime }) =>
    countDownTime ? "13px 16px 24px" : "0 16px 28px"};
  color: ${colors.white};
`;

const StyledOuterCircle = styled.div`
  border: 2px solid ${colors.secondary};
  padding: 8px;
  border-radius: 12px;
`;
const StyledCircle = styled.div`
  width: 36px;
  height: 36px;
  border: 4px solid ${colors.secondary20};
  border-radius: 50%;
  background: ${colors.secondary};
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledDocumentItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const StyledDocumentText = styled.div`
  width: 84%;
  text-align: left;
  color: ${colors.white};
  display: flex;
  align-items: center;
`;
const StyledDocumentsSection = styled.div`
  width: 90%;
  margin: 0 auto;
`;
const StyledDownloadTip = styled(LinkLabelLegalSemiBold)`
  color: ${colors.white};
`;
const StyledCashBackTip = styled.div`
  margin: 16px;
  color: ${colors.white};
`;
