import {
  getWindowItem,
  setWindowItem,
  generateUsername,
  generatorAvatar,
} from "@utils";

// eslint-disable-next-line no-unused-vars
const appStore = (set, get) => ({
  avatar: getWindowItem("avatar") ? getWindowItem("avatar") : null,
  userName: getWindowItem("userName")
    ? getWindowItem("userName")
    : generateUsername(),
  currentNavigation: "",
  theme: getWindowItem("theme") ? getWindowItem("theme") : "light",
  language: getWindowItem("language") ? getWindowItem("language") : "en",
  temperature: getWindowItem("temperature")
    ? getWindowItem("temperature")
    : "°C",
  searchQuery: "",
  // setAvatar: () => {
  //   set((state) => {
  //     state.avatar = generatorAvatar();
  //     setWindowItem("avatar", state.avatar);
  //   });
  // },
  setUserName: {},
  setLanguage: () => {
    set((state) => {
      console.log("language", state.language);
      state.language = state.language === "en" ? "sw" : "en";
      setWindowItem("language", state.language);
      console.log("language", state.language);
    });
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
  setTheme: () => {
    set((state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      setWindowItem("theme", state.theme);
    });
  },
  setTemperature: () => {
    set((state) => {
      state.temperature = state.temperature === "°F" ? "°C" : "°F";
      setWindowItem("temperature", state.temperature);
    });
  },
});

export default appStore;
