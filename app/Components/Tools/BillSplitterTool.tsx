"use client";

import { useState } from "react";
import NumberInput from "../Inputs/NumberInput";
import SplitResults from "./SplitResults";
import PeopleInputSection from "./PeopleInputSection";
import { BillItem } from "@/app/Types/tools";
import ItemInputSection from "./InputItemSection";

const BillSplitterTool = () => {
  const [splitMode, setSplitMode] = useState<"Even" | "Itemized">("Even");
  const [tax, setTax] = useState<number | "">("");
  const [taxMode, setTaxMode] = useState<"Percent" | "Dollar">("Percent");
  const [tip, setTip] = useState<number | "">("");
  const [tipMode, setTipMode] = useState<"Percent" | "Dollar">("Percent");

  const [peopleList, setPeopleList] = useState<string[]>([]);
  const [itemList, setItemList] = useState<BillItem[]>([]);

  const splitModes = ["Even", "Itemized"] as const;
  const [billAmount, setBillAmount] = useState<number | "">("");
  const [peopleAmount, setPeopleAmount] = useState<number | "">("");

  const itemsTotal = itemList.reduce(
    (totalAmount, item) => totalAmount + item.price,
    0
  );
  return (
    <div className="shadow-card p-5 rounded-md bg-white">
      <div className=" grid grid-cols-2">
        <div className="flex flex-col gap-2 pr-5  border-r border-r-gray-200">
          <div className="">
            <p className="font-semibold">Advanced Bill Splitter</p>
            <p className="text-gray-600">
              Split bills evenly or by items with custom assignments
            </p>
          </div>
          <div className="">
            <p className="block mb-1 text-sm font-medium ">Split Mode</p>
            <div className="flex gap-5">
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
                value={billAmount}
                placeHolder="0.00"
                onChange={(value) => setBillAmount(value)}
                minValue={0}
              />
              <NumberInput
                label="Number of People *"
                placeHolder="2"
                value={peopleAmount}
                onChange={(value) => setPeopleAmount(value)}
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
                setBillAmount={setBillAmount}
              />
            </>
          )}

          <NumberInput
            label="Tax"
            value={tax}
            placeHolder="7"
            onChange={(value) => setTax(value)}
            minValue={0}
          />
          <NumberInput
            label="Tip"
            placeHolder="0"
            value={tip}
            onChange={(value) => setTip(value)}
            minValue={0}
          />
        </div>
        <SplitResults
          splitMode={splitMode}
          subtotal={splitMode === "Even" ? Number(billAmount) : itemsTotal}
          tax={Number(tax)}
          tip={Number(tip)}
          peopleAmount={Number(peopleAmount)}
          peopleList={peopleList}
          itemList={itemList}
        />
      </div>
    </div>
  );
};

export default BillSplitterTool;
