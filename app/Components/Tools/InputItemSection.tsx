import { BillItem } from "@/app/Types/tools";
import { useState } from "react";
import TextInput from "../Inputs/TextInput";
import NumberInput from "../Inputs/NumberInput";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
interface ItemInputSectionProps {
  itemList: BillItem[];
  setItemList: React.Dispatch<React.SetStateAction<BillItem[]>>;
  peopleList: string[];
  setBillAmount: React.Dispatch<React.SetStateAction<number | "">>;
}

const ItemInputSection = ({
  itemList,
  setItemList,
  peopleList,
  setBillAmount,
}: ItemInputSectionProps) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState<number | "">("");

  const handlePersonToggle = (itemIndex: number, personName: string) => {
    setItemList((prev) =>
      prev.map((item, idx) => {
        if (idx !== itemIndex) return item;
        const alreadyAssigned = item.assignedTo.includes(personName);
        return {
          ...item,
          assignedTo: alreadyAssigned
            ? item.assignedTo.filter((p) => p !== personName)
            : [...item.assignedTo, personName],
        };
      })
    );
  };

  const handleAddItem = () => {
    if (itemName && itemPrice !== "") {
      setItemList((prev) => [
        ...prev,
        {
          name: itemName.trim(),
          price: Number(itemPrice),
          assignedTo: [],
        },
      ]);
      setBillAmount((prev) => {
        const currentTotal = typeof prev === "number" ? prev : 0;
        const price = typeof itemPrice === "number" ? itemPrice : 0;
        return currentTotal + price;
      });

      setItemName("");
      setItemPrice("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="font-medium text-sm mb-1">Add Item</p>
        <div className="flex gap-2">
          <TextInput
            placeholder="Item name"
            value={itemName}
            onChange={(value) => setItemName(value)}
          />
          <NumberInput
            value={itemPrice}
            onChange={(value) => setItemPrice(Number(value))}
            minValue={0}
            placeHolder="Price"
          />
          <button
            onClick={handleAddItem}
            className="bg-primaryBlue text-white px-3 py-1 rounded-md"
          >
            <AddOutlinedIcon />
          </button>
        </div>
      </div>

      {itemList.map((it, idx) => (
        <div className="bg-gray-50 rounded-md p-2" key={idx}>
          <span className="font-medium flex w-full justify-between items-center">
            <p>{it.name}</p>
            <span className="flex gap-2 items-center">
              <p>${it.price.toFixed(2)}</p>
              <button
                onClick={() => {
                  setBillAmount((prev) => {
                    const currentTotal = typeof prev === "number" ? prev : 0;
                    const price = typeof it.price === "number" ? it.price : 0;
                    return currentTotal - price;
                  });
                  setItemList((prev) =>
                    prev.filter((_, index) => index !== idx)
                  );
                }}
                className={`text-sm `}
              >
                <CloseOutlinedIcon fontSize="small" />
              </button>
            </span>
          </span>

          <div className="flex flex-wrap gap-2">
            {peopleList.map((person) => (
              <button
                key={person}
                onClick={() => handlePersonToggle(idx, person)}
                className={`px-2 py-1 rounded-md text-sm border border-gray-200 ${
                  it.assignedTo.includes(person)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {person}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemInputSection;
