import {useState} from "react";
import {SkinForm} from "./SkinForm.tsx";
import {type Skin, type SkinInput} from "@shared";
import {createSkin} from "../../../api/api.skins.ts";
import {ErrorFlash} from "../../ErrorFlash/ErrorFlash.tsx";
import "./Skin.css";

interface SkinActionModalProps {
    onClose: () => void;
    onCreate: (skin: Skin) => void;
    labels: {
        title: string;
        name: string;
        rarity: string;
        submit: string;
    }
}

export function CreateSkinModal({onClose, onCreate, labels}: SkinActionModalProps) {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(data: SkinInput) {
        const response = await createSkin(data);

        if (!response.success) {
            setError(response.error.message);
            return;
        }

        onCreate(response.data);
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
                onSubmit={handleSubmit}
            />
        </div>
    );
}