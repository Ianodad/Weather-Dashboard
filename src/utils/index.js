import { twMerge } from "tailwind-merge";

import { clsx } from "clsx";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const getWindowItem = (id) => {
  const item =
    window.localStorage.getItem(id) &&
    window.localStorage.getItem(id).toString() !== "null"
      ? window.localStorage.getItem(id)
      : null;
  try {
    const result = JSON.parse(item);
    return result;
  } catch {
    return item;
  }
};

export const setWindowItem = (id, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(id, value);
};
