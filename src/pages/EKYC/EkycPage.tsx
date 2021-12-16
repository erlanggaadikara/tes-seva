import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { EkycStatusResponse, getEkycStatus } from "services/ekyc";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import {
  bankSelectionUrl,
  ocrSuccessUrl,
  preApprovalFailureUrl,
} from "routes/routes";

import { ToastType, useToast } from "components/Toast/Toast";
import { useTranslation } from "react-i18next";
import { trackViewPreapprovalRejected } from "helpers/amplitude/preApprovalEventTracking";
import { EkycStatus, AmplitudeRejectReason } from "models/models";

export default function EkycPage() {
  const { t } = useTranslation();
  const location = useLocation<{ url: string } | undefined>();
  const url = location.state?.url;
  const history = useHistory();
  const { showToast, RenderToast } = useToast();

  const getCustomerEkycStatus = async (intervalId: NodeJS.Timeout) => {
    try {
      const ekycData: AxiosResponse<EkycStatusResponse> = await getEkycStatus();
      const ekycStatus = ekycData.data.status;
      if (!ekycStatus) {
        return;
      } else {
        intervalId && clearInterval(intervalId);
        if (
          ekycStatus === EkycStatus.EkycSuccessful ||
          ekycStatus === EkycStatus.EkycInProgress
        ) {
          history.replace(bankSelectionUrl);
        } else {
          history.replace(preApprovalFailureUrl);
          trackViewPreapprovalRejected(
            "vida",
            AmplitudeRejectReason.EKYC_Failed
          );
        }
      }
    } catch (e) {
      showToast();
    }
  };

  const clearTimers = (
    intervalId: NodeJS.Timeout,
    timeoutId: NodeJS.Timeout
  ) => {
    intervalId && clearInterval(intervalId);
    timeoutId && clearTimeout(timeoutId);
  };

  useEffect(() => {
    if (!url) {
      history.replace(ocrSuccessUrl);
    }

    const intervalId = setInterval(() => {
      getCustomerEkycStatus(intervalId);
    }, 4000);

    const timeoutId = setTimeout(() => {
      clearTimers(intervalId, timeoutId);
      history.replace(preApprovalFailureUrl);
      trackViewPreapprovalRejected("vida", "timeout");
    }, 600000);
    return () => {
      clearTimers(intervalId, timeoutId);
    };
  }, []);

  return (
    <>
      <StyleIframe src={url} allow="camera *;" />
      <RenderToast type={ToastType.Error} message={t("common.errorMessage")} />
    </>
  );
}

const StyleIframe = styled.iframe`
  width: 100%;
  height: 100vh;
  overflow: scroll;
`;
