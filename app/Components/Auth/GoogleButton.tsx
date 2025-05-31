import Image from "next/image";

const GoogleButton = () => {
  const handleGoogleSignIn = () => {};
  return (
    <button
      type="button"
      className="cursor-pointer w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150"
      onClick={handleGoogleSignIn}
    >
      <Image src="/google.svg" alt="Google logo" width={20} height={20} />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
