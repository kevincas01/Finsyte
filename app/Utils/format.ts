// Currency
export const formatCurrency = (
  value: number,
  maxFractionDigits: number = 0
): string => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maxFractionDigits, // or 2 if you want cents
  });
};

export const formatNumberWithCommas = (value: number): string => {
  return value.toLocaleString("en-US");
};

// Dates

export function formatDate(input: string): string {
  const [year, month, day] = input.split("-");
  if (!year || !month || !day) return "Invalid Date";

  return `${month}/${day}/${year}`;
}
