import React from "react";

// Admin Imports
import UserDashboard from "views/admin/userdashboard";
import AdminDashboard from "views/admin/admindashboard";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import Chats from "views/admin/chats";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "User Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <UserDashboard />,
  },
  {
    name: "Admin Dashboard",
    layout: "/admin",
    path: "admin-dashboard",
    icon: <MdOutlineBallot className="h-6 w-6" />,
    component: <AdminDashboard />,
  },
  {
    name: "Messages",
    layout: "/admin",
    path: "messages",
    icon: <MdRateReview className="h-6 w-6" />,
    component: <Chats />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },
];
export default routes;
