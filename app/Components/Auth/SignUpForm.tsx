"use client";
import { useState } from "react";
import GradientButton from "../Buttons/GradientButton";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";
import GoogleButton from "./GoogleButton";
import { signInUser, signUpUser } from "@/app/Utils/Actions.ts/auth";
import { useSearchParams, useRouter } from "next/navigation";

interface SignUpFormProps {
  onTabSwitch: () => void;
}
const SignUpForm = ({ onTabSwitch }: SignUpFormProps) => {
  const searchParams = useSearchParams();
  const originalRef = searchParams.get("originalRef");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authData = { email, password };
    const signUpResult = await signUpUser(authData);

    if (!signUpResult.success) {
      setErrorMessage(
        "This email is already registered as a user! Try Signing In!"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const signInResult = await signInUser(authData);

    if (!signInResult.success) {
      setErrorMessage(
        signInResult.error || "There was a problem with signing in. Try again!"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    router.push(originalRef ?? "/dashboard");
  };

  return (
    <form className="p-10 flex flex-col gap-4 h-full" onSubmit={handleSignUp}>
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
        required={true}
      />
      <PasswordInput
        value={password}
        onChange={(value) => {
          setPassword(value);
        }}
        required={true}
        name="signup-password"
      />

      <GradientButton type="submit">Sign Up</GradientButton>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
      <div className="flex items-center gap-4 w-full text-gray-500 text-sm">
        <div className="flex-grow border-t border-gray-300" />
        <span className="whitespace-nowrap">Or Continue with</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <GoogleButton />

      <p className="text-center">
        Have an account?
        <button
          type="button"
          className="text-primaryBlue font-medium ml-1 cursor-pointer"
          onClick={onTabSwitch}
        >
          Sign In
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;
