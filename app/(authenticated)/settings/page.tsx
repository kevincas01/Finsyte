import ProfileInformation from "@/app/Components/Settings/ProfileInformation";
import { getUser } from "@/app/Utils/Actions.ts/auth";
import { getUserInformation } from "@/app/Utils/Actions.ts/profiles";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const userSession = (await getUser()).data.user;

  if (!userSession) {
    redirect("/");
  }
  const profileInfo = (await getUserInformation(userSession.id))?.data;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="font-bold text-3xl">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account preferences and security
          </p>
        </div>
      </div>
      <ProfileInformation profileInfo={profileInfo} />
    </div>
  );
};

export default SettingsPage;
