"use client";

import { useState, useMemo } from "react";
import TransactionsFilter from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";
import { ClientTransactionWithAccount } from "@/app/Types/transactions";
import TransactionsHeader from "./TransactionsHeader";
import { exportTransactionsToCSV } from "@/app/Utils/export";

interface Props {
  transactions: ClientTransactionWithAccount[];
}

const TransactionsClient = ({ transactions }: Props) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [account, setAccount] = useState("All");

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  const handleAccountChange = (value: string) => {
    setAccount(value);
  };

  const handleTransactionsExport = () => {
    exportTransactionsToCSV(transactions);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = transaction
        .name!.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        category === "All" || transaction.financeCategory === category;
      const matchesAccount =
        account === "All" || transaction.account?.name === account;
      return matchesSearch && matchesCategory && matchesAccount;
    });
  }, [search, category, account, transactions]);

  return (
    <div className="flex flex-col gap-5">
      <TransactionsHeader onExport={handleTransactionsExport} />
      <TransactionsFilter
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        account={account}
        onAccountChange={handleAccountChange}
      />
      <TransactionsTable transactions={filteredTransactions} />
    </div>
  );
};

export default TransactionsClient;
