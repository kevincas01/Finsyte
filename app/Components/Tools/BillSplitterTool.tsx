"use client";

import NumberInput from "../Inputs/NumberInput";
import SplitResults from "./SplitResults";
import PeopleInputSection from "./PeopleInputSection";
import ItemInputSection from "./InputItemSection";
import { useBillSplitterState } from "@/app/Hooks/useBillSplitter";

const BillSplitterTool = () => {
  const {
    splitMode,
    setSplitMode,
    billAmountInput,
    setBillAmountInput,
    peopleAmountInput,
    setPeopleAmountInput,
    taxInput,
    setTaxInput,
    tipInput,
    setTipInput,
    peopleList,
    setPeopleList,
    itemList,
    setItemList,
  } = useBillSplitterState();

  const billAmount = parseFloat(billAmountInput) || 0;
  const peopleAmount = Math.max(1, parseInt(peopleAmountInput) || 0);
  const tax = Math.max(0, parseFloat(taxInput) || 0);
  const tip = Math.max(0, parseFloat(tipInput) || 0);
  const splitModes = ["Even", "Itemized"] as const;
  const itemsTotal = itemList.reduce(
    (totalAmount, item) => totalAmount + item.price,
    0
  );
  const subtotal = splitMode === "Even" ? billAmount : itemsTotal;
  return (
    <div className="shadow-card p-5 rounded-md bg-white">
      <div className=" grid grid-cols-2">
        <div className="flex flex-col gap-2 pr-5  border-r border-r-gray-200">
          <div>
            <p className="font-semibold">Advanced Bill Splitter</p>
            <p className="text-gray-600">
              Split bills evenly or by items with custom assignments
            </p>
          </div>
          <div>
            <p className="block mb-1 text-sm font-medium text-gray-700">Split Mode</p>
            <div className="flex gap-2">
              {splitModes.map((mode) => (
                <button
                  key={mode}
                  className={`flex flex-1 justify-center items-center py-1 px-2 cursor-pointer text-sm rounded-md font-medium ${
                    splitMode === mode
                      ? "text-white bg-primaryBlue"
                      : "text-black bg-white border border-gray-200"
                  }`}
                  onClick={() => {
                    setSplitMode(mode);
                  }}
                >
                  {mode} Split
                </button>
              ))}
            </div>
          </div>

          {splitMode === "Even" ? (
            <>
              <NumberInput
                label="Total Bill Amount *"
                value={billAmountInput}
                placeHolder="0.00"
                onChange={setBillAmountInput}
                minValue={0}
              />
              <NumberInput
                label="Number of People *"
                placeHolder="2"
                value={peopleAmountInput}
                onChange={(value) => setPeopleAmountInput(value)}
                minValue={1}
              />
            </>
          ) : (
            <>
              <PeopleInputSection
                peopleList={peopleList}
                setPeopleList={setPeopleList}
              />

              <ItemInputSection
                itemList={itemList}
                setItemList={setItemList}
                peopleList={peopleList}
              />
            </>
          )}

          <NumberInput
            label="Tax %"
            value={taxInput}
            placeHolder="7"
            onChange={(value) => setTaxInput(value)}
            minValue={0}
          />
          <NumberInput
            label="Tip $"
            placeHolder="0"
            value={tipInput}
            onChange={(value) => setTipInput(value)}
            minValue={0}
          />
        </div>
        <SplitResults
          splitMode={splitMode}
          subtotal={subtotal}
          tax={tax}
          tip={tip}
          peopleAmount={peopleAmount}
          peopleList={peopleList}
          itemList={itemList}
        />
      </div>
    </div>
  );
};

export default BillSplitterTool;
