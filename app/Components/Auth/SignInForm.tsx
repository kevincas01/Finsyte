import GradientButton from "../Buttons/GradientButton";
import PasswordInput from "../Inputs/PasswordInput";
import TextInput from "../Inputs/TextInput";
import GoogleButton from "./GoogleButton";
interface SignInFormProps {
  onTabSwitch: () => void;
}
const SignInForm = ({ onTabSwitch }: SignInFormProps) => {
  const handleSignIn = () => {};
  return (
    <div className="p-10 flex flex-col gap-4 my-auto">
      <div className="text-center">
        <h2 className="font-semibold text-3xl">Sign In</h2>
      </div>

      <TextInput
        label="Email Address"
        placeholder="Enter your email"
        icon="email"
      />
      <PasswordInput />
      <GradientButton text="Sign In" onClickFunction={handleSignIn} />

      <div className="flex items-center gap-4 w-full text-gray-500 text-sm">
        <div className="flex-grow border-t border-gray-300" />
        <span className="whitespace-nowrap">Or Continue with</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <GoogleButton />

      <p className="text-center">
        Don&rsquo;t have an account?
        <button
          className="text-primaryBlue font-medium ml-1 cursor-pointer"
          onClick={onTabSwitch}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default SignInForm;
