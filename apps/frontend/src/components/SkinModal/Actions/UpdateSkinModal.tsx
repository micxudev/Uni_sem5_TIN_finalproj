import {useState} from "react";
import {SkinForm} from "./SkinForm.tsx";
import {type Skin, type SkinInput} from "@shared";
import {updateSkin} from "../../../api/api.skins.ts";
import {ErrorFlash} from "../../ErrorFlash/ErrorFlash.tsx";
import "./Skin.css";

interface SkinActionModalProps {
    onClose: () => void;
    onUpdate: () => void;
    skin: Skin;
    labels: {
        title: string;
        name: string;
        rarity: string;
        submit: string;
    }
}

export function UpdateSkinModal({onClose, onUpdate, skin, labels}: SkinActionModalProps) {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(data: SkinInput) {
        const response = await updateSkin(skin.id, data);

        if (!response.success) {
            setError(response.error.message);
            return;
        }

        onUpdate();
        onClose();
    }

    return (
        <div className="skin-modal">
            <h2 className="skin-title">
                {labels.title}
            </h2>

            <ErrorFlash error={error} closable={false}/>

            <SkinForm
                labels={{
                    name: labels.name,
                    rarity: labels.rarity,
                    submit: labels.submit,
                }}
                initValues={{
                    name: skin.name,
                    rarity: skin.rarity,
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
}