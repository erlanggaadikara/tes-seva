import React, { useEffect } from "react";
import { SpeedometerGreen } from "components/SpeedometerGreen/SpeedometerGreen";
import { SpeedometerYellow } from "components/SpeedometerYellow/SpeedometerYellow";
import { SpeedometerRed } from "components/SpeedometerRed/SpeedometerRed";
import { useModal } from "components/Modal/Modal";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { useTranslation } from "react-i18next";
import { SpeedometerSvgProps } from "components/SpeedometerSvg/SpeedometerSvg";
import { colors } from "styles/colors";
import styled from "styled-components";
import { LinkLabelLegalSemiBold } from "components/typography/LinkLabelLegalSemiBold";
import { LinkLabelXSmallSemiBold } from "components/typography/LinkLabelXSmallSemiBold";
import {
  TextLegalMedium,
  TextLegalMediumStyle,
} from "components/typography/TextLegalMedium";
import { Button, ButtonType } from "components/Button/Button";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LocalStorageKey } from "models/models";
import { ModalBody } from "components/ModalBodyWrapper/ModalBodyWrapper";

interface ColorExplain {
  component: (props: SpeedometerSvgProps) => JSX.Element;
  title: string;
  subtitle: string;
  bgColor: string;
}

interface ColorNotificationProps {
  isVisible: boolean;
  onClose: () => void;
}

export const ColorNotification = ({
  isVisible,
  onClose,
}: ColorNotificationProps) => {
  const { t } = useTranslation();
  const { showModal, hideModal, RenderModal } = useModal();
  const [, setColorNotificationShown] = useLocalStorage(
    LocalStorageKey.ColorNotificationModalShown,
    false
  );
  const colorsExplain: ColorExplain[] = [
    {
      component: SpeedometerGreen,
      title: "colorNotificationModal.colorsExplain.green.title",
      subtitle: "colorNotificationModal.colorsExplain.green.subtitle",
      bgColor: colors.successLight,
    },
    {
      component: SpeedometerYellow,
      title: "colorNotificationModal.colorsExplain.yellow.title",
      subtitle: "colorNotificationModal.colorsExplain.yellow.subtitle",
      bgColor: colors.warningLight,
    },
    {
      component: SpeedometerRed,
      title: "colorNotificationModal.colorsExplain.red.title",
      subtitle: "colorNotificationModal.colorsExplain.red.subtitle",
      bgColor: colors.errorLight,
    },
  ];
  useEffect(() => {
    isVisible && showModal();
  }, [isVisible]);
  const speedometerProps: SpeedometerSvgProps = {
    radius: 26,
    lineWidth: 8,
  };
  const onCloseModal = () => {
    setColorNotificationShown(true);
    hideModal();
    onClose();
  };
  return (
    <RenderModal>
      <ModalBody>
        <StyledModalContent>
          <TextSmallRegular
            dangerouslySetInnerHTML={{
              __html: t("colorNotificationModal.title"),
            }}
          />

          <StyledColorsExplainSection>
            {colorsExplain.map((colorExplain, index) => {
              return (
                <StyledColorItem key={index} bgColor={colorExplain.bgColor}>
                  <>{colorExplain.component(speedometerProps)}</>
                  <StyledTextWrapper>
                    <p>
                      <LinkLabelXSmallSemiBold>
                        {t(colorExplain.title)}
                      </LinkLabelXSmallSemiBold>
                    </p>
                    <p>
                      <LinkLabelLegalSemiBold>
                        {t(colorExplain.subtitle)}
                      </LinkLabelLegalSemiBold>
                    </p>
                  </StyledTextWrapper>
                </StyledColorItem>
              );
            })}
          </StyledColorsExplainSection>
          <StyledRatingsMeaningSection>
            <p>
              <TextLegalMedium>
                {t("colorNotificationModal.ratingsMeaning.title")}
              </TextLegalMedium>
            </p>
            <StyledTextLi
              dangerouslySetInnerHTML={{
                __html: t("colorNotificationModal.ratingsMeaning.itemFirst"),
              }}
            />
            <StyledTextLi
              dangerouslySetInnerHTML={{
                __html: t("colorNotificationModal.ratingsMeaning.itemSecond"),
              }}
            />
          </StyledRatingsMeaningSection>
          <StyledButtonContainer>
            <Button
              buttonType={ButtonType.primary1}
              width={"86%"}
              onClick={onCloseModal}
            >
              <LinkLabelSmallSemiBold>{t("common.ok")}</LinkLabelSmallSemiBold>
            </Button>
          </StyledButtonContainer>
        </StyledModalContent>
      </ModalBody>
    </RenderModal>
  );
};
const StyledModalContent = styled.section`
  padding: 20px;
  color: ${colors.body};
`;

interface ColorItemStyleProps {
  bgColor: string;
}

const StyledColorItem = styled.div<ColorItemStyleProps>`
  display: flex;
  align-items: center;
  padding: 8px;
  background: ${({ bgColor }) => bgColor};
  margin-bottom: 8px;
  border-radius: 8px;
`;
const StyledTextWrapper = styled.div`
  margin-left: 5px;
`;
const StyledColorsExplainSection = styled.section`
  margin: 29px 0 21px;
`;
const StyledRatingsMeaningSection = styled.ul`
  margin-bottom: 34px;
  list-style-position: outside;
`;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledTextLi = styled.li`
  ${TextLegalMediumStyle};
  text-align: left;
  margin-left: 20px;
  list-style-type: decimal;
`;
