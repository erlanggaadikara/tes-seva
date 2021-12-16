import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FormLabel } from "component/FormLabel/FormLabel";
import styled from "styled-components";
import {
  useContextSurveyFormData,
  useContextSurveyFormPatch,
} from "context/surveyFormContext/surveyFormContext";
import { seatsFormConfig } from "./seatsFormConfig";
import { Checkbox } from "components/form/Checkbox/Checkbox";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { isDataValid } from "surveyFormUtils";
import { SurveyFormKey } from "models/models";

export const SurveyFormSeats = () => {
  const { t } = useTranslation();
  const surveyFormData = useContextSurveyFormData();
  const [seatNumber, setSeatNumber] = useState<string[]>(
    surveyFormData.seatNumber?.value as string[]
  );
  const patchSurveyFormValue = useContextSurveyFormPatch();
  const handleOnChange = (value: string[]) => {
    setSeatNumber(value);
    patchSurveyFormValue({
      [SurveyFormKey.SeatNumber]: { value, isDataValid: isDataValid(value) },
    });
  };
  return (
    <Wrapper>
      <FormLabel>{t(seatsFormConfig.label)}</FormLabel>
      <StyledSubtitleArea>
        <TextSmallRegular>{t(seatsFormConfig.subtitle)}</TextSmallRegular>
      </StyledSubtitleArea>
      <Checkbox
        value={seatNumber || []}
        options={seatsFormConfig.options}
        onChanged={handleOnChange}
        showIcon={false}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSubtitleArea = styled.p`
  margin-top: 18px;
  margin-bottom: 26px;
`;
