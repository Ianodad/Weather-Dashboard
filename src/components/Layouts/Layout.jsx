/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { IntlProvider, ReactIntlErrorCode } from "react-intl";
import messages from "@utils/i18n";
import useSkySiteStore from "@store";
import { Outlet } from "react-router-dom";

export const Layout = ({ children }) => {
  const [language, setLanguage] = useSkySiteStore((state) => [
    state.language,
    state.setLanguage,
  ]);
  const intlError = (e) => {
    if ((e.code = ReactIntlErrorCode.MISSING_DATA)) {
      return;
    }
    console.error(e);
  };

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
