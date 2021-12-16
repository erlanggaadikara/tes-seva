import { Button, ButtonType } from "components/Button/Button";
import React, { MouseEventHandler } from "react";

import { Calendar } from "components/icon/Calendar/Calendar";
import { Card } from "components/icon/Card/Card";
import { Clock } from "components/icon/Clock/Clock";
import { LinkLabelSmallSemiBoldStyle } from "components/typography/LinkLabelSmallSemiBold";
import { TafInfo } from "./TafInfo";
import { TextLegalMediumStyle } from "components/typography/TextLegalMedium";
import { TextXSmallMediumStyle } from "components/typography/TextXSmallMedium";
import { colors } from "styles/colors";
import { getTenureFormatted } from "utils/translationFormatter";
import styled from "styled-components";
import { transformToJtWithTwoDecimal } from "utils/numberUtils/numberUtils";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import { useTranslation } from "react-i18next";

type Props = {
  monthlyInstallment: number;
  downPayment: number;
  tenure: number;
  finco: string | undefined;
  onCustomizeLoanClicked?: MouseEventHandler<HTMLButtonElement>;
};

export const LoanDetail = ({
  monthlyInstallment,
  downPayment,
  tenure,
  finco,
  onCustomizeLoanClicked,
}: Props) => {
  const { t } = useTranslation();
  const [currentLanguage] = useCurrentLanguage();
  return (
    <StyledWrapper>
      {!onCustomizeLoanClicked && (
        <StyledTitle>
          {t("preApprovalProgress.confirm.loanInfo.title")}
        </StyledTitle>
      )}
      <StyledContent>
        <StyledItem>
          <>
            <Calendar width={16} />
            <StyledLabel>{t(`common.monthlyInstallments`)}</StyledLabel>
          </>
          <StyledValueText>
            {transformToJtWithTwoDecimal(monthlyInstallment, currentLanguage)}
          </StyledValueText>
        </StyledItem>
        <StyledItem>
          <>
            <Card width={16} />
            <StyledLabel>{t(`common.downPayment`)}</StyledLabel>
          </>
          <StyledValueText>
            {transformToJtWithTwoDecimal(downPayment, currentLanguage)}
          </StyledValueText>
        </StyledItem>
        <StyledItem>
          <>
            <Clock />
            <StyledLabel>{t(`variantDetails.tenure`)}</StyledLabel>
          </>
          <StyledValueText>{getTenureFormatted(t, tenure)}</StyledValueText>
        </StyledItem>
      </StyledContent>
      {onCustomizeLoanClicked && (
        <StyledButton
          width="100%"
          height="30px"
          buttonType={ButtonType.subtle}
          onClick={onCustomizeLoanClicked}
        >
          {t("newFunnelVariantDetailsPage.customizeLoan")}
        </StyledButton>
      )}
      <StyledSeparator />
      <TafInfo finco={finco} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 22px 16px 32px;
  text-align: left;
`;
const StyledTitle = styled.p`
  ${TextXSmallMediumStyle};
  color: ${colors.label};
`;
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 36px;
`;
const StyledItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 8px;
`;
const StyledLabel = styled.p`
  ${TextLegalMediumStyle};
  margin-left: 10px;
  color: ${colors.label};
  text-align: center;
`;
const StyledValueText = styled.p`
  ${LinkLabelSmallSemiBoldStyle};
  flex: 1;
  text-align: right;
`;

const StyledButton = styled(Button)`
  text-decoration-line: underline;
  margin-bottom: 24px;
`;

const StyledSeparator = styled.div`
  border: 1px solid ${colors.line};
  margin-bottom: 16px;
`;
