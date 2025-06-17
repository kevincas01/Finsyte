import { redirect } from "next/navigation";
import SideBar from "../Components/SideBar";
import { getUser, getUserSession } from "../Utils/Actions.ts/auth";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = (await getUser()).data.user;
  if (!userSession) {
    redirect(`/auth`);
  }

  return (
    <div className="">
      <div className="flex flex-row">
        <SideBar />
        <div className="p-5 flex flex-col flex-1 bg-gray-50 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
