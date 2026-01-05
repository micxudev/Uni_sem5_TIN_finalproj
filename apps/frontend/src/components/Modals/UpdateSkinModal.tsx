import {useState} from "react";
import {Modal} from "./Modal.tsx";
import {SkinForm} from "../Forms/SkinForm.tsx";
import {type Skin, type SkinInput} from "@shared";
import {updateSkin} from "../../api/api.skins.ts";
import {ErrorFlash} from "../ErrorFlash.tsx";

interface UpdateSkinModalProps {
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

export function UpdateSkinModal({onClose, onUpdate, skin, labels}: UpdateSkinModalProps) {
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
        <Modal
            onClose={onClose}
            titleText={labels.title}
        >
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
        </Modal>
    );
}