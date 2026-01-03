import {useState} from "react";
import {toast} from "react-toastify";

import {Header} from "./components/Header/Header.tsx";
import {AppLayout} from "./layout/AppLayout";
import {SkinsPage} from "./pages/SkinsPage";
import {Modal} from "./components/Modal/Modal";
import {LanguageModal} from "./components/LanguageModal/LanguageModal";
import {AuthModal} from "./components/Auth/AuthModal.tsx";
import {ProfileModal} from "./components/ProfileModal/ProfileModal";

import {logout} from "./api/api.auth.ts";

import {useI18n, useLanguage, useSetLanguage} from "./i18n/I18nContext";
import {useIsLoading, useLogin, useLogout, useUser} from "./AuthContext/AuthContext.tsx";

export function App() {
    // ─────────────────────────────────────
    // State (UI)
    // ─────────────────────────────────────
    const [isLanguageModalOpen, setLangModalOpen] = useState(false);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);

    // ─────────────────────────────────────
    // Global contexts
    // ─────────────────────────────────────
    const t = useI18n();
    const language = useLanguage();
    const setLanguage = useSetLanguage();

    const user = useUser();
    const isUserLoading = useIsLoading();
    const loginUser = useLogin();
    const logoutUser = useLogout();

    if (isUserLoading) {
        return null; // Loading state (show nothing for now, later maybe loader)
    }

    const header = (
        <Header
            user={user}
            onLanguageClick={() => setLangModalOpen(true)}
            onAuthClick={() => setAuthModalOpen(true)}
            onProfileClick={() => setProfileModalOpen(true)}
            labels={{
                language: t.languages.title,
                signIn: t.auth.signIn,
                profile: t.auth.profile,
            }}
        />
    );

    // ─────────────────────────────────────
    // Modals
    // ─────────────────────────────────────
    function renderLanguageModal() {
        if (!isLanguageModalOpen) return null;
        return (
            <Modal onClose={() => setLangModalOpen(false)}>
                <LanguageModal
                    current={language}
                    onSelect={setLanguage}
                    onClose={() => setLangModalOpen(false)}
                    labels={{title: t.languages.title}}
                />
            </Modal>
        );
    }

    function renderAuthModal() {
        if (!isAuthModalOpen) return null;
        return (
            <Modal onClose={() => setAuthModalOpen(false)}>
                <AuthModal
                    onClose={() => setAuthModalOpen(false)}
                    onSignIn={(user) => {
                        loginUser(user);
                        toast.success(t.auth.signInSuccess);
                    }}
                    onSignUp={() => {
                        toast.success(t.auth.signUpSuccess);
                    }}
                    labels={{
                        signIn: t.auth.signIn,
                        signUp: t.auth.signUp,
                        noAccount: t.auth.noAccount,
                        alreadyHaveAccount: t.auth.alreadyHaveAccount,
                        username: t.auth.username,
                        password: t.auth.password,
                    }}
                />
            </Modal>
        );
    }

    function renderProfileModal() {
        if (!isProfileModalOpen || !user) return null;
        return (
            <Modal onClose={() => setProfileModalOpen(false)}>
                <ProfileModal
                    user={user}
                    onPasswordChangeClick={() => {
                        console.log("TODO: Open Password Change Form");
                    }}
                    onLogoutClick={async () => {
                        setProfileModalOpen(false);
                        const res = await logout();
                        if (res.success) {
                            logoutUser();
                            toast.success(t.auth.logoutSuccess);
                        }
                    }}
                    labels={{
                        title: t.auth.profile,
                        id: t.users.id,
                        username: t.users.username,
                        role: t.users.role,
                        createdAt: t.users.createdAt,
                        lastLootboxOpenedAt: t.users.lastLootboxOpenedAt,
                        changePassword: t.auth.changePassword,
                        logout: t.auth.logout,
                    }}
                />
            </Modal>
        );
    }

    // ─────────────────────────────────────
    // Render
    // ─────────────────────────────────────
    return (
        <AppLayout header={header}>
            <SkinsPage/>
            {renderLanguageModal()}
            {renderAuthModal()}
            {renderProfileModal()}
        </AppLayout>
    );
}