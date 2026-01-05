import type {Skin} from "@shared";
import {Modal, ModalAction, ModalActions} from "./Modal.tsx";

interface PreviewSkinModalProps {
    skin: Skin;
    canUpdate: boolean;
    canDelete: boolean;
    onUpdateClick: () => void;
    onDeleteClick: () => void;
    onClose: () => void;
    labels: {
        title: string;
        id: string;
        rarity: string;
        createdAt: string;
        update: string;
        delete: string;
    };
}

export function PreviewSkinModal(
    {
        skin,
        canUpdate,
        canDelete,
        onUpdateClick,
        onDeleteClick,
        onClose,
        labels,
    }: PreviewSkinModalProps) {
    return (
        <Modal
            onClose={onClose}
            titleText={skin.name}
        >
            <div>
                <p>
                    <strong>{labels.id}:</strong> {skin.id}
                </p>

                <p>
                    <strong>{labels.rarity}:</strong> {skin.rarity}
                </p>

                <p>
                    <strong>{labels.createdAt}:</strong> {new Date(skin.createdAt).toLocaleString()}
                </p>
            </div>

            <ModalActions visible={canUpdate || canDelete}>
                <ModalAction
                    visible={canUpdate}
                    type="info"
                    label={labels.update}
                    onClick={onUpdateClick}
                ></ModalAction>
                <ModalAction
                    visible={canDelete}
                    type="danger"
                    label={labels.delete}
                    onClick={onDeleteClick}
                ></ModalAction>
            </ModalActions>
        </Modal>
    );
}