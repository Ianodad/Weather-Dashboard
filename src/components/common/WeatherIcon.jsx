/* eslint-disable react/prop-types */
import React from "react";
import { cn } from "@utils";
export const WeatherIcon = ({
  icon,
  size = "md",
  className: additionalClassName,
}) => {
  let iconSrc;
  switch (icon) {
    case "sunny":
      iconSrc = "https://openweathermap.org/img/wn/01d@2x.png";
      break;
    case "cloudy":
      iconSrc = "https://openweathermap.org/img/wn/02d@2x.png";
      break;
    // Add more cases as needed
    default:
      iconSrc = "https://openweathermap.org/img/wn/11d@2x.png";
  }

  let className;
  switch (size) {
    case "sm":
      className = "h-6 w-6";
      break;
    case "md":
      className = "h-10 w-10";
      break;
    case "lg":
      className = "h-16 w-16";
      break;
    case "xl":
      className = "h-20 w-20 ";
      break;
    case "2xl":
      className = "h-32 w-32 ";
      break;
    case "3xl":
      className = "h-40 w-40 ";
      break;
    default:
      className = "h-10 w-10";
  }

  const finalClassName = additionalClassName
    ? `${className} ${additionalClassName}`.trim()
    : className;
  return (
    <img
      data-testid={`weather-icon-${icon}`}
      src={iconSrc}
      className={finalClassName}
      alt={`Weather icon for ${icon}`}
    />
  );
};
