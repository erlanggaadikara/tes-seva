import React, {
  HTMLAttributes,
  ReactElement,
  useEffect,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { colors, transparent } from "styles/colors";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "components/icon/ArrowLeftOutlined/ArrowLeftOutlined";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import { useContextSurveyFormData } from "context/surveyFormContext/surveyFormContext";
import { ProgressBar } from "components/ProgressBar/ProgressBar";
import { BackgroundImage } from "images/BackgroundImage/BackgroundImage";
import { SurveyFormKey } from "models/models";
import { screenHeight } from "styles/GlobalStyle";
import { trackSurveyStep } from "helpers/trackingEvents";

interface TypeFormProps {
  children: Array<ReactElement>;
  currentStep: number;
  onExitForm: () => void;
  onSubmit?: () => void;
  nextBtnOnClick?: () => void;
  backBtnOnClick?: () => void;
}

const TypeForm = ({
  children,
  currentStep,
  onExitForm,
  onSubmit = () => ({}),
  nextBtnOnClick = () => ({}),
  backBtnOnClick = () => ({}),
}: TypeFormProps) => {
  const contextSurveyFormData = useContextSurveyFormData();
  const { t } = useTranslation();
  const [current, setCurrent] = useState(currentStep);

  useEffect(() => {
    setCurrent(currentStep);
  }, [currentStep]);

  const shouldShowCard = (index: number) => index === current;

  const goNext = () => {
    if (current < children.length) {
      setCurrent(current + 1);
      nextBtnOnClick();
    }
  };

  const goBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
      backBtnOnClick();
    } else {
      onExitForm();
    }
  };

  const isLastComponent = () => current === children.length - 1;

  const shouldEnableNextBtn = (child: React.ReactElement) => {
    const item = contextSurveyFormData[child.key as SurveyFormKey];
    return item && item.isDataValid;
  };

  useEffect(() => {
    if (currentStep !== null) {
      trackSurveyStep(children[currentStep].key as string);
    }
  }, [currentStep]);

  const getFrontLayerCardView = (children: Array<ReactElement>) => {
    return React.Children.map(children, (child, index) => {
      const Element = child.type;
      return (
        <Card show={shouldShowCard(index)}>
          <StyledBackground>
            <BackgroundImage width={"100%"} height={"70%"} />
          </StyledBackground>
          <StyledElement>
            <Element {...child.props} />
          </StyledElement>
          <Footer>
            <BackButton onClick={goBack}>
              <ArrowLeftOutlined color={colors.primaryLight1} />
              <LinkLabelSmallSemiBold>
                {t("surveyForm.formControl.back")}
              </LinkLabelSmallSemiBold>
            </BackButton>
            <NextButton
              onClick={isLastComponent() ? onSubmit : goNext}
              disabled={!shouldEnableNextBtn(child)}
            >
              <LinkLabelSmallSemiBold>
                {t("surveyForm.formControl.next")}
              </LinkLabelSmallSemiBold>
            </NextButton>
          </Footer>
          <MiddleLayerCard />
          <BackLayerCard />
        </Card>
      );
    });
  };

  return (
    <Container>
      <ProgressBar percentage={(100 * (current + 1)) / children.length} />
      {getFrontLayerCardView(children)}
    </Container>
  );
};

const Container = styled.div`
  padding: 22px 16px 40px;
`;

interface CardProps {
  show: boolean;
}

const sharedFCardStyle = css`
  display: block;
  background: ${colors.offWhite};
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(17, 17, 17, 0.04);
`;

const Card = styled.div<CardProps>`
  ${sharedFCardStyle};
  position: relative;
  display: ${({ show }) => (show ? "block" : "none")};
  min-height: ${screenHeight - 80}px;
  box-shadow: 0 32px 64px rgba(17, 17, 17, 0.08);
  padding: 40px 16px 80px;
`;

const sharedCardStyle = css`
  height: 400px;
`;

const MiddleLayerCard = styled.div`
  ${sharedFCardStyle};
  position: absolute;
  left: 8px;
  right: 8px;
  z-index: -1;
  bottom: -9px;
  ${sharedCardStyle}
`;

const BackLayerCard = styled.div`
  ${sharedFCardStyle};
  position: absolute;
  left: 19px;
  right: 19px;
  z-index: -2;
  bottom: -17px;
  ${sharedCardStyle}
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 0 16px 16px;
`;

const NextButton = styled.button<HTMLAttributes<HTMLButtonElement>>`
  width: 144px;
  height: 65px;
  background: ${colors.primary1};
  border: none;
  border-radius: 16px 0 16px 0;
  color: ${colors.white};
  &:hover {
    cursor: pointer;
  }
  :disabled {
    background: ${transparent("primary1", 0.2)};
  }
`;

const BackButton = styled.div`
  width: 200px;
  height: 65px;
  color: ${colors.primary1};
  display: flex;
  align-items: center;
  padding-left: 20px;
  &:hover {
    cursor: pointer;
  }
  & svg {
    margin-right: 7px;
  }
`;
const StyledBackground = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  bottom: 0;
  left: 0;
  justify-content: flex-start;
  align-items: flex-end;
`;
const StyledElement = styled.span`
  position: relative;
`;
export default TypeForm;
