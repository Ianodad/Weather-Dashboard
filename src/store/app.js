import { getWindowItem, setWindowItem } from "@utils";

// export const APP_INITIAL_STATE = {
//   avatar: "",
//   userName: "",
//   currentNavigation: "",
//   darkMode: false,
//   language: getWindowItem("language") ? getWindowItem("language") : null,
// };

const appStore = (set, get) => ({
  avatar: "",
  userName: "",
  currentNavigation: "",
  darkMode: false,
  language: getWindowItem("language") ? getWindowItem("language") : "en",
  setAvatar: {},
  setUserName: {},
  setDarkMode: {},
  setLanguage: () => {
    set((state) => {
      state.language = state.language === "en" ? "sw" : "en";
      setWindowItem("language", state.language);
    });
  },
});

export default appStore;
