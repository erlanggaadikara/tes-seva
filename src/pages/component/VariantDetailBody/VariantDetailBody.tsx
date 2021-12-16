import { colors } from "styles/colors";
import React, { MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import { CarVariantDetails, VariantSpecifications } from "types/types";
import { Collapse } from "components/DropDownBox/Collapse";
import { LinkLabelLargeSemiBold } from "components/typography/LinkLabelLargeSemiBold";
import { useTranslation } from "react-i18next";
import { DownOutlined } from "components/icon/DownOutlined/DownOutlined";
import { LanguageCode, NewFunnelLoanRank } from "models/models";
import { TextSmallRegular } from "components/typography/TextSmallRegular";
import { useCurrentLanguage } from "hooks/useCurrentLanguage/useCurrentLanguage";
import { LoanEstimateArea } from "LoanEstimateArea/LoanEstimateArea";
import { variantDetailsConfig } from "VariantDetailsPage/variantDetails.config";
import { SpecificationArea } from "SpecificationComponent/SpecificationArea";
import { trackVariantDetailsEvent } from "VariantDetailsPage/variantDetailsUtils/variantDetailsUtils";
import { trackSelectCarResultVariantDetailsDescription } from "helpers/amplitude/newFunnelEventTracking";
import { useCarResultParameter } from "hooks/useAmplitudePageView/useAmplitudePageView";
import { LoanDetail } from "LoanDetail/LoanDetail";
import { NewFunnelLoanRankComponent } from "NewFunnelLoanRank/NewFunnelLoanRankComponent";
import { CustomerPreApprovalResponse } from "types/types";
import { LocalStorageKey } from "models/models";
import { getPreApprovalResultByCustomId } from "services/preApproval";
import { AxiosResponse } from "axios";

interface VariantDetailHeaderProps {
  carVariantDetails: CarVariantDetails;
  description: string;
  specifications: string;
  brochure: string;
  variantSpecifications: VariantSpecifications[];
  isNewFunnel?: boolean;
  onCustomizeLoanClicked?: MouseEventHandler<HTMLButtonElement>;
}

export const VariantDetailBody = ({
  carVariantDetails,
  variantSpecifications,
  specifications,
  description,
  brochure,
  isNewFunnel = false,
  onCustomizeLoanClicked = () => null,
}: VariantDetailHeaderProps) => {
  const { t } = useTranslation();
  const suffixIcon = () => <DownOutlined color={colors.primary1} />;
  const [currentLanguage] = useCurrentLanguage();
  const {
    variantDetail: {
      description: { id, en },
    },
  } = carVariantDetails;
  const [approvalInfo, setApprovalInfo] =
    useState<CustomerPreApprovalResponse | null>(null);
  const customerId = localStorage.getItem(LocalStorageKey.CustomerId);
  useEffect(() => {
    if (customerId) {
      getPreApprovalResultByCustomId(customerId).then(
        (result: AxiosResponse<CustomerPreApprovalResponse>) =>
          setApprovalInfo(result.data)
      );
    }
  }, [customerId]);
  const getLoanDetailComponent = (): JSX.Element => {
    return (
      <LoanDetail
        monthlyInstallment={carVariantDetails?.loanDetail?.monthlyInstallment}
        downPayment={carVariantDetails?.loanDetail?.dpAmount}
        tenure={carVariantDetails?.loanDetail?.tenure}
        onCustomizeLoanClicked={onCustomizeLoanClicked}
        finco={approvalInfo?.finco}
      />
    );
  };
  const getDescriptionComponent = (): JSX.Element => {
    const value = currentLanguage === LanguageCode.id ? id ?? "" : en ?? "";
    return <TextSmallRegular>{value}</TextSmallRegular>;
  };
  const generateCollapseTitle = (title: string) => (
    <LinkLabelLargeSemiBold>{title}</LinkLabelLargeSemiBold>
  );
  const carResultParameter = useCarResultParameter();
  const onDescriptionExpand = () => {
    isNewFunnel &&
      trackVariantDetailsEvent({
        carVariantDetails,
        carResultParameter,
        trackFunction: trackSelectCarResultVariantDetailsDescription,
      });
  };

  return (
    <StyledBody>
      {carVariantDetails?.loanDetail?.loanRank && isNewFunnel && (
        <NewFunnelLoanRankComponent
          loanRank={
            carVariantDetails?.loanDetail
              ?.loanRank as unknown as NewFunnelLoanRank
          }
          borderTopRadius={16}
          borderBottomRadius={0}
        />
      )}
      {isNewFunnel ? (
        <StyledLoanDetailCollapse
          collapseTitle={generateCollapseTitle(
            t("variantDetails.loanEstimate")
          )}
          suffixIcon={suffixIcon}
          content={getLoanDetailComponent()}
          style={{
            borderRadius: "16px",
          }}
          isExpanded={true}
        />
      ) : (
        <LoanEstimateArea
          carVariantDetails={carVariantDetails}
          variantDetailsInfo={variantDetailsConfig}
        />
      )}

      <SpecificationArea
        carVariantDetails={carVariantDetails}
        variantSpecifications={variantSpecifications}
        specifications={specifications}
        brochure={brochure}
        isNewFunnel={isNewFunnel}
      />

      <Collapse
        collapseTitle={generateCollapseTitle(t(description))}
        suffixIcon={suffixIcon}
        content={getDescriptionComponent()}
        style={{
          borderRadius: "16px",
        }}
        onExpand={onDescriptionExpand}
      />
    </StyledBody>
  );
};

const StyledBody = styled.div`
  width: 100%;
  padding: 0 16px;
`;

const StyledLoanDetailCollapse = styled(Collapse)``;
