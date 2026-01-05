import {type ReactNode, useEffect, useRef} from "react";
import {isTopModal, popModal, pushModal} from "../../lib/utils/modalStack.ts";
import "../../styles/components/Modal.css";

interface ModalProps {
    titleText: string;
    children: ReactNode;
    onClose: () => void;
}

export function Modal({titleText, children, onClose}: ModalProps) {
    const idRef = useRef<symbol>(Symbol("modal"));

    useEffect(() => {
        const id = idRef.current;
        pushModal(id);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !e.repeat && isTopModal(id)) {
                onClose();
            }
        };

        document.addEventListener("keydown", onKeyDown);

        return () => {
            popModal(id);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onClose]);

    return (
        <div className="modal__container" onMouseDown={onClose}>
            <div
                className="modal__card"
                onMouseDown={e => e.stopPropagation()}
            >
                <h2 className="modal__title">
                    {titleText}
                </h2>
                {children}
            </div>
        </div>
    );
}


interface ModalActionsProps {
    visible?: boolean;
    children: ReactNode;
}

export function ModalActions({visible = true, children}: ModalActionsProps) {
    if (!visible) return null;
    return (
        <div className="modal__actions-container">
            {children}
        </div>
    );
}


type ModalActionType = "info" | "danger";

interface ModalActionProps {
    visible?: boolean;
    type: ModalActionType;
    label: string;
    onClick: () => void;
}

export function ModalAction({visible = true, type, label, onClick}: ModalActionProps) {
    if (!visible) return null;
    return (
        <button
            className={`modal__action--${type}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}