import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type AuthInput, AuthInputSchema} from "@shared";
import {Form, FormButton, FormFieldError} from "./Form.tsx";

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
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>{labels.username}</span>
                <input type="text" {...register("username")} />
                <FormFieldError error={errors.username?.message}></FormFieldError>
            </label>

            <label>
                <span>{labels.password}</span>
                <input type="password" {...register("password")} />
                <FormFieldError error={errors.password?.message}></FormFieldError>
            </label>

            <FormButton disabled={isSubmitting} label={labels.submit}></FormButton>
        </Form>
    );
}