import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import RealEstateAgentOutlinedIcon from "@mui/icons-material/RealEstateAgentOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { JSX } from "react";

// Optional: if you want to type input
export type AccountType =
  | "depository"
  | "credit"
  | "loan"
  | "investment"
  | string;

interface AccountMeta {
  icon: JSX.Element;
  color: string;
}

export const getAccountTypeMeta = (type: AccountType): AccountMeta => {
  switch (type) {
    case "depository":
      return {
        icon: <AccountBalanceOutlinedIcon fontSize="inherit" />,
        color: "bg-blue-600",
      };
    case "credit":
      return {
        icon: <CreditScoreOutlinedIcon fontSize="inherit" />,
        color: "bg-purple-600",
      };
    case "loan":
      return {
        icon: <RealEstateAgentOutlinedIcon fontSize="inherit" />,
        color: "bg-yellow-600",
      };
    case "investment":
      return {
        icon: <TrendingUpOutlinedIcon fontSize="inherit" />,
        color: "bg-green-600",
      };
    default:
      return {
        icon: <AccountBalanceOutlinedIcon fontSize="inherit" />,
        color: "bg-gray-400",
      };
  }
};
