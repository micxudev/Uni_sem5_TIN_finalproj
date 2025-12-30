import type {ReactNode} from "react";
import "./Modal.css";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export function Modal({children, onClose}: ModalProps) {
    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal-card"
                 onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}