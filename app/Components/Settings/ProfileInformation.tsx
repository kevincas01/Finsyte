"use client";
import { useState } from "react";
import TextInput from "../Inputs/TextInput";
import GradientButton from "../Buttons/GradientButton";
import NeutralButton from "../Buttons/NeutralButton";
import { Profile } from "@/app/Types/profiles";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { updateUserInformation } from "@/app/Utils/Actions.ts/profiles";
interface ProfileInformationProps {
  profileInfo: Profile;
}

const ProfileInformation = ({ profileInfo }: ProfileInformationProps) => {
  const [firstName, setFirstName] = useState(profileInfo.first_name ?? "");
  const [lastName, setLastName] = useState(profileInfo.last_name ?? "");
  const [email, setEmail] = useState(profileInfo.email ?? "");
  const [number, setNumber] = useState(profileInfo.phone_number ?? "");

  const handleSave = async () => {
    const result = await updateUserInformation({
      id: profileInfo.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number:number,
    });

    if (!result.success) {
      console.error("Failed to save profile:", result.error);
    } else {
      console.log("Profile updated successfully!");
    }
  };

  const handleCancel = () => {
    setFirstName(profileInfo.first_name ?? "");
    setLastName(profileInfo.last_name ?? "");
    setEmail(profileInfo.email ?? "");
    setNumber(profileInfo.phone_number ?? "");
  };

  return (
    <div className="flex flex-col gap-5 p-5 bg-white rounded-md border border-gray-200">
      <div className="flex items-center gap-3">
        <PermIdentityOutlinedIcon />
        <h3 className="text-xl font-semibold">Profile Information</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <TextInput
          label="First Name"
          value={firstName}
          onChange={setFirstName}
        />
        <TextInput label="Last Name" value={lastName} onChange={setLastName} />
      </div>
      <TextInput label="Email" value={email} onChange={setEmail} />
      <TextInput label="Number" value={number} onChange={setNumber} />

      <div className="flex flex-row gap-5">
        <GradientButton onClick={handleSave}>Save Changes</GradientButton>
        <span>
          <NeutralButton onClick={handleCancel}>Cancel</NeutralButton>
        </span>
      </div>
    </div>
  );
};

export default ProfileInformation;
