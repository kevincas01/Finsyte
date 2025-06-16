import { useState } from "react";
import { BillItem } from "@/app/Types/tools";

export function useBillSplitterState() {
  const [splitMode, setSplitMode] = useState<"Even" | "Itemized">("Even");

  const [billAmountInput, setBillAmountInput] = useState<string>("");
  const [peopleAmountInput, setPeopleAmountInput] = useState<string>("");

  const [taxInput, setTaxInput] = useState<string>("");
  const [tipInput, setTipInput] = useState<string>("");

  const [peopleList, setPeopleList] = useState<string[]>([]);
  const [itemList, setItemList] = useState<BillItem[]>([]);

  return {
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
  };
}
