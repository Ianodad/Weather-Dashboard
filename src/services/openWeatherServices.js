const VITE_OPEN_WEATHER_API = import.meta.env.VITE_OPEN_WEATHER_API;
const BASE_URL = "https://api.openweathermap.org/data";
import axios from "axios";
import { DateTime } from "luxon";

const getWeatherData = async (infoType, searchParams, version = "2.5") => {
  const url = `${BASE_URL}/${version}/${infoType}`;
  try {
    const response = await axios.get(url, {
      params: {
        ...searchParams,
        appid: VITE_OPEN_WEATHER_API,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    // Fetching the current weather data and formatting it
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    // Fetching the forecast weather data and formatting it
    // const formattedForecastWeather = {};
    const formattedForecastWeather = await getWeatherData(
      "onecall",
      {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
      },
      "3.0"
    ).then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error getting formatted weather data", error);
    throw error;
  }
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon, description } = weather[0];

  return {
    lat,
    lon,
    temp,
    description,
    feels_like,
    timezone,
    temp_min,
    temp_max,
    humidity,
    name,
    date: dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
      min_temp: d.temp.min,
      max_temp: d.temp.max,
      description: d.summary,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: d.weather[0].main,
      time: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
      description: d.weather[0].description,
    };
  });

  return { timezone, daily, hourly };
};

export default getFormattedWeatherData;
