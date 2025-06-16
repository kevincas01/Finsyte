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
}

const ItemInputSection = ({
  itemList,
  setItemList,
  peopleList,

}: ItemInputSectionProps) => {
  const [itemNameInput, setItemNameInput] = useState("");
  const [itemPriceInput, setItemPriceInput] = useState<string >("");

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
    if (itemNameInput && itemPriceInput !== "") {
      setItemList((prev) => [
        ...prev,
        {
          name: itemNameInput.trim(),
          price: Number(itemPriceInput),
          assignedTo: [],
        },
      ]);
      setItemNameInput("");
      setItemPriceInput("");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="font-medium text-sm mb-1 text-gray-700">Items ({itemList.length})</p>
        <div className="flex gap-2">
          <TextInput
            placeholder="Item name"
            value={itemNameInput}
            onChange={(value) => setItemNameInput(value)}
          />
          <NumberInput
            value={itemPriceInput}
            onChange={(value) => setItemPriceInput(value)}
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
