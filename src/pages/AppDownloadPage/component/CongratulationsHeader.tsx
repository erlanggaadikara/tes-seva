import { MasterImage } from "images/MasterImage/MasterImage";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { useContextContactFormData } from "context/contactFormContext/contactFormContext";

export const CongratulationsHeader = () => {
  const { name } = useContextContactFormData();
  const { t } = useTranslation();
  return (
    <section>
      <StyledMasterImage>
        <MasterImage />
      </StyledMasterImage>

      <H2MediumBold>
        {t("appDownloadPage.pageTitle", { userName: name })}
      </H2MediumBold>
      <StyledDescription>
        <TextSmallRegular>{t("appDownloadPage.description")}</TextSmallRegular>
      </StyledDescription>
    </section>
  );
};
const StyledMasterImage = styled.div`
  margin-top: 30px;
  margin-bottom: 28px;
`;
const StyledDescription = styled.div`
  margin: 11px 0 49px;
  color: ${colors.body};
`;
