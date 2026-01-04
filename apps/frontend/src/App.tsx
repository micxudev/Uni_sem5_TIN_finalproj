import {useState} from "react";
import {toast} from "react-toastify";

import {Header} from "./components/Header/Header.tsx";
import {AppLayout} from "./layouts/AppLayout";
import {SkinsPage} from "./pages/SkinsPage";

import {LanguageModal} from "./components/LanguageModal/LanguageModal";
import {AuthModal} from "./components/Auth/AuthModal.tsx";
import {ProfileModal} from "./components/ProfileModal/ProfileModal";
import {ChangePasswordModal} from "./components/ChangePasswordModal/ChangePasswordModal.tsx";

import {logout} from "./api/api.auth.ts";

import {useI18n, useLanguage, useSetLanguage} from "./contexts/I18nContext.tsx";
import {useIsLoading, useLogin, useLogout, useUser} from "./contexts/AuthContext.tsx";
import {useConfirm} from "./contexts/ConfirmContext.tsx";

export function App() {
    // ─────────────────────────────────────
    // State (UI)
    // ─────────────────────────────────────
    const [isLanguageModalOpen, setLangModalOpen] = useState(false);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

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

    const confirm = useConfirm();

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
            <LanguageModal
                current={language}
                onSelect={setLanguage}
                onClose={() => setLangModalOpen(false)}
                labels={{title: t.languages.title}}
            />
        );
    }

    function renderAuthModal() {
        if (!isAuthModalOpen) return null;
        return (
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
        );
    }

    function renderProfileModal() {
        if (!isProfileModalOpen || !user) return null;
        const onClose = () => setProfileModalOpen(false);
        return (
            <ProfileModal
                onClose={onClose}
                user={user}
                onChangePasswordClick={() => setChangePasswordModalOpen(true)}
                onLogoutClick={async () => {
                    const confirmed = await confirm({
                        title: t.auth.logout,
                        text: t.auth.logoutConfirm,
                        confirm: t.auth.logout,
                        cancel: t.common.cancel,
                    });
                    if (!confirmed) return;

                    const res = await logout();
                    if (res.success) {
                        onClose();
                        logoutUser();
                        toast.success(t.auth.logoutSuccess);
                    } else {
                        toast.error(res.error.message);
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
        );
    }

    function renderChangePasswordModal() {
        if (!isChangePasswordModalOpen) return null;
        return (
            <ChangePasswordModal
                onClose={() => setChangePasswordModalOpen(false)}
                onChangePassword={() => {
                    toast.success(t.auth.changePasswordSuccess);
                }}
                labels={{
                    title: t.auth.changePassword,
                    currentPassword: t.auth.currentPassword,
                    newPassword: t.auth.newPassword,
                    submit: t.auth.changePassword,
                }}
            />
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
            {renderChangePasswordModal()}
        </AppLayout>
    );
}