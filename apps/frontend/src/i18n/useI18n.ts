import {translations, type Language} from "./index";

export function useI18n(lang: Language) {
    return translations[lang];
}