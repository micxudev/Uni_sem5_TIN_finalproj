import {useState} from "react";
import {ChangePasswordForm} from "./ChangePasswordForm.tsx";
import {type ChangePasswordInput} from "@shared";
import {changePassword} from "../../api/api.auth.ts";
import {ErrorFlash} from "../ErrorFlash/ErrorFlash.tsx";
import {Modal} from "../Modal/Modal.tsx";
import "./ChangePassword.css";

interface ChangePasswordModalProps {
    onClose: () => void;
    onChangePassword: () => void;
    labels: {
        title: string;
        currentPassword: string;
        newPassword: string;
        submit: string;
    }
}

export function ChangePasswordModal({onClose, onChangePassword, labels}: ChangePasswordModalProps) {
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(data: ChangePasswordInput) {
        const response = await changePassword(data);

        if (!response.success) {
            setError(response.error.message);
            return;
        }

        onChangePassword();
        onClose();
    }

    return (
        <Modal onClose={onClose}>
            <div className="change-password-modal">
                <h2 className="change-password-title">
                    {labels.title}
                </h2>

                <ErrorFlash error={error} closable={false}/>

                <ChangePasswordForm
                    labels={{
                        currentPassword: labels.currentPassword,
                        newPassword: labels.newPassword,
                        submit: labels.submit,
                    }}
                    onSubmit={handleSubmit}
                />
            </div>
        </Modal>
    );
}