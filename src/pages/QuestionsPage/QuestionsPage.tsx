import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { QuestionList } from "./QuestionList/QuestionList";
import { H2MediumBold } from "components/typography/H2MediumBold";
import { useTranslation } from "react-i18next";
import { colors } from "styles/colors";
export default function QuestionsPage() {
  const { t } = useTranslation();
  const questionPageRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const postPageHeightToWebView = () => {
    setTimeout(() => {
      const height = questionPageRef.current.clientHeight;
      window.ReactNativeWebView &&
        window.ReactNativeWebView.postMessage(JSON.stringify(height));
    }, 0);
  };
  useEffect(postPageHeightToWebView, []);

  return (
    <StyledQuestion ref={questionPageRef}>
      <StyledTitle>
        <H2MediumBold>{t("questionsPage.title")}</H2MediumBold>
      </StyledTitle>
      <QuestionList onCollapseClick={postPageHeightToWebView} />
    </StyledQuestion>
  );
}
const StyledQuestion = styled.div`
  background-color: ${colors.offWhite};
`;
const StyledTitle = styled.div`
  padding: 25px 16px;
  text-align: center;
`;
