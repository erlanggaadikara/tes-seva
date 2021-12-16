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
      title={t("checkFailurePage.title")}
      message={t("checkFailurePage.message")}
      cta={() => (
        <Button
          width="100%"
          buttonType={ButtonType.primary1}
          onClick={goToCarResults}
        >
          {t(`checkFailurePage.cta`)}
        </Button>
      )}
    />
  );
}
