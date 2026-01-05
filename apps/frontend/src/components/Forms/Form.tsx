import type {ReactNode} from "react";
import "../../styles/components/Form.css";

interface FormProps {
    onSubmit?: () => void;
    children: ReactNode;
}

export function Form({onSubmit, children}: FormProps) {
    return (
        <form className="form__container" onSubmit={onSubmit}>
            {children}
        </form>
    );
}


interface FormFieldErrorProps {
    error?: string;
}

export function FormFieldError({error}: FormFieldErrorProps) {
    if (!error) return null;
    return (
        <div className="form__field-error">
            {error}
        </div>
    );
}


interface FormButtonProps {
    disabled?: boolean;
    label?: string;
}

export function FormButton({disabled, label}: FormButtonProps) {
    return (
        <button
            type="submit"
            className="form__button"
            disabled={disabled}
        >
            {label}
        </button>
    );
}