import "@testing-library/jest-dom/vitest";
import "@testing-library/jest-dom";
import matchers from "@testing-library/jest-dom/matchers";

import { cleanup } from "@testing-library/react";
import { afterEach, vi, expect } from "vitest";

// expect.extend(matchers);

afterEach(() => {
  cleanup();
});

vi.mock("zustand");