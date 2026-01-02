import type {ReactNode} from "react";
import {Header} from "../components/Header/Header";
import {Footer} from "../components/Footer/Footer";
import "./Layout.css";
import {useI18n} from "../i18n/I18nContext.tsx";
import {useUser} from "../AuthContext/AuthContext.tsx";

interface AppLayoutProps {
    children: ReactNode;
    onAuthClick: () => void;
    onLogoutClick: () => void;
    onLanguageClick: () => void;
}

export function AppLayout({children, onAuthClick, onLogoutClick, onLanguageClick}: AppLayoutProps) {
    const t = useI18n();
    const user = useUser();

    return (
        <div className="layout">
            <Header
                user={user}
                onLanguageClick={onLanguageClick}
                onAuthClick={onAuthClick}
                onLogoutClick={onLogoutClick}
                labels={{
                    signIn: t.auth.signIn,
                    logout: t.auth.logout,
                }}
            />

            <main className="layout__main">
                {children}
            </main>

            <Footer/>
        </div>
    );
}