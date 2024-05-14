import React, { useEffect, useState } from "react";
import useSkySiteStore from "@store";
import keFlagRound from "/ke_flag_round.svg";
import ukFlagRound from "/uk_flag_round.svg";

export const LangToggle = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { language, setLanguage } = useSkySiteStore((state) => ({
    language: state.language,
    setLanguage: state.setLanguage,
  }));
  const [isChecked, setIsChecked] = useState(language == "sw" ? true : false);

  const handleCheckboxChange = () => {
    setLanguage();
    setIsChecked(!isChecked);
    // useSkySiteStore.setState({ language: language === "en" ? "sw" : "en" });
  };

  useEffect(() => {
    if (language === "sw") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [language]);

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
            data-testid="language-toggle-checkbox"
          />
          <div className="block h-8 w-14 rounded-full bg-gray-300 text-center">
            {language == "sw" && (
              <span className="inline-block align-middle text-black float-left mt-1 ml-1">
                SW
              </span>
            )}
            {language == "en" && (
              <span className="inline-block align-middle text-black float-right mt-1 mr-1">
                EN
              </span>
            )}
          </div>
          <div className="dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition">
            <span className="active hidden">
              <img src={keFlagRound} width="42" height="14" alt="Checked" />
            </span>
            <span className="inactive text-gray-700">
              <img src={ukFlagRound} width="42" height="14" alt="Checked" />
            </span>
          </div>
        </div>
      </label>
    </>
  );
};
