import { LoanDetail } from "types/types";

export interface LoanPermutation extends LoanDetail {
  carPrice?: number;
  carPriceMin?: number;
  carPriceMax?: number;
  dpPercentage?: number;
  dpScore?: number;
  loanScore?: number;
  isDefault?: boolean;
}
