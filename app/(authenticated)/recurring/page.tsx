import RecurringHeader from "@/app/Components/Recurring/RecurringHeader";
import RecurringOverview from "@/app/Components/Recurring/RecurringOverview";
import RecurringPaymentList from "@/app/Components/Recurring/RecurringPaymentList";
import { recurringExpenses } from "@/app/Constants/recurring";

const BudgetsPage = () => {

  return (
    <div className="flex flex-col gap-5">
      <RecurringHeader />

      <RecurringPaymentList expenses={recurringExpenses} />
    </div>
  );
};

export default BudgetsPage;
