import type {User} from "@shared";
import {Modal, ModalAction, ModalActions} from "./Modal.tsx";

interface PreviewUserModalProps {
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

export function PreviewUserModal({
                                     user,
                                     canViewUserSkins,
                                     onViewUserSkinsClick,
                                     onClose,
                                     labels,
                                 }: PreviewUserModalProps) {
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

            <ModalActions visible={canViewUserSkins}>
                <ModalAction
                    type="info"
                    label={labels.viewSkins}
                    onClick={() => onViewUserSkinsClick(user.id)}
                ></ModalAction>
            </ModalActions>
        </Modal>
    );
}