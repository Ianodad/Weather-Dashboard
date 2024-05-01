import { render, test, fireEvent } from "@testing-library/react";
import App from "@/App";
import "@testing-library/jest-dom/extend-expect";
import { it } from "@jest/globals";


it("renders without crashing", () => {
  render(<App />);
});
