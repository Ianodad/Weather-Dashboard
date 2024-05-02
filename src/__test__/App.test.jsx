/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";

import App from "@/App";
describe("suite name", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
  it("renders Vite and React logos", () => {
    render(<App />);
    const viteLogoElement = screen.getByAltText("Vite logo");
    const reactLogoElement = screen.getByAltText("React logo");
    expect(viteLogoElement).toBeInTheDocument();
    expect(reactLogoElement).toBeInTheDocument();
  });

  it("renders heading", () => {
    render(<App />);
    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Vite + React");
  });

  it("increments count on button click", () => {
    render(<App />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("count is 0");

    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent("count is 1");

    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent("count is 2");
  });
  it("renders instructions for learning more", () => {
    render(<App />);
    const instructionsElement = screen.getByText(
      /Click on the Vite and React logos to learn more/i
    );
    expect(instructionsElement).toBeInTheDocument();
  });
});
