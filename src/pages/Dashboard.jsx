import React from "react";
import { Navbar, Sidebar, MainContent } from "@components";

function Dashboard() {
  return (
    <div className="flex flex-col w-screen">
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <MainContent />
      </div>
      <h1 className="text-3xl font-bold underline">dashboardddsdd</h1>
    </div>
  );
}

export default Dashboard;
