"use client";

import { useState } from "react";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthPanel = () => {
  const [isSigninTab, setIsSigninTab] = useState(true);
  const onTabSwitch = () => {
    setIsSigninTab((prev) => !prev);
  };

  return (
    <div className=" max-w-[800px] rounded-md shadow-main relative overflow-hidden h-120">
      <div
        className={`md:absolute h-300 w-200 bg-gradient-to-b from-primaryGreen from-10% via-primaryBlue to-90% to-primaryGreen z-10 transition-transform duration-2000 ease-in-out
          ${
            isSigninTab
              ? "translate-x-[-29rem] translate-y-[-22.5rem] rotate-[10deg]"
              : "translate-x-[24rem] translate-y-[-22.5rem] rotate-[170deg]"
          }`}
      ></div>

      <div className="w-full h-full flex flex-col md:flex-row">
        <div
          className={`p-10 md:text-white my-auto text-left w-100 ${
            isSigninTab
              ? "opacity-100 z-20 delay-1300 translate-0"
              : "opacity-0 z-10 -translate-x-[20rem]"
          } transition-all duration-500`}
        >
          <h1 className="font-semibold text-4xl">Finsyte</h1>
          <p className="w-[80%] font-semibold text-sm">
            Welcome back to your personal finance command center. Dive back into
           keeping your finances running smoothly.
          </p>
        </div>
        <div
          className={`${
            isSigninTab
              ? "opacity-100 z-20 delay-1300 translate-x-0"
              : "opacity-0 z-10 translate-x-[20rem]"
          } transition-all duration-500`}
        >
          <SignInForm onTabSwitch={onTabSwitch} />
        </div>
      </div>

      <div className="w-full h-full flex flex-col md:flex-row absolute inset-0">
        <div
          className={`${
            isSigninTab
              ? "opacity-0 z-10 -translate-x-[20rem]"
              : "z-20 opacity-100 delay-1300 translate-x-0"
          } transition-all duration-500`}
        >
          <SignUpForm onTabSwitch={onTabSwitch} />
        </div>
        <div
          className={`p-10 md:text-white my-auto text-right w-100 ${
            isSigninTab
              ? "opacity-0 z-10 translate-x-[20rem]"
              : "z-20 opacity-100 delay-1300 translate-x-0"
          } transition-all duration-500`}
        >
          <h1 className="font-semibold text-4xl">Finsyte</h1>
          <p className="w-[80%] font-semibold text-sm ml-auto">
            Join others using Finsyte as their personal finance command center and start managing your money with clarity and
            ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
