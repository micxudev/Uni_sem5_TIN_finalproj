import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type ChangePasswordInput, ChangePasswordInputSchema} from "@shared";
import {Form, FormButton, FormFieldError} from "./Form.tsx";

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
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>{labels.currentPassword}</span>
                <input type="password" {...register("currentPassword")} />
                <FormFieldError error={errors.currentPassword?.message}></FormFieldError>
            </label>

            <label>
                <span>{labels.newPassword}</span>
                <input type="password" {...register("newPassword")} />
                <FormFieldError error={errors.newPassword?.message}></FormFieldError>
            </label>

            <FormButton disabled={isSubmitting} label={labels.submit}></FormButton>
        </Form>
    );
}