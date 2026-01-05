import {useState} from "react";
import {ChangePasswordForm} from "../Forms/ChangePasswordForm.tsx";
import {type ChangePasswordInput} from "@shared";
import {changePassword} from "../../api/api.auth.ts";
import {ErrorFlash} from "../ErrorFlash.tsx";
import {Modal} from "./Modal.tsx";

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
        <Modal
            onClose={onClose}
            titleText={labels.title}
        >
            <ErrorFlash error={error} closable={false}/>

            <ChangePasswordForm
                labels={{
                    currentPassword: labels.currentPassword,
                    newPassword: labels.newPassword,
                    submit: labels.submit,
                }}
                onSubmit={handleSubmit}
            />
        </Modal>
    );
}