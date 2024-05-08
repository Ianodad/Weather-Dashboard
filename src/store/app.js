import { getWindowItem, setWindowItem } from "@utils";

const appStore = (set, get) => ({
  avatar: "",
  userName: "",
  currentNavigation: "",
  theme: "light",
  language: getWindowItem("language") ? getWindowItem("language") : "en",
  temperature: "°F",
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
      console.log(state.theme);
    });
  },
  setTemperature: () => {
    set((state) => {
      state.temperature = state.temperature === "°F" ? "°C" : "°F";
      console.log(state.temperature);
    });
  },
});

export default appStore;
