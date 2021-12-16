import React from "react";
import styled from "styled-components";
import { useModal } from "Modal/Modal";
import { maxPageWidth } from "styles/GlobalStyle";
import { colors } from "styles/colors";
import { Close } from "components/icon/Close/Close";
import { WhatsappLogo } from "components/icon/ShareWhatsappLogo/ShareWhatsappLogo";
import { FacebookLogo } from "components/icon/ShareFacebookLogo/ShareFacebookLogo";
import { TwitterLogo } from "components/icon/ShareTwitterLogo/ShareTwitterLogo";
import { EmailLogo } from "components/icon/ShareEmailLogo/ShareEmailLogo";
import { useTranslation } from "react-i18next";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { useDialogModal } from "components/DialogModal/DialogModal";
import { maxPageWidthNumber, screenWidth } from "styles/GlobalStyle";
import { Contact } from "components/icon/Contact/Contact";
import { ZIndex } from "styles/zIndex";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";

interface ShareButton {
  icon: JSX.Element;
  name: string;
  url: string;
}

export const ShareFloatingComponent = () => {
  const { ShareModal, showModal } = useShareModal();
  const { DialogModal } = useDialogModal();
  const { t } = useTranslation();

  return (
    <StyledShareContainer onClick={showModal}>
      <Contact />
      <ShareModal />
      <DialogModal
        title={t("homePageSearch.advisor.thanksTitle")}
        desc={t("homePageSearch.advisor.thanksDesc")}
        confirmButtonText={t("homePageSearch.advisor.alertButton")}
      />
    </StyledShareContainer>
  );
};

export const useShareModal = () => {
  const { showModal, hideModal, RenderModal } = useModal();

  const ShareModal = () => {
    const { t } = useTranslation();

    const onClickCancel = (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      hideModal();
    };

    const urlOrigin = window.location.href;

    const shareModals: ShareButton[] = [
      {
        icon: <WhatsappLogo />,
        name: "Whatsapp",
        url: `https://wa.me/?text=${urlOrigin}`,
      },
      {
        icon: <FacebookLogo />,
        name: "Facebook",
        url: `https://www.facebook.com/sharer/sharer.php?u=${urlOrigin}`,
      },
      {
        icon: <TwitterLogo />,
        name: "Twitter",
        url: `https://twitter.com/intent/tweet?url=${urlOrigin}&text=Found Car form Seva 2.0`,
      },
      {
        icon: <EmailLogo />,
        name: "Email",
        url: `mailto:user@example.com?subject=Found car from seva!&body=${urlOrigin}`,
      },
    ];

    return (
      <>
        <RenderModal blur={"22.8438px"}>
          <StyledWrapper>
            <StyledContent>
              <StyledCloseIcon onClick={onClickCancel}>
                <Close color={colors.primary1} />
              </StyledCloseIcon>
              <StyledTitle>{t("shareModal.title")}</StyledTitle>
              <StyledShareButtonList>
                {shareModals.map(({ icon, name, url }, index) => (
                  <StyledShareButton
                    key={index}
                    onClick={() => window.open(url)}
                  >
                    <StyledIcon>{icon}</StyledIcon>
                    <StyledText>{name}</StyledText>
                  </StyledShareButton>
                ))}
              </StyledShareButtonList>
              <StyledUrlField>
                <StyledUrlText>{urlOrigin}</StyledUrlText>
                <StyledCopyUrl
                  onClick={() => navigator.clipboard.writeText(urlOrigin)}
                >
                  Copy
                </StyledCopyUrl>
              </StyledUrlField>
            </StyledContent>
          </StyledWrapper>
        </RenderModal>
      </>
    );
  };
  return { ShareModal, hideModal, showModal };
};

const rightPadding = Math.max((screenWidth - maxPageWidthNumber) / 2, 0) + 16;
const StyledShareContainer = styled.div`
  position: fixed;
  right: ${rightPadding}px;
  bottom: 16px;
  z-index: ${ZIndex.Modal};
`;

const StyledWrapper = styled.div`
  width: ${maxPageWidth};
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 0 16px;
`;

const StyledContent = styled.div`
  border-radius: 16px;
  text-align: center;
  flex: 1;
  padding: 20px 24px 19px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: ${colors.white};
`;
const StyledCloseIcon = styled.div`
  display: flex;
  align-self: flex-end;
`;
const StyledShareButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 3px;
`;

const StyledShareButtonList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.title};
  margin-top: 12px;
`;

const StyledIcon = styled.div`
  width: 64px;
  height: 50px;
  margin: 10px auto;
`;

const StyledText = styled(LinkLabelLegalSemiBold)`
  color: ${colors.title};
`;

const StyledUrlField = styled.div`
  width: 100%;
  background: #ffffff;
  border: 1.5px solid #e4e9f1;
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
`;

const StyledUrlText = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.75px;
  text-overflow: ellipsis;
`;

const StyledCopyUrl = styled.div`
  text-decoration: none;
  cursor: pointer;
  color: ${colors.primary1};
`;
