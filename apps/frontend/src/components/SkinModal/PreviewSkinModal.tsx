import type {Skin} from "@shared";
import "./PreviewSkinModal.css";

interface SkinModalProps {
    skin: Skin;
    canEdit: boolean;
    canDelete: boolean;
    onEdit: () => void;
    onDelete: () => void;
    labels: {
        title: string;
        id: string;
        rarity: string;
        createdAt: string;
        edit: string;
        delete: string;
    };
}

export function PreviewSkinModal({skin, canEdit, canDelete, onEdit, onDelete, labels,}: SkinModalProps) {
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

            {(canEdit || canDelete) && (
                <div className="skin-actions-container">
                    {canEdit && (
                        <button className="skin-action edit" onClick={onEdit}>{labels.edit}</button>
                    )}
                    {canDelete && (
                        <button className="skin-action delete" onClick={onDelete}>{labels.delete}</button>
                    )}
                </div>
            )}
        </div>
    );
}