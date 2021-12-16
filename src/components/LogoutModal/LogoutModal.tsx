import React from "react";
import styled from "styled-components";
import { colors, transparent } from "styles/colors";
import { maxPageWidth } from "styles/GlobalStyle";
import { LogoutImg } from "./images/LogoutImg";
import { useTranslation } from "react-i18next";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { TextSmallRegularStyle } from "components/typography/TextSmallRegular";
import { Button, ButtonType } from "Button/Button";
import { loginUrl } from "routes/routes";
import { useHistory } from "react-router-dom";
import { hideLogout } from "utils/logoutUtils";
import { logoutModalId } from "const/const";
import { ZIndex } from "styles/zIndex";

export const LogoutModal = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const onSubmit = () => {
    hideLogout();
    history.push(loginUrl);
  };

  return (
    <StyledModal id={logoutModalId}>
      <StyledBody>
        <StyledImgContainer>
          <LogoutImg width={"73.6%"} height={"100%"} />
        </StyledImgContainer>
        <StyledTitle>{t("logoutModal.title")}</StyledTitle>
        <StyledSubtitle>{t("logoutModal.subtitle")}</StyledSubtitle>
        <Button
          width="100%"
          height={"50px"}
          buttonType={ButtonType.primary1}
          onClick={onSubmit}
        >
          {t("logoutModal.submit")}
        </Button>
      </StyledBody>
    </StyledModal>
  );
};

const defaultWidth = 0.88;

const StyledModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${ZIndex.Modal};
  display: none;
  justify-content: center;
  background: ${transparent("placeholder", 0.3)};
  backdrop-filter: blur(20px);
`;

const StyledBody = styled.div`
  width: ${defaultWidth * 100}%;
  max-width: calc(${maxPageWidth} * ${defaultWidth});
  padding: 24px 16px;
  background: ${colors.white};
  box-shadow: 0 32px 64px ${transparent("modalShadow", 0.08)};
  border-radius: 15px;
  align-self: center;
`;

const StyledImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 36px auto 32px;
  width: 100%;
`;

const StyledTitle = styled(H2MediumBold)`
  color: ${colors.title};
  text-align: center;
  margin-bottom: 16px;
`;

const StyledSubtitle = styled.div`
  ${TextSmallRegularStyle};
  color: ${colors.body};
  text-align: center;
  margin-bottom: 30px;
`;
