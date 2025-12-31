import {useEffect, useState} from "react";
import type {PaginatedResult, Skin} from "@shared";
import type {Language} from "./i18n";

import {fetchSkins} from "./api/api";
import {useI18n} from "./i18n/useI18n.ts";

import "./layout/Layout.css";

import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Modal} from "./components/Modal/Modal";
import {SkinsTable} from "./components/SkinsTable/SkinsTable";
import {PaginationControls} from "./components/PaginationControls/PaginationControls";
import {SkinModal} from "./components/SkinModal/SkinModal.tsx";
import {LanguageModal} from "./components/LanguageModal/LanguageModal.tsx";

const SKINS_PER_PAGE = 8;

function App() {
    const [language, setLanguage] = useState<Language>("en");
    const t = useI18n(language);
    const [isLanguageModalOpen, setLangModalOpen] = useState(false);

    const [result, setResult] = useState<PaginatedResult<Skin> | null>(null);
    const [page, setPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);

    useEffect(() => {
        fetchSkins(page, SKINS_PER_PAGE)
            .then(setResult)
            .catch((err) => setError(err.message));
    }, [page]);

    return (
        <div className="layout">
            <Header
                onLanguageClick={() => setLangModalOpen(true)}
                labels={{
                    signIn: t.auth.signIn
                }}
            />

            <main className="layout__main">
                <h1>{t.skins.title}</h1>

                {error && <p style={{color: "red"}}>{error}</p>}

                {result && (
                    <>
                        <SkinsTable
                            skins={result.data}
                            onSelect={setSelectedSkin}
                            labels={{
                                id: t.skins.id,
                                name: t.skins.name,
                                rarity: t.skins.rarity,
                                createdAt: t.skins.createdAt
                            }}
                        />

                        <PaginationControls
                            currentPage={result.meta.current_page}
                            lastPage={result.meta.last_page}
                            onPrev={() => setPage((p) => p - 1)}
                            onNext={() => setPage((p) => p + 1)}
                            labels={{
                                prev: t.pagination.prev,
                                next: t.pagination.next,
                                page: t.pagination.page
                            }}
                        />
                    </>
                )}

                {selectedSkin && (
                    <Modal onClose={() => setSelectedSkin(null)}>
                        <SkinModal
                            skin={selectedSkin}
                            canEdit={true}   // (computed later)
                            canDelete={true} // (computed later)
                            onEdit={() => {
                                console.log("edit", selectedSkin.id);
                            }}
                            onDelete={() => {
                                console.log("delete", selectedSkin.id);
                            }}
                            labels={{
                                title: selectedSkin.name,
                                id: t.skins.id,
                                rarity: t.skins.rarity,
                                createdAt: t.skins.createdAt,
                                edit: t.common.edit,
                                delete: t.common.delete,
                            }}
                        />
                    </Modal>
                )}

                {isLanguageModalOpen && (
                    <Modal onClose={() => setLangModalOpen(false)}>
                        <LanguageModal
                            current={language}
                            onSelect={setLanguage}
                            onClose={() => setLangModalOpen(false)}
                            labels={{
                                title: t.languages.title
                            }}
                        />
                    </Modal>
                )}
            </main>

            <Footer/>
        </div>
    );
}

export default App;