import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import english from "./translations/english.json";
import polish from "./translations/polish.json";

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    resources: {
      en: english,
      pl: polish,
    },
    // lng: "en",
    fallbackLng: "pl",
    debug: true,
    load: "languageOnly",
    whitelist: ["en", "pl"],

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
