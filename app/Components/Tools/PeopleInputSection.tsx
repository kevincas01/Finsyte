import { useState } from "react";
import TextInput from "../Inputs/TextInput";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
interface PeopleInputSectionProps {
  peopleList: string[];
  setPeopleList: React.Dispatch<React.SetStateAction<string[]>>;
}

const PeopleInputSection = ({
  peopleList,
  setPeopleList,
}: PeopleInputSectionProps) => {
  const [personName, setPersonName] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="font-medium text-sm mb-1">People</p>
        <div className="flex gap-2">
          <TextInput
            placeholder="Enter person's name"
            value={personName}
            onChange={(value) => setPersonName(value)}
          />
          <button
            onClick={() => {
              if (personName.trim()) {
                setPeopleList((prev) => [...prev, personName.trim()]);
                setPersonName("");
              }
            }}
            className="bg-primaryBlue text-white px-3 rounded-md cursor-pointer"
          >
            <AddOutlinedIcon />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {peopleList.map((p, idx) => (
          <div className="bg-gray-50 rounded-md p-2" key={idx}>
            
            <span className="flex gap-2 w-full justify-between items-center">
              <p>{p}</p>
              <button
                onClick={() => {
                    setPeopleList((prev) =>
                        prev.filter((_, index) => index !== idx)
                      );
                 
                }}
                className={`text-sm `}
              >
                <CloseOutlinedIcon fontSize="small" />
              </button>
            </span>
          </div>

        ))}
      </div>
    </div>
  );
};

export default PeopleInputSection;
