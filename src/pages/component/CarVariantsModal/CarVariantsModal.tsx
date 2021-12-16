import React, { useEffect } from "react";
import { useModal } from "components/Modal/Modal";
import { colors, transparent } from "styles/colors";
import styled from "styled-components";
import { maxPageWidth } from "styles/GlobalStyle";
import { Close } from "components/icon/Close/Close";
import { LinkLabelLargeSemiBoldStyle } from "components/typography/LinkLabelLargeSemiBold";
import { TextMediumRegularStyle } from "components/typography/TextMediumRegular";
import { Button, ButtonType } from "components/Button/Button";
import { useTranslation } from "react-i18next";
import { LinkLabelLegalSemiBoldStyle } from "components/typography/LinkLabelLegalSemiBold";
import { startSurveyUrl, surveyFormUrl } from "routes/routes";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LocalStorageKey } from "models/models";

interface CarVariantsModalProps {
  isShowCarVariantsModal: boolean;
  hideCarVariantsModal: () => void;
  type: "calculate" | "customize";
  onConfirm?: () => void;
}

const defaultWidth = 0.88;

export const CarVariantsModal = ({
  isShowCarVariantsModal,
  hideCarVariantsModal,
  type,
  onConfirm,
}: CarVariantsModalProps) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [currentStep] = useLocalStorage<number>(
    LocalStorageKey.CurrentStep,
    -1
  );
  const { showModal, hideModal, RenderModal } = useModal();

  useEffect(
    () => (isShowCarVariantsModal ? showModal() : hideModal()),
    [isShowCarVariantsModal]
  );

  const close = () => {
    hideCarVariantsModal();
  };

  const onClickOk = () => {
    currentStep <= 0
      ? history.push(startSurveyUrl)
      : history.push(surveyFormUrl);
    onConfirm && onConfirm();
  };

  return (
    <RenderModal blur={"20px"}>
      <StyledBody>
        <StyledClose onClick={close}>
          <Close color={colors.label} />
        </StyledClose>
        <StyledTitle>
          {t(
            type === "calculate"
              ? "carVariantsModal.calculateTitle"
              : "carVariantsModal.customizeTitle"
          )}
        </StyledTitle>
        <StyledContent
          dangerouslySetInnerHTML={{ __html: t("carVariantsModal.content") }}
        />
        <StyledBottom>
          <Button
            width="42%"
            buttonType={ButtonType.secondary1}
            onClick={close}
          >
            {t("carVariantsModal.cancelButton")}
          </Button>
          <Button
            width="42%"
            buttonType={ButtonType.primary1}
            onClick={onClickOk}
          >
            {t("carVariantsModal.okButton")}
          </Button>
        </StyledBottom>
        <StyledDescription>
          {t("carVariantsModal.description")}
        </StyledDescription>
      </StyledBody>
    </RenderModal>
  );
};

const StyledBody = styled.div`
  width: ${defaultWidth * 100}%;
  max-width: calc(${maxPageWidth} * ${defaultWidth});
  padding: 16px 16px 8px;
  background: ${colors.white};
  box-shadow: 0 32px 64px ${transparent("modalShadow", 0.08)};

  border-radius: 15px;
  align-self: center;
`;

const StyledClose = styled.div`
  width: 24px;
  height: 24px;
  float: right;
`;

const StyledTitle = styled.div`
  text-align: center;
  ${LinkLabelLargeSemiBoldStyle};
  margin: 24px 20px 0;
  color: ${colors.title};
`;

const StyledContent = styled.div`
  ${TextMediumRegularStyle};
  color: ${colors.label};
  margin: 36px 8px 84px;
  font-weight: 400;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDescription = styled.div`
  ${LinkLabelLegalSemiBoldStyle};
  color: ${colors.label};
  text-align: center;
  margin-top: 8px;
`;
