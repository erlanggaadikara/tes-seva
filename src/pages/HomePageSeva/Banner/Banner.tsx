import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import { colors } from "styles/colors";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import image from "./images/banner-image.png";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { useTranslation } from "react-i18next";
import { Button, ButtonType } from "components/Button/Button";
import { getNewFunnelRecommendations } from "services/newFunnel";
import { CarRecommendationResponse } from "types/types";
import { AxiosResponse } from "axios";
import { useContextRecommendations } from "context/recommendationsContext/recommendationsContext";
import { ToastType, useToast } from "components/Toast/Toast";
import { useFunnelQueryData } from "context/funnelQueryContext/funnelQueryContext";

interface InstalmentFreeBannerProps {
  className?: string;
}

export const Banner = ({ className }: InstalmentFreeBannerProps) => {
  const { t } = useTranslation();
  const { funnelQuery, clearFunnelQuery } = useFunnelQueryData();
  const { showToast, RenderToast } = useToast();
  const { setRecommendations } = useContextRecommendations();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    clearFunnelQuery();
  }, []);

  const requestCarRequest = () => {
    setLoading(true);
    getNewFunnelRecommendations(funnelQuery)
      .then((response: AxiosResponse<CarRecommendationResponse>) => {
        setRecommendations(response.data.carRecommendations || []);
        const isRecommendationsEmpty =
          response.data.carRecommendations.length === 0;
        setLoading(false);
      })
      .catch(() => {
        showToast();
      });
  };

  return (
    <StyledWrapper className={className}>
      <StyledImg src={image} />
      <StyledContentWrapper>
        <StyledTitle>{t("banner.title")}</StyledTitle>
        <StyledSubtitle1>{t("banner.subtitle1")}</StyledSubtitle1>
        <StyledButton
          height={"40px"}
          buttonType={ButtonType.primary1}
          loading={loading}
          onClick={requestCarRequest}
        >
          <StyledButtonText>{t(`banner.button`)}</StyledButtonText>
        </StyledButton>
        <StyledSubtitle2>{t("banner.subtitle2")}</StyledSubtitle2>
      </StyledContentWrapper>
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  border-radius: 8px;
  filter: drop-shadow(0px 32px 64px rgba(17, 17, 17, 0.08));
  margin-bottom: 16px;
  background: url("./images/bannerBg.png") no-repeat center;
  background-size: cover;
  width: 1000px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    max-height: auto;
    background: url("./images/bannerBg2.png") no-repeat bottom;
    background-size: cover;
  }
`;

const StyledImg = styled(Image)`
  border-radius: 8px;
  max-width: 450px;
  height: auto;
  background: transparent;

  @media (max-width: 700px) {
    max-width: 700px;
    height: auto;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  margin-left: 20px;

  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0;
    padding: 10px 10px;
  }
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  font-size: 40px;
  color: ${colors.white};
  text-align: center;

  @media (max-width: 700px) {
    font-size: 6vw;
  }
`;

const StyledSubtitle1 = styled(TextSmallRegular)`
  color: ${colors.white};
  font-size: 20px;
  text-align: center;

  @media (max-width: 700px) {
    font-size: 4vw;
  }
`;

const StyledButton = styled(Button)`
  margin-left: 0;
  width: 150px;
  background: ${colors.error};

  @media (max-width: 700px) {
    margin-left: auto;
    width: 100%;
  }
`;

const StyledButtonText = styled(TextSmallRegular)`
  color: ${colors.white};
  font-size: 15px;
`;

const StyledSubtitle2 = styled(TextSmallRegular)`
  color: ${colors.white};
  font-size: 10px;
  text-align: left;
  width: 90%;

  @media (max-width: 700px) {
    text-align: center;
    font-size: 2.5vw;
  }
`;
