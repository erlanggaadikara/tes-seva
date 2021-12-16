import React from "react";
import styled from "styled-components";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import image from "images/contactus-image.png";
import background from "images/contactus-background.png";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { Button, ButtonType } from "components/Button/Button";
import { useContactUsModal } from "components/ContactUsModal/ContactUsModal";
import { useDialogModal } from "components/DialogModal/DialogModal";

export const ContactUsTile = () => {
  const { t } = useTranslation();
  const { ContactUsModal, showModal } = useContactUsModal();
  const { DialogModal, showModal: showDialogModal } = useDialogModal();

  return (
    <StyledTileWrapper>
      <Tile>
        <ContentWrapper>
          <StyledImage src={image} />
          <StyledTitle
            dangerouslySetInnerHTML={{
              __html: t("carResultsPage.questionTitle"),
            }}
          />
          <StyledSubtitleText>
            {t(`carResultsPage.questionSubtitle`)}
          </StyledSubtitleText>
          <StyledButton
            height={"40px"}
            buttonType={ButtonType.subtle}
            loading={false}
            onClick={showModal}
          >
            <LinkLabelSmallSemiBold>
              {t(`carResultsPage.contactUs`)}
            </LinkLabelSmallSemiBold>
          </StyledButton>
          <ContactUsModal
            title="Have Some Questions?"
            onSubmitSuccess={showDialogModal}
          />
          <DialogModal
            title={t("homePageSearch.advisor.thanksTitle")}
            desc={t("homePageSearch.advisor.thanksDesc")}
            confirmButtonText={t("homePageSearch.advisor.alertButton")}
          />
        </ContentWrapper>
      </Tile>
    </StyledTileWrapper>
  );
};

const StyledTileWrapper = styled.div`
  border-radius: 8px;
  filter: drop-shadow(0px 32px 64px rgba(17, 17, 17, 0.08));
  margin-bottom: 16px;
`;

const Tile = styled.div`
  width: 100%;
  background: url(${background}) no-repeat center;
  background-size: cover;
  border-radius: 8px;
`;

const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
`;

const StyledImage = styled.img`
  max-width: 50%;
  height: auto;
`;

const StyledTitle = styled(LinkLabelLargeSemiBold)`
  color: ${colors.white};
  font-size: 30px;
  text-align: center;
`;

const StyledSubtitleText = styled(LinkLabelLegalSemiBold)`
  color: ${colors.white};
  font-size: 15px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background: ${colors.secondary};
`;
