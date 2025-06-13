import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

interface SplitResultsProps {
  splitMode: "Even" | "Itemized";
  subtotal: number;
  tax: number;
  tip: number;
  peopleAmount: number;
}

const SplitResults = ({
  splitMode,
  subtotal,
  tax,
  tip,
  peopleAmount,
}: SplitResultsProps) => {
  const grandTotal = subtotal + (subtotal * tax) / 100 + tip;
  return (
    <div className="flex flex-col gap-5 pl-5 ">
      <div className="">
        <p className="font-semibold">Split Results</p>
        <p className="text-gray-600">Breakdown of who owes what</p>
      </div>

      {subtotal == 0 ? (
        <div className="flex flex-col justify-center items-center text-center pt-20 text-gray-600 ">
          <ReceiptLongOutlinedIcon fontSize="large" />
          <p className="font-medium text-sm">
            {splitMode === "Even"
              ? "Enter bill details to see the breakdown"
              : "Add people and items to see the split calculation"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="rounded-md bg-gray-50 p-5">
            <div className="flex justify-between">
              <p className="text-gray-600 font-medium">
                {splitMode === "Even" ? "Subtotal" : "Items Subtotal"}
              </p>
              <p className="font-semibold">${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600 font-medium">Tax</p>
              <p className="font-semibold">
                ${((subtotal * tax) / 100).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between border-b border-b-gray-200 pb-2">
              <p className="text-gray-600 font-medium">Tip</p>
              <p className="font-semibold">${tip.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pt-2">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">${grandTotal.toFixed(2)}</p>
            </div>
          </div>
          {splitMode === "Even" ? (
            <div className="bg-primaryBlue/20 text-primaryBlue rounded-md p-3 flex flex-col justify-center items-center">
              <span className="font-medium text-sm">
                <PeopleOutlineOutlinedIcon /> Per Person
              </span>
              <span className="text-3xl font-semibold">
                ${grandTotal.toFixed(2)}
              </span>
              <p className="text-gray-600 text-sm">Split between {peopleAmount} people</p>
            </div>
          ) : (
            "Items Subtotal"
          )}
        </div>
      )}
    </div>
  );
};

export default SplitResults;
