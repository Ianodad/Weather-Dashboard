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
    <header className="border-b-4 border-slate-900 dark:border-slate-50">
      <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 dark:bg-slate-950">
        <div className="flex items-center px-4">
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
                <SettingsIcon className="w-8 h-8 rounded-full fill-blue-950 dark:fill-white" />
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

// eslint-disable-next-line react/prop-types
const SettingsIcon = (props) => {
  return (
    <svg
      width="97"
      height="101"
      viewBox="0 0 97 101"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M81 95H89.7869C93.7213 95 97 91.8182 97 88C97 84.1818 93.7213 81 89.7869 81H81C82.3115 83.0364 83.0984 85.4545 83.0984 88C83.0984 90.5455 82.3115 92.9636 81 95Z" />
      <path d="M48 81H7.09677C3.22581 81 0 84.1818 0 88C0 91.8182 3.22581 95 7.09677 95H48C46.7097 92.9636 45.9355 90.5455 45.9355 88C45.9355 85.4545 46.7097 83.0364 48 81Z" />
      <path d="M53.0769 80.3606C51.7788 82.4375 51 84.9038 51 87.5C51 90.0962 51.7788 92.5625 53.0769 94.6394C55.4135 98.4038 59.6971 101 64.5 101C69.3029 101 73.5865 98.4038 75.9231 94.6394C77.2211 92.5625 78 90.0962 78 87.5C78 84.9038 77.2211 82.4375 75.9231 80.3606C73.5865 76.5962 69.3029 74 64.5 74C59.8269 74 55.5433 76.5962 53.0769 80.3606Z" />
      <path d="M52 59H89.7843C93.7201 59 97 55.5909 97 51.5C97 47.4091 93.7201 44 89.7843 44H52C53.312 46.1818 54.0991 48.7727 54.0991 51.5C54.0991 54.2273 53.312 56.8182 52 59Z" />
      <path d="M20 44H7.28477C3.31126 44 0 47.4091 0 51.5C0 55.5909 3.31126 59 7.28477 59H20C18.6755 56.8182 17.8808 54.2273 17.8808 51.5C17.8808 48.7727 18.543 46.1818 20 44Z" />
      <path d="M24.0769 44.3606C22.7788 46.4375 22 48.9038 22 51.5C22 54.0962 22.7788 56.5625 24.0769 58.6394C26.4135 62.4038 30.6971 65 35.5 65C40.3029 65 44.5865 62.4038 46.9231 58.6394C48.2212 56.5625 49 54.0962 49 51.5C49 48.9038 48.2212 46.4375 46.9231 44.3606C44.5865 40.5962 40.3029 38 35.5 38C30.6971 38 26.5433 40.4663 24.0769 44.3606Z" />
      <path d="M39 6H7.10265C3.22848 6 0 9.40909 0 13.5C0 17.5909 3.22848 21 7.10265 21H39C37.7086 18.8182 36.9338 16.2273 36.9338 13.5C36.9338 10.7727 37.7086 8.18182 39 6Z" />
      <path d="M72 21H89.8385C93.7448 21 97 17.8182 97 14C97 10.1818 93.7448 7 89.8385 7H72C73.3021 9.03636 74.0833 11.4545 74.0833 14C74.0833 16.5455 73.3021 18.9636 72 21Z" />
      <path d="M44.0769 6.36058C42.7788 8.4375 42 10.9038 42 13.5C42 16.0962 42.7788 18.5625 44.0769 20.6394C46.4135 24.4038 50.6971 27 55.5 27C60.3029 27 64.5865 24.4038 66.9231 20.6394C68.2212 18.5625 69 16.0962 69 13.5C69 10.9038 68.2212 8.4375 66.9231 6.36058C64.5865 2.59615 60.4327 0 55.5 0C50.6971 0 46.4135 2.59615 44.0769 6.36058Z" />
    </svg>
  );
};
