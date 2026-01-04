import "./ConfirmModal.css";
import {Modal} from "../Modal/Modal.tsx";

interface ConfirmModalProps {
    onConfirmClick: () => void;
    onCancelClick: () => void;
    labels: {
        title: string;
        text: string;
        confirm: string;
        cancel: string;
    };
}

export function ConfirmModal({onConfirmClick, onCancelClick, labels}: ConfirmModalProps) {
    return (
        <Modal onClose={onCancelClick}>
            <div className="confirm-modal__container">
                <h2 className="confirm-modal__title">{labels.title}</h2>

                <h3 className="confirm-modal__text">{labels.text}</h3>

                <button
                    className="confirm-modal__confirm-button"
                    onClick={onConfirmClick}
                >
                    {labels.confirm}
                </button>

                <button
                    className="confirm-modal__cancel-button"
                    onClick={onCancelClick}
                >
                    {labels.cancel}
                </button>
            </div>
        </Modal>
    );
}