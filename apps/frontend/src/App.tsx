import {useState} from "react";

import {AppLayout} from "./layout/AppLayout";
import {SkinsPage} from "./pages/SkinsPage";
import {Modal} from "./components/Modal/Modal";
import {LanguageModal} from "./components/LanguageModal/LanguageModal";
import {AuthModal} from "./components/Auth/AuthModal.tsx";

import {useI18n, useLanguage, useSetLanguage} from "./i18n/I18nContext";

function App() {
    const [isLanguageModalOpen, setLangModalOpen] = useState(false);
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    const t = useI18n();
    const language = useLanguage();
    const setLanguage = useSetLanguage();

    return (
        <AppLayout
            onLanguageClick={() => setLangModalOpen(true)}
            onAuthClick={() => setAuthModalOpen(true)}
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