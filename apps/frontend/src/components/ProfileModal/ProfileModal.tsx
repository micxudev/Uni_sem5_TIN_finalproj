import type {User} from "@shared";
import {Modal} from "../Modal/Modal.tsx";
import "./ProfileModal.css";

interface ProfileModalProps {
    onClose: () => void;
    user: User;
    onChangePasswordClick: () => void;
    onLogoutClick: () => void;
    labels: {
        title: string;
        id: string;
        username: string;
        role: string;
        createdAt: string;
        lastLootboxOpenedAt: string;
        changePassword: string;
        logout: string;
    };
}

export function ProfileModal({onClose, user, onChangePasswordClick, onLogoutClick, labels,}: ProfileModalProps) {
    return (
        <Modal onClose={onClose}>
            <div>
                <h2 className="profile-title">{labels.title}</h2>

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

                <div className="profile-actions-container">
                    <button
                        className="profile-action change-password"
                        onClick={onChangePasswordClick}>
                        {labels.changePassword}
                    </button>
                    <button
                        className="profile-action logout"
                        onClick={onLogoutClick}>
                        {labels.logout}
                    </button>
                </div>
            </div>
        </Modal>
    );
}