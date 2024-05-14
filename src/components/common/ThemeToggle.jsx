import React, { useEffect, useState } from "react";
import useSkySiteStore from "@store";
import darkTheme from "/dark_theme.svg";
import lightTheme from "/light_theme.svg";
import { cn } from "@utils";
export const ThemeToggle = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme, setTheme } = useSkySiteStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));
  const [isChecked, setIsChecked] = useState(theme === "dark");

  const handleCheckboxChange = () => {
    console.log("hello");
    setTheme();
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
            data-testid="language-toggle-checkbox"
          />
          <div
            className={cn(
              "block h-8 w-14 rounded-full bg-gray-300 text-center",
              {
                "bg-gray-700": isChecked,
              }
            )}
          ></div>
          <div
            className={cn(
              "dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full  transition",
              {
                "bg-black": isChecked,
                "bg-white": !isChecked,
              }
            )}
          >
            <span className="inactive ">
              <img src={lightTheme} width="42" height="14" alt="notChecked" />
            </span>
            <span className="active hidden text-gray-700">
              <img src={darkTheme} width="42" height="14" alt="Checked" />
            </span>
          </div>
        </div>
      </label>
    </>
  );
};
