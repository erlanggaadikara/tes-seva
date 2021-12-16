export interface AccountDetails {
  email: string
  address: string
  phoneNumber: string
  ktpNumber: string
  accountId: string
  accountHolder: string
  accountNumber: string
  balances: {
    available: number
    current: number
  }
}

export interface TransactionAndBalance {
  month: string
  in: number
  out: number
}

export interface Transaction {
  id: number
  account_id: string
  institution_id: number
  merchant_id: number
  outlet_outlet_id: number
  location_city_id: number
  location_country_id: number
  date: Date
  amount: number
  description: string
  status: string
  direction: string
  category: {
    category_id: number
    category_name: string
    classification_group_id: number
    classification_group: string
    classification_subgroup_id: number
    classification_subgroup: string
  }
}
