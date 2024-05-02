/* eslint-disable no-undef */
import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LangToggle } from "@/components";
import useSkySiteStore from "@store";

// Mock the Zustand store
vi.mock("@store", () => ({
  __esModule: true,
  default: vi.fn(() => [
    "en", // default language
    vi.fn(), // mock setLanguage function
  ]),
}));

describe("LangToggle Component", () => {
  let setLanguageMock;

  beforeEach(() => {
    // Reset the mock before each test
    setLanguageMock = vi.fn();
    vi.mocked(useSkySiteStore).mockImplementation(() => [
      "en",
      setLanguageMock,
    ]);
  });

  it("should toggle language on checkbox change", async () => {
    render(<LangToggle />);
    const isChecked = screen.getByRole("checkbox").checked;
    // Initial state checks
    console.log("isCheckedBefore", isChecked);

    expect(screen.getByRole("checkbox")).not.toBeChecked();
    // expect(isChecked).toBeFalsy();

    // Simulate user action
    fireEvent.click(screen.getByRole("checkbox"));
    // reload component

    // Expect the setLanguageMock to have been called once after change
    expect(setLanguageMock).toHaveBeenCalledTimes(1);
    // console.log("setLanguageMock", setLanguageMock.mockReturnValue());
  });
});
