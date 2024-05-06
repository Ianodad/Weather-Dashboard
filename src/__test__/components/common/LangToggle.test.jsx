// LangTogggle.test.jsx
/* eslint-disable no-undef */
import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LangToggle } from "@/components";
import useSkySiteStore from "@store";

// Mock the Zustand store
vi.mock("@store", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    language: "en", // default language
    setLanguage: vi.fn((languae) => {
      useSkySiteStore().language =
        useSkySiteStore().language === "en" ? "sw" : "en";
    }), // mock setLanguage function
  })),
}));

describe("LangToggle Component", () => {
  beforeEach(() => {
    render(<LangToggle />);
  });

  it("should toggle language on checkbox change", async () => {
    const initialLanguage = useSkySiteStore().language;
    const checkbox = screen.getByTestId("language-toggle-checkbox");
    expect(checkbox).not.toBeChecked();

    // Trigger the async action through the component (e.g., by clicking the checkbox)
    await act(async () => {
      fireEvent.click(checkbox);
    });
    console.log(checkbox.checked);
    console.log(useSkySiteStore().language);
    expect(checkbox).toBeChecked();
    console.log("initialLanguage", initialLanguage);
    // Assert that the setLanguage function was called with the expected argument
    // expect(useSkySiteStore().language).toBe("sw");
  });
});
