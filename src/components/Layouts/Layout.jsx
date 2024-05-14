/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";
import messages from "@utils/i18n";
import useSkySiteStore from "@store";
import { Outlet } from "react-router-dom";
import { generatorAvatar } from "@utils";
export const Layout = () => {
  const { language, theme, avatar } = useSkySiteStore((state) => ({
    language: state.language,
    theme: state.theme,
    avatar: state.avatar,
  }));
  const intlError = (e) => {
    if ((e.code = ReactIntlErrorCode.MISSING_DATA)) {
      return;
    }
    console.error(e);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [theme]);

  useEffect(() => {
    if (!avatar) {
      useSkySiteStore.setState({ avatar: generatorAvatar() });
    }
  }, []);

  return (
    <IntlProvider
      locale={language}
      messages={messages[language]}
      onError={intlError}
    >
      <Outlet />
    </IntlProvider>
  );
};
