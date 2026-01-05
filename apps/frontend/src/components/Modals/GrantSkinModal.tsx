import {useState} from "react";
import {Modal} from "./Modal.tsx";
import {GrantSkinForm} from "../Forms/GrantSkinForm.tsx";
import {type GrantSkinInput} from "@shared";
import {grantSkin} from "../../api/api.skin-ownership.ts";
import {ErrorFlash} from "../ErrorFlash.tsx";
import "../../styles/components/Skin.css";

interface GrantSkinModalProps {
    onClose: () => void;
    onGrant: () => void;
    labels: {
        title: string;
        userId: string;
        skinId: string;
        submit: string;
    }
}

export function GrantSkinModal({onClose, onGrant, labels}: GrantSkinModalProps) {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(data: GrantSkinInput) {
        const response = await grantSkin(data);

        if (!response.success) {
            setError(response.error.message);
            return;
        }

        onGrant();
        onClose();
    }

    return (
        <Modal onClose={onClose}>
            <div className="skin-modal">
                <h2 className="skin-title">
                    {labels.title}
                </h2>

                <ErrorFlash error={error} closable={false}/>

                <GrantSkinForm
                    labels={{
                        userId: labels.userId,
                        skinId: labels.skinId,
                        submit: labels.submit,
                    }}
                    onSubmit={handleSubmit}
                />
            </div>
        </Modal>
    );
}