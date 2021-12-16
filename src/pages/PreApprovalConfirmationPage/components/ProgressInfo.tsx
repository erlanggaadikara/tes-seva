import React from "react";
import styled from "styled-components";
import { Check } from "components/icon/Check/Check";
import { H2MediumBoldStyle } from "components/typography/H2MediumBold";
import { TafLogo } from "images/TafLogo/TafLogo";
import { ProgressConfig } from "./ProgressInfo.config";
import { LinkLabelMediumSemiBoldStyle } from "components/typography/LinkLabelMediumSemiBold";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { TextSmallRegularStyle } from "components/typography/TextSmallRegular";
import { AccLogo } from "pages/images/AccLogo/AccLogo";

interface Props {
  finco?: string;
}
export const ProgressInfo = ({ finco }: Props) => {
  const { t } = useTranslation();
  return (
    <StyledHeader>
      <StyledCheckImgContainer>
        <Check width={34} height={30} />
      </StyledCheckImgContainer>
      <StyledTitle>{t("preApprovalProgress.confirm.title")}</StyledTitle>
      <StyledLogoWrapper>
        {finco === "TAF" && <TafLogo width={134} height={76} />}
        {finco === "ACC" && <AccLogo width={76} height={95} />}
      </StyledLogoWrapper>
      <StyledProgressContainer>
        <StyledNextTitle>
          {t("preApprovalProgress.confirm.next.title")}
        </StyledNextTitle>
        {ProgressConfig.map((config, index) => {
          return (
            <div key={index}>
              <StyledProgressItem>
                <StyledProgressIcon>
                  {config.icon}
                  {config.withProgressLine && <StyledProgressIndicatorLine />}
                </StyledProgressIcon>
                <StyledProgressText>{t(config.text)}</StyledProgressText>
              </StyledProgressItem>
            </div>
          );
        })}
      </StyledProgressContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  padding: 30px 16px 18px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StyledCheckImgContainer = styled.div`
  padding: 25px;
  background-color: ${colors.primaryLight1};
  border-radius: 50%;
`;

const StyledTitle = styled.p`
  ${H2MediumBoldStyle};
  margin-top: 32px;
  color: ${colors.title};
`;

const StyledLogoWrapper = styled.div`
  margin-top: 18px;
`;

const StyledProgressContainer = styled.div`
  background: ${colors.inputBg};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  padding: 26px 16px 36px;
  width: 100%;
`;

const StyledProgressItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 28px;
`;

const StyledNextTitle = styled.p`
  ${LinkLabelMediumSemiBoldStyle};
  text-align: left;
  margin-bottom: 22px;
`;

const StyledProgressText = styled.span`
  margin-left: 16px;
  color: ${colors.title};
  text-align: left;
  ${TextSmallRegularStyle};
`;

const StyledProgressIcon = styled.div`
  margin-left: 4px;
  position: relative;
`;

const StyledProgressIndicatorLine = styled.div`
  position: absolute;
  top: calc(100% - 3px);
  left: calc(50% - 1px);
  border: 1px solid ${colors.primaryLight4};
  width: 2px;
  height: 50px;
`;
