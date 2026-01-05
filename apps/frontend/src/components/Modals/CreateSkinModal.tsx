import {useState} from "react";
import {Modal} from "./Modal.tsx";
import {SkinForm} from "../Forms/SkinForm.tsx";
import {type Skin, type SkinInput} from "@shared";
import {createSkin} from "../../api/api.skins.ts";
import {ErrorFlash} from "../ErrorFlash.tsx";

interface CreateSkinModalProps {
    onClose: () => void;
    onCreate: (skin: Skin) => void;
    labels: {
        title: string;
        name: string;
        rarity: string;
        submit: string;
    }
}

export function CreateSkinModal({onClose, onCreate, labels}: CreateSkinModalProps) {
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
                onSubmit={handleSubmit}
            />
        </Modal>
    );
}