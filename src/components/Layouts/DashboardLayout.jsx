/* eslint-disable react/prop-types */

import { Navbar, Sidebar, MainContent, Layout } from "@components";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="flex flex-col w-screen">
      <div className="flex h-screen bg-gray-100">
        {/* <Sidebar /> */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
