import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type AuthInput, AuthInputSchema} from "@shared";

interface AuthFormProps {
    onSubmit: (data: AuthInput) => void;
    labels: {
        username: string;
        password: string;
        submit: string;
    }
}

export function AuthForm({onSubmit, labels}: AuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<AuthInput>({
        resolver: zodResolver(AuthInputSchema),
    });

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>{labels.username}</span>
                <input type="text" {...register("username")} />
                {errors.username && (
                    <div className="field-error">{errors.username.message}</div>
                )}
            </label>

            <label>
                <span>{labels.password}</span>
                <input type="password" {...register("password")} />
                {errors.password && (
                    <div className="field-error">{errors.password.message}</div>
                )}
            </label>

            <button
                type="submit"
                className="auth-submit"
                disabled={isSubmitting}
            >
                {labels.submit}
            </button>
        </form>
    );
}