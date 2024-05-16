import { expect } from "vitest";
import { test } from "vitest";
import { useSkySiteStore } from "@store";
import { useEffect } from "react";
import { vi } from "vitest";
import { render } from "@testing-library/react";


function TestComponent({ selector, effect }) {
  const items = useSkySiteStore(selector);
  useEffect(() => effect(items), [items]);
  return null;
}

test("sample", () => {
  expect(1).toEqual(1);
});

test("should return default value at the start", () => {
  const selector = (store) => store.avatar;
  const effect = vi.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});

import create from "zustand";
import appStore from "./app";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the utility functions used in the store
vi.mock("@utils", () => ({
  getWindowItem: vi.fn(),
  setWindowItem: vi.fn(),
  generateUsername: vi.fn(() => "TestUser"),
  generatorAvatar: vi.fn(() => "TestAvatar"),
}));

const {
  getWindowItem,
  setWindowItem,
  generateUsername,
  generatorAvatar,
} = require("@utils");

describe("appStore", () => {
  let useStore;

  beforeEach(() => {
    // Ensure each test starts with a fresh Zustand store
    useStore = create(appStore);

    // Clear all instances and calls to constructor and all methods
    getWindowItem.mockClear();
    setWindowItem.mockClear();
    generateUsername.mockClear();
    generatorAvatar.mockClear();
  });

  it("should initialize state correctly", () => {
    getWindowItem.mockImplementation((key) => {
      switch (key) {
        case "avatar":
          return "StoredAvatar";
        case "userName":
          return "StoredUserName";
        case "theme":
          return "dark";
        case "language":
          return "sw";
        case "temperature":
          return "°F";
        default:
          return null;
      }
    });

    const store = useStore.getState();

    expect(store.avatar).toBe("StoredAvatar");
    expect(store.userName).toBe("StoredUserName");
    expect(store.theme).toBe("dark");
    expect(store.language).toBe("sw");
    expect(store.temperature).toBe("°F");
    expect(store.searchQuery).toBe("");
  });

  it("should toggle theme", () => {
    const store = useStore.getState();

    store.setTheme();

    expect(store.theme).toBe("dark");
    expect(setWindowItem).toHaveBeenCalledWith("theme", "dark");

    store.setTheme();

    expect(store.theme).toBe("light");
    expect(setWindowItem).toHaveBeenCalledWith("theme", "light");
  });

  it("should toggle language", () => {
    const store = useStore.getState();

    store.setLanguage();

    expect(store.language).toBe("sw");
    expect(setWindowItem).toHaveBeenCalledWith("language", "sw");

    store.setLanguage();

    expect(store.language).toBe("en");
    expect(setWindowItem).toHaveBeenCalledWith("language", "en");
  });

  it("should set search query", () => {
    const store = useStore.getState();

    store.setSearchQuery("Test Query");

    expect(store.searchQuery).toBe("Test Query");
  });

  it("should toggle temperature unit", () => {
    const store = useStore.getState();

    store.setTemperature();

    expect(store.temperature).toBe("°F");
    expect(setWindowItem).toHaveBeenCalledWith("temperature", "°F");

    store.setTemperature();

    expect(store.temperature).toBe("°C");
    expect(setWindowItem).toHaveBeenCalledWith("temperature", "°C");
  });
});


// test("should add an items to the store and rerun the effect", () => {
//   const selector = (store) => ({ tasks: store.tasks, addTask: store.addTask });
//   const effect = vi.fn().mockImplementation((items) => {
//     if (items.tasks.length === 0) {
//       items.addTask("test", "todo", 1);
//     }
//   });
//   render(<TestComponent selector={selector} effect={effect} />);
//   expect(effect).toHaveBeenCalledTimes(2);
//   expect(effect).toHaveBeenCalledWith(
//     expect.objectContaining({
//       tasks: [{ title: "test", state: "todo", id: 1 }],
//     })
//   );
// });

// test("should add an items to the store and then delete it", () => {
//   const selector = (store) => ({
//     tasks: store.tasks,
//     addTask: store.addTask,
//     deleteTask: store.deleteTask,
//   });

//   let createdTask = false;
//   let currentItems;
//   const effect = vi.fn().mockImplementation((items) => {
//     currentItems = items;
//     if (!createdTask) {
//       items.addTask("test", "todo", 1);
//       createdTask = true;
//     } else if (items.tasks.length === 1) {
//       items.deleteTask(1);
//     }
//   });

//   render(<TestComponent selector={selector} effect={effect} />);
//   expect(effect).toHaveBeenCalledTimes(3);
//   expect(currentItems.tasks).toEqual([]);
// });