import type {User} from "@shared";
import {Modal} from "./Modal.tsx";
import "../../styles/components/PreviewUserModal.css";

interface SkinModalProps {
    user: User;
    canViewUserSkins: boolean;
    onViewUserSkinsClick: (userId: number) => void;
    onClose: () => void;
    labels: {
        title: string;
        id: string;
        username: string;
        role: string;
        createdAt: string;
        lastLootboxOpenedAt: string;
        viewSkins: string;
    };
}

export function PreviewUserModal({user, canViewUserSkins, onViewUserSkinsClick, onClose, labels,}: SkinModalProps) {
    return (
        <Modal onClose={onClose}>
            <div>
                <h2 className="user-title">{labels.title}</h2>

                <p>
                    <strong>{labels.id}:</strong> {user.id}
                </p>

                <p>
                    <strong>{labels.username}:</strong> {user.username}
                </p>

                <p>
                    <strong>{labels.role}:</strong> {user.role}
                </p>

                <p>
                    <strong>{labels.createdAt}:</strong> {new Date(user.createdAt).toLocaleString()}
                </p>

                <p>
                    <strong>{labels.lastLootboxOpenedAt}:</strong> {user.lastLootboxOpenedAt ? new Date(user.lastLootboxOpenedAt).toLocaleString() : "-"}
                </p>

                {(canViewUserSkins) && (
                    <div className="user-actions-container">
                        <button className="user-action view" onClick={() => onViewUserSkinsClick(user.id)}>
                            {labels.viewSkins}
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
}