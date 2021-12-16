import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PreApprovalFailure } from "component/PreApprovalFailure/PreApprovalFailure";
import { Button, ButtonType } from "components/Button/Button";
import { carResultsUrl } from "routes/routes";

export default function FailurePage() {
  const history = useHistory();
  const { t } = useTranslation();

  const goToCarResults = () => {
    history.push(carResultsUrl);
  };

  return (
    <PreApprovalFailure
      title={t("ekycFailurePage.title")}
      message={t("ekycFailurePage.message")}
      cta={() => (
        <Button buttonType={ButtonType.subtle} onClick={goToCarResults}>
          {t(`common.returnToCarResults`)}
        </Button>
      )}
    />
  );
}
