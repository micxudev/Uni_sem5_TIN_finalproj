import {type ReactNode, useEffect, useRef} from "react";
import {isTopModal, popModal, pushModal} from "../../lib/utils/modalStack.ts";
import "../../styles/components/Modal.css";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export function Modal({children, onClose}: ModalProps) {
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
        <div className="modal-container" onMouseDown={onClose}>
            <div
                className="modal-card"
                onMouseDown={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}