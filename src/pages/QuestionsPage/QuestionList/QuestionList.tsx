import React, { useState } from "react";
import { Collapse } from "components/DropDownBox/Collapse";
import { colors } from "styles/colors";
import { Plus } from "components/icon/Plus/Plus";
import { LinkLabelSmallSemiBold } from "components/typography/LinkLabelSmallSemiBold";
import styled from "styled-components";
import { TextLegalMedium } from "components/typography/TextLegalMedium";
import { useTranslation } from "react-i18next";
import { questions } from "./utils/questionsId.config";
export interface QuestionListObject {
  [key: string]: QuestionProps;
}
interface QuestionProps {
  title: string;
  content: string;
  isExpanded?: boolean;
}
interface QuestionListProps {
  onCollapseClick?: () => void;
}
const initialQuestionList: QuestionProps[] = questions;
export const QuestionList = ({ onCollapseClick }: QuestionListProps) => {
  const { t } = useTranslation();
  const [questionList, setQuestionList] = useState(initialQuestionList);

  const handleCollapseClick = (currentIndex: number) => {
    const newQuestionList = questionList.map((question, index) => {
      const isExpanded = !question.isExpanded && currentIndex === index;
      return { ...question, isExpanded: isExpanded };
    });
    setQuestionList(newQuestionList);
    onCollapseClick && onCollapseClick();
  };
  const generateAnswer = (contentTranslationKey: string) => {
    const StyledAnswer = styled.div`
      white-space: pre-wrap;
    `;
    return (
      <StyledAnswer>
        <TextLegalMedium>{t(`${contentTranslationKey}`)}</TextLegalMedium>
      </StyledAnswer>
    );
  };
  const generateTitle = (
    titleTranslationKey: string,
    isExpanded: boolean | undefined
  ) => {
    const StyledTitle = styled.span`
      color: ${() => (isExpanded ? colors.secondaryDark : colors.title)};
    `;
    return (
      <StyledTitle>
        <LinkLabelSmallSemiBold>
          {t(`${titleTranslationKey}`)}
        </LinkLabelSmallSemiBold>
      </StyledTitle>
    );
  };
  const suffixIcon = () =>
    Plus({ width: 32, height: 32, color: colors.plusIcon });
  return (
    <>
      {questionList.map(({ isExpanded }, index) => {
        return (
          <Collapse
            isExpanded={isExpanded}
            onClick={() => handleCollapseClick(index)}
            key={index}
            collapseTitle={generateTitle(
              `questionsPage.questionList.${index}.title`,
              isExpanded
            )}
            content={generateAnswer(
              `questionsPage.questionList.${index}.content`
            )}
            suffixIcon={suffixIcon}
            suffixIconRotatingDegree={45}
            style={{
              borderBottom: `1px solid ${colors.line}`,
              backgroundColor: `${colors.offWhite}`,
            }}
          />
        );
      })}
    </>
  );
};
