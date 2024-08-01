import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        general: {
          websiteTitle: "Mentorship Program",
        },
        jobForm: {
          title: "Job Application",
          persionalInformation: "Personal Information",
          name: "Name",
          firstName: "First Name",
          lastName: "Last Name",
          address: "Address",
          streetAddress: "Street Address",
          dateOfBirth: "Date of Birth",
          day: "Day",
          month: "Month",
          year: "Year",
          country: "Country",
          city: "City",
          phone: "Phone",
          home: "Home",
          mobile: "Mobile",
          education: "Education",
          school: "School",
        },
      },
      "vi-VN": {
        general: {
          websiteTitle: "Học kèm",
        },
      },
    },
  });

export default function (app) {
  app.use(I18NextVue, { i18next });
  return app;
}
