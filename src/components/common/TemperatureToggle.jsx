import React, { useEffect, useState } from "react";
import useSkySiteStore from "@store";
import fahrenheit from "/fahrenheit.svg";
import celsius from "/celsius.svg";
import { cn } from "@utils";
export const TemperatureToggle = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { temperature, setTemperature } = useSkySiteStore((state) => ({
    temperature: state.temperature,
    setTemperature: state.setTemperature,
  }));
  const [isChecked, setIsChecked] = useState(temperature === "°F");

  const handleCheckboxChange = () => {
    console.log("hello");
    setTemperature();
    setIsChecked(!isChecked);
    // useSkySiteStore.setState({ language: language === "en" ? "sw" : "en" });
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
            data-testid="temperature-toggle-checkbox"
          />
          <div
            className={cn(
              "block h-8 w-14 rounded-full bg-gray-300 text-center",
              {
                "bg-gray-700": isChecked,
              }
            )}
          >
            {/* {theme == "dark" && (
              <span className="inline-block align-middle text-black float-left mt-1 ml-1">
                dark
              </span>
            )}
            {theme == "light" && (
              <span className="inline-block align-middle text-black float-right mt-1 mr-1">
                Light
              </span>
            )} */}
          </div>
          <div
            className={cn(
              "dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full  transition bg-white"
              // {
              //   "bg-black": isChecked,
              //   "bg-white": !isChecked,
              // }
            )}
          >
            <span className="inactive ">
              <img src={celsius} width="18" height="14" alt="notChecked" />
            </span>
            <span className="active hidden text-gray-700">
              <img src={fahrenheit} width="18" height="14" alt="Checked" />
            </span>
          </div>
        </div>
      </label>
    </>
  );
};
