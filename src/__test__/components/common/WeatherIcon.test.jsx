/* eslint-disable no-undef */
// WeatherIcon.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { WeatherIcon } from "@/components"; // Adjust the import path based on your file structure
// import { describe, expect, it } from "vitest";

describe("WeatherIcon", () => {
  it("renders correctly with default props", () => {
    render(<WeatherIcon icon="sunny" />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d@2x.png"
    );
    expect(image).toHaveAttribute("alt", "Weather icon for sunny");
    expect(image).toHaveClass("h-10 w-10");
  });

  it("applies size classes correctly", () => {
    const sizes = {
      sm: "h-6 w-6",
      md: "h-10 w-10",
      lg: "h-16 w-16",
      xl: "h-20 w-20",
      "2xl": "h-32 w-32",
      "3xl": "h-40 w-40",
    };

    for (const [size, expectedClass] of Object.entries(sizes)) {
      const iconName = "sunny";
      render(<WeatherIcon icon={iconName} size={size} />);
     const images = screen.getAllByTestId(`weather-icon-${iconName}`);
     const image = images.find((img) => img.className.includes(expectedClass));
     expect(image).toBeInTheDocument();
     expect(image).toHaveClass(expectedClass);
    }
  });

  it("renders with additional className", () => {
    const additionalClassName = "mt-4 rounded-full";
    render(<WeatherIcon icon="sunny" className={additionalClassName} />);
    const image = screen.getByRole("img");
    expect(image).toHaveClass("h-10 w-10", additionalClassName);
  });

  it("renders the correct icon for each weather condition", () => {
    const conditions = {
      sunny: "https://openweathermap.org/img/wn/01d@2x.png",
      cloudy: "https://openweathermap.org/img/wn/02d@2x.png",
      // Add more conditions as you have them in your component
    };

    for (const [condition, expectedSrc] of Object.entries(conditions)) {
      render(<WeatherIcon icon={condition} />);
      const image = screen.getByTestId(`weather-icon-${condition}`);
      expect(image).toHaveAttribute("src", expectedSrc);
      expect(image).toHaveAttribute("alt", `Weather icon for ${condition}`);
    }
  });

  it("renders default icon for unknown conditions", () => {
    render(<WeatherIcon icon="unknown" />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/11d@2x.png"
    );
    expect(image).toHaveAttribute("alt", "Weather icon for unknown");
  });
});
