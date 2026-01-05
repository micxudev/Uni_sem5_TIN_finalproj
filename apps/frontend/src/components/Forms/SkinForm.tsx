import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type SkinInput, SkinInputSchema, type SkinRarity, SkinRarityValues} from "@shared";
import {Form, FormButton, FormFieldError} from "./Form.tsx";

interface SkinFormProps {
    onSubmit: (data: SkinInput) => void;
    initValues?: {
        name?: string;
        rarity?: SkinRarity
    }
    labels: {
        name: string;
        rarity: string;
        submit: string;
    }
}

export function SkinForm({onSubmit, initValues, labels}: SkinFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<SkinInput>({
        resolver: zodResolver(SkinInputSchema),
    });

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>{labels.name}</span>
                <input type="text" defaultValue={initValues?.name} {...register("name")} />
                <FormFieldError error={errors.name?.message}></FormFieldError>
            </label>

            <label>
                <span>{labels.rarity}</span>
                <select {...register("rarity")}>
                    {Object.values(SkinRarityValues).map(rarity => (
                        <option key={rarity} defaultValue={rarity} selected={rarity === initValues?.rarity}>
                            {rarity}
                        </option>
                    ))}
                </select>
                <FormFieldError error={errors.rarity?.message}></FormFieldError>
            </label>

            <FormButton disabled={isSubmitting} label={labels.submit}></FormButton>
        </Form>
    );
}