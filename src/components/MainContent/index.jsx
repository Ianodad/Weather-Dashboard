import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import useSkySiteStore from "@store";
import { UilSun, UilSunset } from "@iconscout/react-unicons";
import { DateTime } from "luxon";
import { WeatherIcon } from "@components";

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const ResponsiveGridLayout = WidthProvider(Responsive);
export const MainContent = () => {
  const [state] = useSkySiteStore((state) => [state]);
  // eslint-disable-next-line no-unused-vars
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const responsiveProps = {
    className: "responsive-grid",
    breakpoints: { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 },
    cols: { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 },
    margin: [30, 30],
    layouts: {
      lg: [
        { i: "a", x: 0, y: 0, w: 2, h: 3 },
        { i: "b", x: 3, y: 4, w: 1, h: 2 },
        { i: "c", x: 2, y: 0, w: 1, h: 2 },
      ],
      md: [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 3, y: 4, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      sm: [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      xs: [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      xxs: [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      // More layouts for other breakpoints...
    },
  };
  console.log(state);
  return (
    <div className="bg-gradient-to-tl  from-indigo-300 to-yellow-200 p-4 h-full">
      <ResponsiveGridLayout {...responsiveProps}>
        <div
          className="h-full w-full bg-blue-500 bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-0 backdrop-saturate-50 backdrop-contrast-100  p-10 rounded-3xl ring-8 ring-white ring-opacity-40"
          key="a"
        >
          <div className="my-2 text-4xl text-sky-950">
            <h1>Tuesday, 31 May 2024 | Local Time 01:10</h1>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-6xl font-bold text-sky-950">29°C</span>
              <span className="font-semibold mt-1 text-sky-950">
                Mudjimba, QLD
              </span>
            </div>
            <svg
              className="h-24 w-24 fill-current text-sky-950"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z" />
            </svg>
          </div>
          <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
            <UilSun className="text-sky-950" />
            <p className="font-light text-sky-950">
              Rise:{" "}
              <span className="font-medium ml-1 text-sky-950">
                06:45 AM
                {/* {formatToLocalTime(sunrise, timezone, "hh:mm a")} */}
              </span>
            </p>
            <p className="font-light text-sky-950">|</p>

            <UilSunset className="text-sky-950" />
            <p className="font-light text-sky-950">
              Set:{" "}
              <span className="font-medium ml-1">
                {/* {formatToLocalTime(sunset, timezone, "hh:mm a")} */}
                07:45 PM
              </span>
            </p>
            <p className="font-light text-sky-950">|</p>

            <UilSun className="text-sky-950" />
            <p className="font-light text-sky-950">
              High: 45°C
              {/* <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span> */}
            </p>
            <p className="font-light text-sky-950">|</p>

            <UilSun className="text-sky-950" />
            <p className="font-light text-sky-950">
              Low: 40°C
              {/* <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span> */}
            </p>
          </div>
          <ForecastComponent />
        </div>
        <div
          className="h-full w-full bg-blue-500 bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-0 backdrop-saturate-50 backdrop-contrast-100  p-10 rounded-3xl ring-8 ring-white ring-opacity-40"
          key="b"
        >
          <div className="flex flex-col">
            <div className=" text-4xl text-sky-950">
              <h1>Tomorrow</h1>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <WeatherIcon icon="sunny " size="3xl" />
                <span className="text-6xl font-bold text-sky-950">29°C</span>
                <span className="font-semibold mt-1 text-sky-950">
                  Mudjimba, QLD
                </span>
              </div>
              <div className="w-1/3 border-l border-sky-950 my-auto"></div>
              <div className="flex flex-col">
                <WeatherIcon icon="sunny " size="3xl" />
                <span className="text-6xl font-bold text-sky-950">29°C</span>
                <span className="font-semibold mt-1 text-sky-950">
                  Mudjimba, QLD
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="h-full w-full bg-blue-500 bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-0 backdrop-saturate-50 backdrop-contrast-100  p-10 rounded-3xl ring-8 ring-white ring-opacity-40"
          key="c"
        >
          c
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

const forecastData = [
  { temperature: "29°C", time: "11:00 AM", icon: "sunny" },
  { temperature: "31°C", time: "1:00 PM", icon: "sunny" },
  { temperature: "32°C", time: "3:00 PM", icon: "sunny" },
  { temperature: "31°C", time: "5:00 PM", icon: "sunny" },
  { temperature: "27°C", time: "7:00 PM", icon: "cloudy" },
];
const ForecastComponent = () => {
  return (
    <div className="flex justify-between mt-12">
      {forecastData.map((data, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="font-semibold text-lg text-sky-950">
            {data.temperature}
          </span>
          <WeatherIcon icon={data.icon} />
          <span className="font-semibold mt-1 text-sm text-sky-950">
            {data.time.split(" ")[0]}
          </span>
          <span className="text-xs font-semibold text-sky-950">
            {data.time.split(" ")[1]}
          </span>
        </div>
      ))}
    </div>
  );
};
