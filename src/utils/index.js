import { twMerge } from "tailwind-merge";

import { clsx } from "clsx";
import { genConfig } from "react-nice-avatar";

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

export const removeWindowItem = (id) => {
  window.localStorage.removeItem(id);
};

//username random generator i.e user4321
export const generateUsername = () => {
  const randomId = Math.floor(Math.random() * 100000) + 1;
  return `user${randomId.toString().padStart(5, "0")}`;
};

export const generatorAvatar = () => {
  const avatarConfig = genConfig();
  setWindowItem("avatar", avatarConfig);
  return avatarConfig;
};
