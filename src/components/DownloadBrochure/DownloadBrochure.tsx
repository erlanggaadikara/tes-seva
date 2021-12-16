import React from "react";
import styled from "styled-components";
import { ALink } from "components/ALink/ALink";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useTranslation } from "react-i18next";
import { Pdf } from "components/icon/Pdf/Pdf";

interface DownloadBrochureProps {
  pdfLink: string | undefined;
}

export const DownloadBrochure = ({ pdfLink }: DownloadBrochureProps) => {
  const { t } = useTranslation();

  // AMPLITUDE TRACKING
  // const onBrochureClick = () => {
  //   isNewFunnel &&
  //     trackVariantDetailsEvent({
  //       carVariantDetails,
  //       carResultParameter,
  //       trackFunction: trackSelectCarResultVariantDetailsViewBrochure,
  //     })
  // }

  return (
    <ALink href={pdfLink}>
      <Wrapper>
        <Pdf />
        <StyledText>{t("brochure")}</StyledText>
      </Wrapper>
    </ALink>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledText = styled(LinkLabelSmallSemiBold)`
  margin-left: 10px;
`;
