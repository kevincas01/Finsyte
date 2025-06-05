"use client";
import { useState } from "react";
import GradientButton from "../Buttons/GradientButton";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";
import GoogleButton from "./GoogleButton";
interface SignUpFormProps {
  onTabSwitch: () => void;
}
const SignUpForm = ({ onTabSwitch }: SignUpFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log({ email, password });
  };
  return (
    <div className="p-10 flex flex-col gap-4 my-auto">
      <div className="text-center">
        <h2 className="font-semibold text-3xl">Sign Up</h2>
      </div>

      <TextInput
        label="Email Address"
        placeholder="Enter your email"
        icon="email"
        value={email}
        onChange={(value) => {
          setEmail(value);
        }}
      />
      <PasswordInput
        value={password}
        onChange={(value) => {
          setPassword(value);
        }}
      />
      
      <GradientButton onClick={handleSignIn}>Sign Up</GradientButton>

      <div className="flex items-center gap-4 w-full text-gray-500 text-sm">
        <div className="flex-grow border-t border-gray-300" />
        <span className="whitespace-nowrap">Or Continue with</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <GoogleButton />

      <p className="text-center">
        Have an account?
        <button
          className="text-primaryBlue font-medium ml-1 cursor-pointer"
          onClick={onTabSwitch}
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;
