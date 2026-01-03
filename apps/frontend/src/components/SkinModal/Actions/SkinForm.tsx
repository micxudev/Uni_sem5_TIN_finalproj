import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type SkinInput, SkinInputSchema, type SkinRarity, SkinRarityValues} from "@shared";

interface SkinFormProps {
    onSubmit: (data: SkinInput) => void;
    initValues: {
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
        <form className="skin-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>{labels.name}</span>
                <input type="text" defaultValue={initValues.name} {...register("name")} />
                {errors.name && (
                    <div className="field-error">{errors.name.message}</div>
                )}
            </label>

            <label>
                <span>{labels.rarity}</span>
                <select {...register("rarity")}>
                    {Object.values(SkinRarityValues).map(rarity => (
                        <option key={rarity} defaultValue={rarity} selected={rarity === initValues.rarity}>
                            {rarity}
                        </option>
                    ))}
                </select>
                {errors.rarity && (
                    <div className="field-error">{errors.rarity.message}</div>
                )}
            </label>

            <button
                type="submit"
                className="skin-submit"
                disabled={isSubmitting}
            >
                {labels.submit}
            </button>
        </form>
    );
}