import { ClientTransactionWithAccount } from "../Types/transactions";

export const exportTransactionsToCSV = (
  transactions: ClientTransactionWithAccount[],
  filename: string = "transactions.csv"
) => {
  if (transactions.length === 0) return;

  const headers = [
    "Date",
    "Name",
    "Category",
    "Account",
    "Amount",
    "Description",
  ];

  const rows = transactions.map((tx) => [
    tx.datetime,
    tx.name,
    tx.financeCategory || "Uncategorized",
    tx.account?.name || "Unknown",
    tx.amount.toFixed(2),
    tx.description || "",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map(
          (cell) => `"${String(cell).replace(/"/g, '""')}"` // escape double quotes
        )
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
