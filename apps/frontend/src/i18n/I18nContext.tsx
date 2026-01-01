import {createContext, type ReactNode, useContext, useState} from "react";
import {type Language, translations} from "./index";
import type {TranslationSchema} from "./i18n.types";

type I18nContextValue = {
    language: Language;
    setLanguage: (lang: Language) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({children}: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

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