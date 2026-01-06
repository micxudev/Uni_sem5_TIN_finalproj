import {useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {toast} from "react-toastify";

import type {AppRoute} from "./lib/types.ts";
import {Header} from "./components/Header.tsx";
import {Layout} from "./Layout.tsx";
import {SkinsPage} from "./pages/SkinsPage";
import {SkinOwnershipsPage} from "./pages/SkinOwnershipsPage";
import {UsersPage} from "./pages/UsersPage";

import {LanguageModal} from "./components/Modals/LanguageModal.tsx";
import {AuthModal} from "./components/Modals/AuthModal.tsx";
import {ProfileModal} from "./components/Modals/ProfileModal.tsx";
import {ChangePasswordModal} from "./components/Modals/ChangePasswordModal.tsx";

import {logout} from "./api/api.auth.ts";

import {useI18n, useLanguage, useSetLanguage} from "./contexts/I18nContext.tsx";
import {useIsLoading, useLogin, useLogout, useUser} from "./contexts/AuthContext.tsx";
import {useConfirm} from "./contexts/ConfirmContext.tsx";
import {Sidebar} from "./components/Sidebar.tsx";
import {Footer} from "./components/Footer.tsx";

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

    // ─────────────────────────────────────
    // Elements
    // ─────────────────────────────────────
    const DEFAULT_ROUTE_PATH = "/skins";

    const routes: AppRoute[] = [
        {
            path: DEFAULT_ROUTE_PATH,
            iconPath: "/skins.svg",
            label: t.skins.nav_label,
            component: SkinsPage
        },
        {
            path: "/owned-skins",
            iconPath: "/owned-skins.svg",
            label: t.skin_ownership.nav_label,
            component: SkinOwnershipsPage
        },
        {
            path: "/users",
            iconPath: "/profile.svg",
            label: t.users.nav_label,
            component: UsersPage
        },
    ];

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

    const sidebar = (
        <Sidebar
            routes={routes}
        />
    );

    const footer = (
        <Footer/>
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
        <BrowserRouter>
            <Layout
                sidebar={sidebar}
                header={header}
                footer={footer}
            >
                <Routes>
                    {routes.map(({path, component: Page}) => (
                        <Route key={path} path={path} element={<Page/>}/>
                    ))}
                    <Route path="*" element={<Navigate to={DEFAULT_ROUTE_PATH} replace/>}/>
                </Routes>

                {renderLanguageModal()}
                {renderAuthModal()}
                {renderProfileModal()}
                {renderChangePasswordModal()}
            </Layout>
        </BrowserRouter>
    );
}