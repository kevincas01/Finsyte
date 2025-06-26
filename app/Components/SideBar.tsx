"use client";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import GradientButton from "./Buttons/GradientButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOutUser } from "../Utils/Actions.ts/auth";
const SideBarItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    label: "Accounts",
    href: "/accounts",
    icon: <AccountBalanceOutlinedIcon />,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: <AttachMoneyOutlinedIcon />,
  },
  {
    label: "Budgets",
    href: "/budgets",
    icon: <PieChartOutlineOutlinedIcon />,
  },
  {
    label: "Goals",
    href: "/goals",
    icon: <TrackChangesOutlinedIcon />,
  },
  {
    label: "Recurring",
    href: "/recurring",
    icon: <CalendarTodayOutlinedIcon />,
  },
  {
    label: "Tools",
    href: "/tools",
    icon: <BuildOutlinedIcon />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <SettingsOutlinedIcon />,
  },
];

const SideBar = () => {
  const currentPath = usePathname();
  const paths = currentPath.split("/");
;

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <div className="sticky top-0 flex flex-col min-w-60 h-screen border-r border-gray-200">
      <div className="p-5 border-b-gray-200 border-b">
        <h1 className="font-bold text-xl text-primaryBlue">Finsyte</h1>
      </div>
      <div className="p-5 flex flex-1 flex-col gap-3">
        {SideBarItems.map((item) => (
          <div
            key={item.label}
            className={` p-2 rounded-md ${
              `/${paths[1]}` === item.href
                ? "bg-primaryBlue/10 border border-primaryBlue/50 text-primaryBlue"
                : " hover:bg-gray-100 hover:text-black text-gray-600"
            } font-medium  cursor-pointer flex flex-row items-center gap-2`}
          >
            <Link href={item.href}>
              {item.icon} {item.label}
            </Link>
          </div>
        ))}
      </div>
      <div className="p-5 w-full flex flex-col ">
        <GradientButton onClick={handleSignOut}>
          <p>Sign Out</p>
        </GradientButton>
      </div>
    </div>
  );
};

export default SideBar;
