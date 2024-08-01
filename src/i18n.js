import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

export const i18nextPromise = i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(HttpApi)
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    ns: ["general", "applicationForm"],
    backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
  });

export default function (app) {
  app.use(I18NextVue, { i18next });
  return app;
}
