import { LanguageCode } from "models/models";
import googlePlayIconEn from "images/googlePlayIconEn.png";
import googlePlayIconId from "images/googlePlayIconId.png";
import React from "react";
import styled from "styled-components";
import urls from "helpers/urls";
import { useCurrentLanguageFromContext } from "context/currentLanguageContext/currentLanguageContext";

export const GooglePlayElement = ({
  onClick = undefined,
}: {
  onClick?: () => void;
}) => {
  const { currentLanguage } = useCurrentLanguageFromContext();
  return (
    <a
      href={urls.googlePlayHref}
      target={"_blank"}
      rel="noreferrer"
      onClick={onClick}
    >
      <StyledImg
        src={
          currentLanguage === LanguageCode.id
            ? googlePlayIconId
            : googlePlayIconEn
        }
        alt="google play icon"
      />
    </a>
  );
};

const StyledImg = styled.img`
  width: 188px;
`;
