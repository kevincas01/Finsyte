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
  const date = new Date(input);
  if (isNaN(date.getTime())) return "Invalid Date";

  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
