import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { MaxWidthStyle } from "styles/MaxWidthStyle";
import HeaderVariant from "pages/HomePageSeva/Header/Header";
import { useTranslation } from "react-i18next";
import { TextLegalRegular } from "components/typography/TextLegalRegular";
import { H3MediumMedium } from "components/typography/H3MediumMedium";
import { Button, ButtonType } from "components/Button/Button";
import background from "./images/FreeInstallment.png";
import { Pdf } from "components/icon/Pdf/Pdf";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
export default function OverviewSectionSeva() {
  const { t } = useTranslation();

  // const mobileViewCustomizeLoan = () => {
  // }

  return (
    <>
      <MaxWidthStyle />
      <HeaderVariant />
      <ContentWrapper>
        <Header>
          <StyledTitleSection>
            {t("overviewCarVariant.title")}
          </StyledTitleSection>
        </Header>
        <LoanCustomiseWrapper>
          <StyledEditSection>
            <StyledTextDescription>
              {t("carDetailsPageSeva.overviewSection.description")}
            </StyledTextDescription>
            <ButtonWrapper>
              <Button width={"45%"}>
                {t("overviewCarVariant.calculateCredit")}
              </Button>
              <Button width={"45%"} buttonType={ButtonType.secondary3}>
                {t("overviewCarVariant.onlineCredit")}
              </Button>
            </ButtonWrapper>
            <Wrapper>
              <Pdf />
              <StyledText>{t("brochure")}</StyledText>
            </Wrapper>
          </StyledEditSection>
          <BannerWrapper>
            <ButtonWrapperInstallment>
              <Button width={"100%"} buttonType={ButtonType.red}>
                {t("banner.button")}
              </Button>
            </ButtonWrapperInstallment>
          </BannerWrapper>
          {/* <LoanCalculatorSection /> */}
        </LoanCustomiseWrapper>
        {/* {mobileViewCustomizeLoan} */}
      </ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  padding: 20px 50px 20px;

  @media (max-width: 700px) {
    padding: 20px 10px 20px;
  }
`;

const Header = styled.div`
  margin-top: 30px;
  font-size: 28px;
  @media (max-width: 700px) {
    font-size: 32px;
  }
`;
const StyledTitleSection = styled(H3MediumMedium)`
  line-height: 36px;
  color: ${colors.title};
`;
const StyledTextDescription = styled(TextLegalRegular)`
  color: ${colors.label};
`;
const LoanCustomiseWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const BannerWrapper = styled.div`
  border-radius: 16px;
  text-align: center;
  padding: 20px 24px 10px;
  margin: 0 auto;
  background: url(${background}) no-repeat center;
  background-size: contain;
  width: 343px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-height: 464px;
`;
const StyledEditSection = styled.div`
  margin-top: 2vh;
  max-width: 50%;
  @media (max-width: 700px) {
    max-width: 100%;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 3vh;
  flex-direction: row;
  flex-wrap: wrap;
`;
const ButtonWrapperInstallment = styled.div`
  margin-top: 8vh;
  width: -webkit-fill-available;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3vh;
`;

const StyledText = styled(LinkLabelSmallSemiBold)`
  color: ${colors.primary3};
  margin-left: 10px;
`;
