import {useState} from "react";
import {toast} from "react-toastify";

import {AppLayout} from "./layout/AppLayout";
import {SkinsPage} from "./pages/SkinsPage";
import {Modal} from "./components/Modal/Modal";
import {LanguageModal} from "./components/LanguageModal/LanguageModal";
import {AuthModal} from "./components/Auth/AuthModal.tsx";

import {logout} from "./api/api.auth.ts";

import {useI18n, useLanguage, useSetLanguage} from "./i18n/I18nContext";
import {useIsLoading, useLogin, useLogout} from "./AuthContext/AuthContext.tsx";

function App() {
    const [isLanguageModalOpen, setLangModalOpen] = useState(false);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    const t = useI18n();
    const language = useLanguage();
    const setLanguage = useSetLanguage();

    const isUserLoading = useIsLoading();
    const loginUser = useLogin();
    const logoutUser = useLogout();

    if (isUserLoading) {
        return null; // Loading state (show nothing for now, later maybe loader)
    }

    return (
        <AppLayout
            onLanguageClick={() => setLangModalOpen(true)}
            onAuthClick={() => setAuthModalOpen(true)}
            onLogoutClick={() => {
                logout()
                    .then((res) => {
                        if (res.success) {
                            logoutUser();
                            toast.success(t.auth.logoutSuccess);
                        }
                    });
            }}
        >
            <SkinsPage/>

            {isLanguageModalOpen && (
                <Modal onClose={() => setLangModalOpen(false)}>
                    <LanguageModal
                        current={language}
                        onSelect={setLanguage}
                        onClose={() => setLangModalOpen(false)}
                        labels={{title: t.languages.title}}
                    />
                </Modal>
            )}

            {isAuthModalOpen && (
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
            )}

        </AppLayout>
    );
}

export default App;