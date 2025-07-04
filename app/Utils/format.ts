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

export function formatDateToMMDDYYYY(dateString: string): string {
  const date = new Date(dateString);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${month}/${day}/${year}`;
}

export const formatCategoriesForRadial = (
  categories?: Record<string, number>
): { name: string; value: number }[] => {
  if (!categories) return [];

  return Object.entries(categories).map(([category, value]) => ({
    name: category,
    value,
  }));
};
