export const USER_INITIAL_STATE = {
  avatar: "",
  userName: "",
  currentNavigation: "",
  darkMode: false,
  lang:""
};

const appStore = (set, get) => ({
  user: "",
  userName: "",
  currentNavigation: "",
  setAvatar: {},
  setUserName: {},
  setDarkMode: {},
  setLanguage: {},
});

export default appStore;
