const wholeCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const decimalCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

/**
 * Formats the numeric price into a proper currency string, with symbol.
 * Keeps whole numbers whole (ex. $3 instead of $3.00).
 * Is set to USD for the purposes of this demo.
 */
export function formatPrice(rawPrice: number) {
  return Number.isInteger(rawPrice)
    ? wholeCurrencyFormatter.format(rawPrice)
    : decimalCurrencyFormatter.format(rawPrice);
}
