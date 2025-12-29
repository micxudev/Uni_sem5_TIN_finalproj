import {useEffect, useState} from 'react'
import {fetchSkins} from './api'
import type {Skin} from "@shared";

function App() {
    const [skins, setSkins] = useState<Skin[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchSkins()
            .then((res) => setSkins(res.data))
            .catch((err) => setError(err.message))
    }, [])

    return (
        <div>
            <h1>Skins</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {skins.map((skin) => (
                    <li key={skin.id}>
                        {skin.id} — {skin.name} ({skin.rarity}) —{' '}
                        {new Date(skin.createdAt).toLocaleString()} — {skin.createdBy}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App