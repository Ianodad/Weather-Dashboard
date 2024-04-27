import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import useSkySiteStore from "@store";
import { UilSun, UilSunset } from "@iconscout/react-unicons";
import { DateTime } from "luxon";
import { WeatherIcon } from "@components";
import getFormattedWeatherData from "@services/openWeatherServices";
import { FormattedMessage } from "react-intl";

const formatToLocalTime = (
  secs,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a",
  language = "en"
) => DateTime.fromSeconds(secs).setLocale(language).toFormat(format);

const ResponsiveGridLayout = WidthProvider(Responsive);
export const MainContent = () => {
  const [lang] = useSkySiteStore((state) => [state.language]);
  // eslint-disable-next-line no-unused-vars
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState({ q: "Nairobi" });
  const [units, setUnits] = useState("metric");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      // const message = query.q ? query.q : "current location.";

      try {
        const data = await getFormattedWeatherData({
          ...query,
          units,
          ...{ lang: lang == "en" ? "en" : "af" },
        });
        console.log("weather", data);
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [query, units, lang]);

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
        { i: "a", x: 0, y: 0, w: 2, h: 3 },
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

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {weather && !isLoading && (
        <div className="bg-gradient-to-tl  from-indigo-300 to-yellow-200 p-4 h-full">
          <ResponsiveGridLayout {...responsiveProps}>
            <div
              className="h-full w-full bg-blue-500 bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-0 backdrop-saturate-50 backdrop-contrast-100  p-10 rounded-3xl ring-8 ring-white ring-opacity-40"
              key="a"
            >
              <div className="my-2 text-4xl text-sky-950">
                <h1>
                  {formatToLocalTime(weather.date, "cccc, dd LLL yyyy", lang)}
                </h1>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-6xl font-bold text-sky-950">
                    {weather.temp.toFixed()}°C
                  </span>
                  <span className="font-semibold mt-1 text-sky-950">
                    {weather.name}, {weather.country}
                  </span>
                </div>
                <WeatherIcon
                  className="h-36 w-36 fill-current text-sky-950"
                  icon={weather.icon}
                />
              </div>
              <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
                <UilSun className="text-sky-950" />
                <p className="font-light text-sky-950">
                  <FormattedMessage id="Dashboard.rise" />:{" "}
                  <span className="font-medium ml-1 text-sky-950">
                    {formatToLocalTime(weather.sunrise, "hh:mm a", lang)}
                  </span>
                </p>
                <p className="font-light text-sky-950">|</p>

                <UilSunset className="text-sky-950" />
                <p className="font-light text-sky-950">
                  <FormattedMessage id="Dashboard.set" />:{" "}
                  <span className="font-medium ml-1">
                    {formatToLocalTime(weather.sunset, "hh:mm a", lang)}
                  </span>
                </p>
                <p className="font-light text-sky-950">|</p>

                <UilSun className="text-sky-950" />
                <p className="font-light text-sky-950">
                  <span className="font-medium ml-1">{`${weather.temp_max.toFixed()}°C`}</span>
                </p>
                <p className="font-light text-sky-950">|</p>

                <UilSun className="text-sky-950" />
                <p className="font-light text-sky-950">
                  <span className="font-medium ml-1">{`${weather.temp_min.toFixed()}°C`}</span>
                </p>
              </div>
              {/* <ForecastComponent /> */}
            </div>
            {/* <div
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
                    <span className="text-6xl font-bold text-sky-950">
                      29°C
                    </span>
                    <span className="font-semibold mt-1 text-sky-950">
                      Mudjimba, QLD
                    </span>
                  </div>
                  <div className="w-1/3 border-l border-sky-950 my-auto"></div>
                  <div className="flex flex-col">
                    <WeatherIcon icon="sunny " size="3xl" />
                    <span className="text-6xl font-bold text-sky-950">
                      29°C
                    </span>
                    <span className="font-semibold mt-1 text-sky-950">
                      Mudjimba, QLD
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div
              className="h-full w-full bg-blue-500 bg-clip-padding backdrop-filter  backdrop-blur-sm bg-opacity-0 backdrop-saturate-50 backdrop-contrast-100  p-10 rounded-3xl ring-8 ring-white ring-opacity-40"
              key="c"
            >
              c
            </div> */}
          </ResponsiveGridLayout>
        </div>
      )}
    </>
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
