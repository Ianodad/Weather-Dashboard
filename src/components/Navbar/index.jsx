import React, { useEffect, useRef, useState } from "react";
import {
  LangToggle,
  SearchFieldBar,
  ThemeToggle,
  TemperatureToggle,
} from "@components";
import useSkySiteStore from "@store";
import settingsIcon from "/settings.svg";

import { FormattedMessage } from "react-intl";

import Avatar from "react-nice-avatar";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};
export const Navbar = () => {
  const [avatarConfig] = useSkySiteStore((state) => [state.avatar]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  return (
    <header>
      <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
        <div className="flex items-center px-4">
          <button className="text-gray-500 focus:outline-none focus:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <SearchFieldBar />
        </div>
        <div className="flex items-center pr-4 mr-4 space-x-3">
          <LangToggle />
          <Avatar
            className="w-9 h-9"
            {...avatarConfig}
            data-testid={"avatar"}
          />
          <div ref={domNode} className="">
            <div className="relative inline-block">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                  style={{
                    filter:
                      "invert(13%) sepia(46%) saturate(1494%) hue-rotate(170deg) brightness(99%) contrast(96%)",
                  }}
                  src={settingsIcon}
                  alt="Settings"
                  className="w-7 h-7 rounded-full cursor-pointer "
                />
              </button>
              <div
                className={`shadow-1 dark:shadow-box-dark absolute  z-40 mt-2 rounded-md bg-white dark:bg-dark-2 py-[14px] px-5 transition-all ${
                  dropdownOpen
                    ? "top-full opacity-100 visible right-1"
                    : "top-[140%] invisible opacity-0"
                }`}
              >
                <div className="my-3">
                  <ThemeToggle />
                </div>
                <div className="my-3">
                  <TemperatureToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
