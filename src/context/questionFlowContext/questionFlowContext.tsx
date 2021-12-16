import { useContext } from "react";
import patchDataContext from "context/patchDataContext/patchDataContext";
import {
  PreApprovalQuestionsAddressKey,
  PreApprovalQuestionsKey,
} from "models/models";

import { FormControl } from "surveyFormContext/surveyFormContext";
import { FormControlValue } from "types/types";

interface QuestionFlowForm {
  [PreApprovalQuestionsAddressKey.Province]: FormControl<FormControlValue>;
  [PreApprovalQuestionsAddressKey.City]: FormControl<FormControlValue>;
  [PreApprovalQuestionsAddressKey.ZipCode]: FormControl<string>;
  [PreApprovalQuestionsKey.Email]: FormControl<string>;
}

const initData = {
  [PreApprovalQuestionsAddressKey.Province]: {
    value: "",
    isDataValid: false,
  },
  [PreApprovalQuestionsAddressKey.City]: {
    value: "",
    isDataValid: false,
  },
  [PreApprovalQuestionsAddressKey.ZipCode]: {
    value: "",
    isDataValid: false,
  },
  [PreApprovalQuestionsKey.Email]: {
    value: "",
    isDataValid: false,
  },
};
const { Context, Provider } = patchDataContext<QuestionFlowForm>(initData);

export const QuestionFlowContextProvider = Provider;

export const useQuestionFlowForm = () => {
  const { state, patchState } = useContext(Context);
  return {
    questionFlowForm: state,
    patchQuestionFlowForm: patchState,
  };
};
