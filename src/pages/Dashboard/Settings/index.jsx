import React from "react";
import useSkySiteStore from "@store";
import { LangToggle, ThemeToggle, TemperatureToggle } from "@components";
function Settings() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-blue-500 text-black bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-0 backdrop-saturate-50 backdrop-contrast-100  p-10 rounded-3xl ring-8 ring-white ring-opacity-40 w-1/3">
        <h1 className="text-3xl text-blue-800 text-center font-semibold	mb-6">
          Settings
        </h1>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-row align-middle justify-between">
            <p className="font-semibold text-xl	">Language</p>
            <LangToggle />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <p className="font-semibold text-xl	">Theme</p>
            <ThemeToggle />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <p className="font-semibold text-xl	">Temperature</p>
            <TemperatureToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
