import type {User} from "@shared";
import {Modal, ModalAction, ModalActions} from "./Modal.tsx";

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
        <Modal
            onClose={onClose}
            titleText={labels.title}
        >
            <div>
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
            </div>

            <ModalActions>
                <ModalAction
                    type="info"
                    label={labels.changePassword}
                    onClick={onChangePasswordClick}
                ></ModalAction>
                <ModalAction
                    type="danger"
                    label={labels.logout}
                    onClick={onLogoutClick}
                ></ModalAction>
            </ModalActions>
        </Modal>
    );
}