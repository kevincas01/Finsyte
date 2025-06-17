"use client";
import { useState } from "react";
import GradientButton from "../Buttons/GradientButton";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";
import GoogleButton from "./GoogleButton";
import { signInUser } from "@/app/Utils/Actions.ts/auth";
import { useRouter, useSearchParams } from "next/navigation";
interface SignInFormProps {
  onTabSwitch: () => void;
}
const SignInForm = ({ onTabSwitch }: SignInFormProps) => {
  const searchParams = useSearchParams();
  const originalRef = searchParams.get("originalRef");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authData = { email, password };

    const signInResult = await signInUser(authData);

    if (!signInResult.success) {
      setErrorMessage(
        signInResult.error || "There was a problem with signing in. Try again!"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return
    }
    router.push(originalRef ?? "/dashboard");
  };

  return (
    <form className="p-10 flex flex-col gap-4 h-full" onSubmit={handleSignIn}>
      <div className="text-center">
        <h2 className="font-semibold text-3xl">Sign In</h2>
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
        name="signin-password"
      />
      <GradientButton type="submit">
        <p>Sign In</p>
      </GradientButton>

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
        Don&rsquo;t have an account?
        <button
          type="button"
          className="text-primaryBlue font-medium ml-1 cursor-pointer"
          onClick={onTabSwitch}
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default SignInForm;
