import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './translations';

i18n.use(initReactI18next).init({
  resources,
  lng: process.env.REACT_APP_LANGUAGE,
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
