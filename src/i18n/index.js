import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./translations/english.json";
import polish from "./translations/polish.json";

i18n.use(initReactI18next).init({
  resources: {
    en: english,
    pl: polish
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false
  }
});
