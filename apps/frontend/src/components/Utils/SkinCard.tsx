import type {Skin} from "@shared";
import "../../styles/components/SkinCard.css";

interface SkinCardProps {
    skin: Skin | null;
}

export function SkinCard({skin}: SkinCardProps) {
    if (!skin)
        return (
            <div className="skin-card skin-card--empty">
                <span className="skin-card__placeholder">?</span>
            </div>
        );
    return (
        <div className="skin-card">
            <div className="skin-card__header">
                <span className={`skin-card__rarity skin-card__rarity--${skin.rarity}`}>
                    {skin.rarity}
                </span>
            </div>

            <div className="skin-card__body">
                <span className="skin-card__name">{skin.name}</span>
                <span className="skin-card__id">#{skin.id}</span>
            </div>

            <div className="skin-card__footer">
                <span className="skin-card__date">
                    {new Date(skin.createdAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
}