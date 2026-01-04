import type {TranslationSchema} from "./i18n.types.ts";
import {en} from "./translations/en.ts";
import {pl} from "./translations/pl.ts";

export const translations = {
    en,
    pl,
} satisfies Record<string, TranslationSchema>;

export type Language = keyof typeof translations;


export interface LanguageConfig {
    code: Language;
    label: string;
    flagPath: string;
}

export const languages: Record<Language, LanguageConfig> = {
    en: {
        code: "en",
        label: "English",
        flagPath: "/flags/en.svg",
    },
    pl: {
        code: "pl",
        label: "Polski",
        flagPath: "/flags/pl.svg",
    },
};