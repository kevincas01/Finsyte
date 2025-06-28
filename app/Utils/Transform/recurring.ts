import {
  ClientRecurringTransaction,
  ClientRecurringTransactionWAccount,
  DBRecurringTransaction,
  DBRecurringTransactionWAccount,
} from "@/app/Types/recurring";

export const mapToClientRecurring = (
  recurring: DBRecurringTransaction
): ClientRecurringTransaction => {
  return {
    id: recurring.id,
    category: recurring.category,
    name: recurring.name,
    amount: recurring.amount,
    frequency: recurring.frequency,
    last_date: recurring.last_date,
    next_date: recurring.next_date,
  };
};
export const mapToClientRecurringWAccount = (
  recurring: DBRecurringTransactionWAccount
): ClientRecurringTransactionWAccount => {
  return {
    id: recurring.id,
    category: recurring.category,
    name: recurring.name,
    amount: recurring.amount,
    frequency: recurring.frequency,
    last_date: recurring.last_date,
    next_date: recurring.next_date,
    accountName: recurring.account?.name,
  };
};
