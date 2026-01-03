import type {Skin} from "@shared";
import "./PreviewSkinModal.css";

interface SkinModalProps {
    skin: Skin;
    canUpdate: boolean;
    canDelete: boolean;
    onUpdate: () => void;
    onDelete: () => void;
    labels: {
        title: string;
        id: string;
        rarity: string;
        createdAt: string;
        update: string;
        delete: string;
    };
}

export function PreviewSkinModal({skin, canUpdate, canDelete, onUpdate, onDelete, labels,}: SkinModalProps) {
    return (
        <div>
            <h2 className="skin-title">{skin.name}</h2>

            <p>
                <strong>{labels.id}:</strong> {skin.id}
            </p>

            <p>
                <strong>{labels.rarity}:</strong> {skin.rarity}
            </p>

            <p>
                <strong>{labels.createdAt}:</strong> {new Date(skin.createdAt).toLocaleString()}
            </p>

            {(canUpdate || canDelete) && (
                <div className="skin-actions-container">
                    {canUpdate && (
                        <button className="skin-action edit" onClick={onUpdate}>{labels.update}</button>
                    )}
                    {canDelete && (
                        <button className="skin-action delete" onClick={onDelete}>{labels.delete}</button>
                    )}
                </div>
            )}
        </div>
    );
}