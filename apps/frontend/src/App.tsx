import {useState} from "react";

import {AppLayout} from "./layout/AppLayout";
import {SkinsPage} from "./pages/SkinsPage";
import {Modal} from "./components/Modal/Modal";
import {LanguageModal} from "./components/LanguageModal/LanguageModal";

import {useI18n, useLanguage, useSetLanguage} from "./i18n/I18nContext";

function App() {
    const [isLanguageModalOpen, setLangModalOpen] = useState(false);

    const t = useI18n();
    const language = useLanguage();
    const setLanguage = useSetLanguage();

    return (
        <AppLayout onLanguageClick={() => setLangModalOpen(true)}>
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
        </AppLayout>
    );
}

export default App;