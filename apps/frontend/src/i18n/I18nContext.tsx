import {createContext, type ReactNode, useContext, useState} from "react";
import {type Language, translations} from "./index";
import type {TranslationSchema} from "./i18n.types";
import {setZodLocale} from "./zod-i18n.ts";

const DEFAULT_LANGUAGE: Language = "en";
const LANGUAGE_STORAGE_KEY = "app.language";

type I18nContextValue = {
    language: Language;
    setLanguage: (lang: Language) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({children}: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        const lang = stored && stored in translations
            ? stored as Language
            : DEFAULT_LANGUAGE;

        setZodLocale(lang);
        return lang;
    });

    function setLanguage(lang: Language) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        setZodLocale(lang)
        setLanguageState(lang);
    }

    return (
        <I18nContext.Provider value={{language, setLanguage}}>
            {children}
        </I18nContext.Provider>
    );
}

function useI18nContext(): I18nContextValue {
    const ctx = useContext(I18nContext);
    if (!ctx) {
        throw new Error("useI18nContext must be used within I18nProvider");
    }
    return ctx;
}

export function useLanguage(): Language {
    return useI18nContext().language;
}

export function useSetLanguage(): (lang: Language) => void {
    return useI18nContext().setLanguage;
}

export function useI18n(): TranslationSchema {
    const language = useLanguage();
    return translations[language];
}