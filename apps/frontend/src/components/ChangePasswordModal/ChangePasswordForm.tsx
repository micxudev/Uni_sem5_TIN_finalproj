import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type ChangePasswordInput, ChangePasswordInputSchema} from "@shared";

interface ChangePasswordFormProps {
    onSubmit: (data: ChangePasswordInput) => void;
    labels: {
        currentPassword: string;
        newPassword: string;
        submit: string;
    }
}

export function ChangePasswordForm({onSubmit, labels}: ChangePasswordFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<ChangePasswordInput>({
        resolver: zodResolver(ChangePasswordInputSchema),
    });

    return (
        <form className="change-password-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>{labels.currentPassword}</span>
                <input type="password" {...register("currentPassword")} />
                {errors.currentPassword && (
                    <div className="field-error">{errors.currentPassword.message}</div>
                )}
            </label>

            <label>
                <span>{labels.newPassword}</span>
                <input type="password" {...register("newPassword")} />
                {errors.newPassword && (
                    <div className="field-error">{errors.newPassword.message}</div>
                )}
            </label>

            <button
                type="submit"
                className="change-password-submit"
                disabled={isSubmitting}
            >
                {labels.submit}
            </button>
        </form>
    );
}