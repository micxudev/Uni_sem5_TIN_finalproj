import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type GrantSkinInput, GrantSkinInputSchema} from "@shared";

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
        <form className="skin-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                <span>{labels.userId}</span>
                <input type="text" defaultValue={initValues?.userId} {...register("userId")} />
                {errors.userId && (
                    <div className="field-error">{errors.userId.message}</div>
                )}
            </label>

            <label>
                <span>{labels.skinId}</span>
                <input type="text" defaultValue={initValues?.skinId} {...register("skinId")} />
                {errors.skinId && (
                    <div className="field-error">{errors.skinId.message}</div>
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