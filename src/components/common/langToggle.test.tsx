import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LangToggle } from "./LangToggle";

test("LangToggle changes language when checkbox is toggled", () => {
  const { getByLabelText } = render(<LangToggle />);
  const checkbox = getByLabelText("Toggle language");

  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});
