import {useI18n} from "../contexts/I18nContext.tsx";
import {openLootbox} from "../api/api.lootboxes.ts";
import {useUser} from "../contexts/AuthContext.tsx";
import {ErrorFlash} from "../components/ErrorFlash.tsx";
import {useState} from "react";
import {ErrorCodeValues, type Skin} from "@shared";
import {toast} from "react-toastify";
import {toHumanReadable} from "../lib/utils/time.ts";
import {SkinCard} from "../components/Utils/SkinCard.tsx";
import "../styles/pages/LootboxesPage.css";

export function LootboxesPage() {
    const [skin, setSkin] = useState<Skin | null>(null);

    const t = useI18n();
    const user = useUser();

    if (!user) {
        return <ErrorFlash title={t.errors.unauthenticated} error={t.errors.authRequired}/>;
    }

    return (
        <div className="lootboxes-page__container">
            <h2>{t.lootboxes.open}</h2>

            <SkinCard skin={skin}></SkinCard>

            <button
                onClick={async () => {
                    const result = await openLootbox();

                    if (result.success) {
                        const skin = result.data.skin;
                        toast.success(t.lootboxes.success(skin));
                        setSkin(skin);
                        return;
                    }

                    // Unexpected
                    if (result.error.code !== ErrorCodeValues.COOLDOWN_ERROR) {
                        toast.error(result.error.message);
                        return;
                    }

                    // Cooldown
                    const msUntilAvailable = Number(result.error.message);
                    const time = toHumanReadable(msUntilAvailable);
                    toast.error(t.lootboxes.cooldown(time));
                }}
            >
                {t.lootboxes.open}
            </button>
        </div>
    );
}