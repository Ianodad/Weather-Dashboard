import React from "react";
import { Navbar, Sidebar, MainContent } from "@components";

function Dashboard() {
  return (
    <div className="flex flex-col w-screen">
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Navbar />
          <MainContent />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
