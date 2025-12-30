import {useEffect, useState} from "react";
import type {PaginatedResult, Skin} from "@shared";
import {fetchSkins} from "./api/api";

import "./layout/Layout.css";

import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Modal} from "./components/Modal/Modal";
import {SkinsTable} from "./components/SkinsTable/SkinsTable";
import {PaginationControls} from "./components/PaginationControls/PaginationControls";

const SKINS_PER_PAGE = 8;

function App() {
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
            <Header/>

            <main className="layout__main">
                <h1>Skins</h1>

                {error && <p style={{color: "red"}}>{error}</p>}

                {result && (
                    <>
                        <SkinsTable
                            skins={result.data}
                            onSelect={setSelectedSkin}
                        />

                        <PaginationControls
                            currentPage={result.meta.current_page}
                            lastPage={result.meta.last_page}
                            onPrev={() => setPage((p) => p - 1)}
                            onNext={() => setPage((p) => p + 1)}
                        />
                    </>
                )}

                {selectedSkin && (
                    <Modal onClose={() => setSelectedSkin(null)}>
                        <h3>{selectedSkin.name}</h3>
                        <p>Rarity: {selectedSkin.rarity}</p>
                        <p>
                            Created at:{" "}
                            {new Date(selectedSkin.createdAt).toLocaleString()}
                        </p>
                    </Modal>
                )}
            </main>

            <Footer/>
        </div>
    );
}

export default App;