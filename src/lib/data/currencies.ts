// data/currencies.ts
export interface CurrencyOption {
  value: string;
  label: string;
  symbol: string;
  symbolPosition: "before" | "after";
}

export const currencies: CurrencyOption[] = [
  { value: "eur", label: "Euro", symbol: "€", symbolPosition: "before" },
  { value: "usd", label: "United States Dollar", symbol: "$", symbolPosition: "before" },
  { value: "gbp", label: "British Pound Sterling", symbol: "£", symbolPosition: "before" },
  { value: "cny", label: "Chinese Yuan", symbol: "¥", symbolPosition: "before" },
  { value: "chf", label: "Swiss Franc", symbol: "CHF", symbolPosition: "before" },
  { value: "jpy", label: "Japanese Yen", symbol: "¥", symbolPosition: "before" },
]

export const currencyValues = currencies.map(currency => currency.value)
// export const currencyValues = [
//   "eur",
//   "usd",
//   "gbp",
//   "cny",
//   "chf",
//   "jpy",
// ] as const
