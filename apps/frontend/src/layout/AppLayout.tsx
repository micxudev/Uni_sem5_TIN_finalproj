import type {ReactNode} from "react";
import {Header} from "../components/Header/Header";
import {Footer} from "../components/Footer/Footer";
import "./Layout.css";
import {useI18n} from "../i18n/I18nContext.tsx";

interface AppLayoutProps {
    children: ReactNode;
    onLanguageClick: () => void;
}

export function AppLayout({children, onLanguageClick}: AppLayoutProps) {
    const t = useI18n();

    return (
        <div className="layout">
            <Header
                onLanguageClick={onLanguageClick}
                labels={{signIn: t.auth.signIn}}
            />

            <main className="layout__main">
                {children}
            </main>

            <Footer/>
        </div>
    );
}