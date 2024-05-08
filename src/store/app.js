import { getWindowItem, setWindowItem } from "@utils";

const appStore = (set, get) => ({
  avatar: "",
  userName: "",
  currentNavigation: "",
  theme: getWindowItem("theme") ? getWindowItem("theme") : "light",
  language: getWindowItem("language") ? getWindowItem("language") : "en",
  temperature: getWindowItem("temperature")
    ? getWindowItem("temperature")
    : "°C",
  searchQuery: "",
  setAvatar: {},
  setUserName: {},
  setLanguage: () => {
    set((state) => {
      state.language = state.language === "en" ? "sw" : "en";
      setWindowItem("language", state.language);
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
