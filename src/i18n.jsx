import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en.json';
import translationBN from './locales/bn.json';

const resources = {
    en: {
        translation: translationEN,
    },
    bn: {
        translation: translationBN,
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'bn', // default language
        fallbackLng: 'bn', // fallback language
        interpolation: {
            escapeValue: false, // React already does escaping
        },
    });

export default i18n;
