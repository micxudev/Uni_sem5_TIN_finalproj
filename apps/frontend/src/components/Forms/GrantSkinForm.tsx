import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type GrantSkinInput, GrantSkinInputSchema} from "@shared";
import {Form, FormButton, FormFieldError} from "./Form.tsx";

interface GrantSkinFormProps {
    onSubmit: (data: GrantSkinInput) => void;
    initValues?: {
        userId?: number;
        skinId?: number;
    }
    labels: {
        userId: string;
        skinId: string;
        submit: string;
    }
}

export function GrantSkinForm({onSubmit, initValues, labels}: GrantSkinFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<GrantSkinInput>({
        resolver: zodResolver(GrantSkinInputSchema),
    });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>{labels.userId}</span>
                <input type="text" defaultValue={initValues?.userId} {...register("userId")} />
                <FormFieldError error={errors.userId?.message}></FormFieldError>
            </label>

            <label>
                <span>{labels.skinId}</span>
                <input type="text" defaultValue={initValues?.skinId} {...register("skinId")} />
                <FormFieldError error={errors.skinId?.message}></FormFieldError>
            </label>

            <FormButton disabled={isSubmitting} label={labels.submit}></FormButton>
        </Form>
    );
}