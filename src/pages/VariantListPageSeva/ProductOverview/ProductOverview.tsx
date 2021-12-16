import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";
import { LanguageCode } from "models/models";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { Button, ButtonType } from "components/Button/Button";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { DownloadBrochure } from "components/DownloadBrochure/DownloadBrochure";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";

type DescriptionType = {
  en: string;
  id: string;
};

interface ProductOverviewProps {
  description: DescriptionType;
  brochure?: string;
}

export const ProductOverview = (props: ProductOverviewProps) => {
  const { t } = useTranslation();
  const { currentLanguage } = useCurrentLanguageFromContext();
  const { id, en } = props.description;

  const descriptionLanguage = (): string => {
    return currentLanguage === LanguageCode.id ? id ?? "" : en ?? "";
  };

  useEffect(() => {
    descriptionLanguage();
  }, [currentLanguage]);

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTitle>{t("overviewCarVariant.title")}</StyledTitle>
        <StyledInformation>
          <StyledDescription>{descriptionLanguage()}</StyledDescription>
        </StyledInformation>
        <StyledButtonContainer>
          <StyledButtonCalculatorCredit
            width={"48%"}
            height={"50px"}
            buttonType={ButtonType.primary1}
            onClick={() => null}
          >
            <LinkLabelSmallSemiBold>
              {t("overviewCarVariant.calculateCredit")}
            </LinkLabelSmallSemiBold>
          </StyledButtonCalculatorCredit>
          <StyledButtonOnlineCredit
            width={"48%"}
            height={"50px"}
            buttonType={ButtonType.secondary1}
            onClick={() => null}
          >
            <LinkLabelSmallSemiBold>
              {t("overviewCarVariant.onlineCredit")}
            </LinkLabelSmallSemiBold>
          </StyledButtonOnlineCredit>
        </StyledButtonContainer>
        <BrochureWrapper>
          <DownloadBrochure pdfLink={props.brochure} />
        </BrochureWrapper>
      </StyledWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 70%;
  @media (max-width: 769px) {
    width: 100%;
    justify-content: center;
    padding: 0;
  }
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
`;

const StyledWrapper = styled.div`
  display: "flex";
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 0 20px;
  @media (max-width: 769px) {
    width: 90%;
    padding: 0;
  }
`;
const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.primary1};
  margin: 10px 0;
`;
const StyledDescription = styled(TextSmallRegular)`
  color: #52627a;
  line-height: 28px;
  text-align: left;
`;

const StyledInformation = styled.div`
  margin: 10px 0;
`;
const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 769px) {
    flex-direction: column;
  }
  margin: 10px 0;
`;

const StyledButtonCalculatorCredit = styled(Button)`
  background: ${colors.primary1};
  margin: 5px 0;
  width: 48%;
  @media (max-width: 769px) {
    width: 100%;
  }
`;

const StyledButtonOnlineCredit = styled(Button)`
  margin: 5px 0;
  width: 48%;
  @media (max-width: 769px) {
    width: 100%;
  }
`;

const BrochureWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 769px) {
    justify-content: center;
  }
`;
