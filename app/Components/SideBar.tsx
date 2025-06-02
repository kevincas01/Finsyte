"use client";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GradientButton from "./Buttons/GradientButton";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
    label: "Settings",
    href: "/settings",
    icon: <SettingsOutlinedIcon />,
  },
];

const SideBar = () => {
  const currentPath = usePathname();

  return (
    <div className="sticky top-0 flex flex-col w-50 h-screen border-r border-gray-200">
      <div className="p-5 border-b-gray-200 border-b">
        <h1 className="font-bold text-xl text-primaryBlue">Finsyte</h1>
      </div>
      <div className="p-5 flex flex-1 flex-col gap-3">
        {SideBarItems.map((item) => (
          <div
            key={item.label}
            className={` p-2 rounded-md ${
              currentPath == item.href
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
        <GradientButton text="Sign Out" onClickFunction={() => {}} />
      </div>
    </div>
  );
};

export default SideBar;
