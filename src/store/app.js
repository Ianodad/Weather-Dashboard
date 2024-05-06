import { getWindowItem, setWindowItem } from "@utils";

const appStore = (set, get) => ({
  avatar: "",
  userName: "",
  currentNavigation: "",
  darkMode: false,
  language: getWindowItem("language") ? getWindowItem("language") : "en",
  searchQuery: "",
  setAvatar: {},
  setUserName: {},
  setDarkMode: {},
  setLanguage: () => {
    set((state) => {
      state.language = state.language === "en" ? "sw" : "en";
      setWindowItem("language", state.language);
    });
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
});

export default appStore;
