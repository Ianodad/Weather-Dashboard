/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import useSkySiteStore from "@store";
import { UilSun, UilSunset } from "@iconscout/react-unicons";
import { DateTime } from "luxon";
import { WeatherIcon } from "@components";
import getFormattedWeatherData from "@services/openWeatherServices";
import { FormattedMessage } from "react-intl";
import { cn } from "@utils";
const formatToLocalTime = (
  secs,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a",
  language = "en"
) => DateTime.fromSeconds(secs).setLocale(language).toFormat(format);

const ResponsiveGridLayout = WidthProvider(Responsive);
export const MainContent = () => {
  const [lang, searchQuery, temperature, theme] = useSkySiteStore((state) => [
    state.language,
    state.searchQuery,
    state.temperature,
    state.theme,
  ]);
  // eslint-disable-next-line no-unused-vars
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState("Nairobi");
  const [units, setUnits] = useState(
    temperature === "°F" ? "imperial" : "metric"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      // const message = query.q ? query.q : "current location.";

      try {
        console.log("searchQuery", searchQuery);
        const data = await getFormattedWeatherData({
          ...{ q: searchQuery ? searchQuery : query },
          units,
          ...{ lang: lang == "en" ? "en" : "af" },
        });
        console.log("weather", data);
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [query, units, lang, searchQuery]);

  // add useEffect to listen to theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const responsiveProps = {
    className: "responsive-grid",
    breakpoints: { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 },
    cols: { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 },
    margin: [30, 30],
    layouts: {
      lg: [
        { i: "a", x: 0, y: 0, w: 2, h: 3 },
        { i: "b", x: 2, y: 0, w: 1, h: 4 },
        { i: "c", x: 3, y: 4, w: 1, h: 2 },
      ],
      md: [
        { i: "a", x: 0, y: 0, w: 3, h: 3 },
        { i: "b", x: 0, y: 0, w: 2, h: 4 },
        { i: "c", x: 3, y: 4, w: 1, h: 5 },
      ],
      sm: [
        { i: "a", x: 0, y: 0, w: 3, h: 3 },
        { i: "b", x: 1, y: 0, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      xs: [
        { i: "a", x: 0, y: 0, w: 1, h: 3 },
        { i: "b", x: 1, y: 0, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      xxs: [
        { i: "a", x: 0, y: 0, w: 1, h: 4 },
        { i: "b", x: 1, y: 0, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
    },
  };

  const lightBackGroundColor =
    "bg-gradient-to-tl from-indigo-300 to-yellow-200";
  const darkBackGroundColor = "bg-gradient-to-tl from-neutral-900 to-slate-900";
  return (
    <>
      {isLoading && <LoadingScreen />}
      {isError && <ErrorMessage message={isError} />}
      {weather && !isLoading && !isError && (
        <div
          className={cn("p-4 h-full", {
            [lightBackGroundColor]: theme === "light",
            [darkBackGroundColor]: theme === "dark",
          })}
        >
          <ResponsiveGridLayout {...responsiveProps}>
            <div
              className="h-full w-full bg-blue-500 bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-0 backdrop-saturate-50 backdrop-contrast-100  p-10 rounded-3xl ring-8 ring-white dark:ring-black ring-opacity-40"
              key="a"
            >
              <div className="my-2 text-4xl text-sky-950 dark:text-slate-50">
                <h1>
                  {formatToLocalTime(
                    weather.date,
                    "cccc, dd LLL yyyy' | Local time: 'hh:mm a",
                    lang
                  )}
                </h1>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-6xl font-bold text-sky-950 dark:text-slate-50">
                    {weather.temp.toFixed()}
                    {temperature}
                  </span>
                  <span className="font-semibold mt-1 text-sky-950 dark:text-slate-50">
                    {weather.name}, {weather.country}
                  </span>
                </div>
                <WeatherIcon
                  className="h-36 w-36 fill-current text-sky-950 dark:text-slate-50"
                  icon={weather.icon}
                />
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                <UilSun className="text-sky-950 dark:text-slate-50" />
                <p className="font-light text-sky-950 dark:text-slate-50">
                  <FormattedMessage id="Dashboard.rise" />:{" "}
                  <span className="font-medium ml-1 text-sky-950 dark:text-slate-50">
                    {formatToLocalTime(weather.sunrise, "hh:mm a", lang)}
                  </span>
                </p>
                <p className="font-light text-sky-950 dark:text-slate-50">|</p>

                <UilSunset className="text-sky-950 dark:text-slate-50" />
                <p className="font-light text-sky-950 dark:text-slate-50">
                  <FormattedMessage id="Dashboard.set" />:{" "}
                  <span className="font-medium ml-1">
                    {formatToLocalTime(weather.sunset, "hh:mm a", lang)}
                  </span>
                </p>
                <p className="font-light text-sky-950 dark:text-slate-50">|</p>

                <UilSun className="text-sky-950 dark:text-slate-50" />
                <p className="font-light text-sky-950 dark:text-slate-50">
                  <span className="font-medium ml-1">{`${weather.temp_max.toFixed()}${temperature}`}</span>
                </p>
                <p className="font-light text-sky-950 dark:text-slate-50">|</p>

                <UilSun className="text-sky-950 dark:text-slate-50" />
                <p className="font-light text-sky-950 dark:text-slate-50">
                  <span className="font-medium ml-1">{`${weather.temp_min.toFixed()}${temperature}`}</span>
                </p>
              </div>
              <ForecastComponent
                foreCastsData={weather.hourly}
                temperature={temperature}
              />
            </div>
            <div
              className="h-full w-full bg-blue-500 bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-0 backdrop-saturate-50 backdrop-contrast-100  p-10 rounded-3xl ring-8 ring-white ring-opacity-40"
              key="b"
            >
              <div className="flex flex-col">
                <div className="text-3xl text-sky-950 dark:text-slate-50 text-center font-bold">
                  <h1>5 Days Forecast</h1>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                            <tbody>
                              {weather.daily.map((day, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                      <p className="my-2 text-2xl text-sky-950 dark:text-slate-50">
                                        {day.title}
                                      </p>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                      <WeatherIcon icon={day.icon} size="xl" />
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                      <p className="my-2 text-xl text-sky-950 dark:text-slate-50">
                                        {` ${day.min_temp.toFixed()}${temperature}`}
                                      </p>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 font-semibold">
                                      <p className="my-2 text-xl text-sky-950 dark:text-slate-50">
                                        {`${day.max_temp.toFixed()}${temperature}`}
                                      </p>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResponsiveGridLayout>
        </div>
      )}
    </>
  );
};

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
        <svg
          fill="none"
          className="w-6 h-6 animate-spin"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </svg>

        <div>Loading ...</div>
      </div>
    </div>
  );
};

const ErrorMessage = ({ message }) => {
  console.log(message);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error</strong>{" "}
          <span className="block sm:inline">{message.message}</span>
        </div>
      </div>
    </div>
  );
};
const ForecastComponent = ({ foreCastsData, temperature }) => {
  return (
    <div className="flex justify-between mt-12">
      {foreCastsData.map((data, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="font-semibold text-lg text-sky-950 dark:text-slate-50">
            {`${data.temp.toFixed()}${temperature}`}
          </span>
          <WeatherIcon icon={data.icon} />
          <span className="font-semibold mt-1 text-sm text-sky-950 dark:text-slate-50">
            {data.time.split(" ")[0]}
          </span>
          <span className="text-xs font-semibold text-sky-950 dark:text-slate-50">
            {data.time.split(" ")[1]}
          </span>
        </div>
      ))}
    </div>
  );
};
