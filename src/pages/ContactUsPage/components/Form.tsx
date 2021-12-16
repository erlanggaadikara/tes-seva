import React from "react";
import styled from "styled-components";
import { TextMediumRegularStyle } from "components/typography/TextMediumRegular";
import { Button, ButtonType } from "components/Button/Button";
import { FiledSection } from "./FieldSection";
import { Input } from "components/form/Input/Input";
import { colors } from "styles/colors";
import { useTranslation } from "react-i18next";
import { TextLegalRegular } from "components/typography/TextLegalRegular";

export default function Form() {
  const { t } = useTranslation();

  return (
    <StyledForm>
      <FiledSection fieldLabel={t("contactUsPage.form.name")}>
        <InputRow>
          <InputBottomLabel>
            <StyledInput type={"tel"} />
            <label>{t("contactUsPage.form.firstName")}</label>
          </InputBottomLabel>
          <InputBottomLabel>
            <StyledInput type={"tel"} />
            <label>{t("contactUsPage.form.lastName")}</label>
          </InputBottomLabel>
        </InputRow>
      </FiledSection>

      <FiledSection fieldLabel={t("contactUsPage.form.email")}>
        <StyledInput
          type={"tel"}
          placeholder={t("contactUsPage.placeholder.email")}
        />
      </FiledSection>

      <FiledSection fieldLabel={t("contactUsPage.form.phone")}>
        <StyledInput
          type={"tel"}
          placeholder={t("contactUsPage.placeholder.phone")}
        />
      </FiledSection>

      <FiledSection fieldLabel={t("contactUsPage.form.message")}>
        <StyledTextArea placeholder={t("contactUsPage.placeholder.message")} />
      </FiledSection>

      <StyledButton
        height={"40px"}
        buttonType={ButtonType.primary2}
        loading={false}
      >
        <TextLegalRegular>{t(`contactUsPage.form.submit`)}</TextLegalRegular>
      </StyledButton>
    </StyledForm>
  );
}

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledInput = styled(Input)`
  border-radius: 0px;
  background: ${colors.inputBg};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  background: ${colors.inputBg};
  ::placeholder {
    color: ${colors.placeholder};
    ${TextMediumRegularStyle}
  }
`;

const StyledButton = styled(Button)`
  margin-left: 0;
  width: 30%;
  height: 70px;
  background: ${colors.secondaryDark2};
  border-radius: 5px;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const InputBottomLabel = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;
