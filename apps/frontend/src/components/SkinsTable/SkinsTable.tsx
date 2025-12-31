import type {Skin} from "@shared";
import "./SkinsTable.css";

interface SkinsTableProps {
    skins: Skin[];
    onSelect: (skin: Skin) => void;
    labels: {
        id: string;
        name: string;
        rarity: string;
        createdAt: string;
    }
}

export function SkinsTable({skins, onSelect, labels}: SkinsTableProps) {
    return (
        <table className="skins-table">
            <thead>
            <tr className="skins-table__head-row">
                <th>{labels.id}</th>
                <th>{labels.name}</th>
                <th>{labels.rarity}</th>
                <th>{labels.createdAt}</th>
            </tr>
            </thead>
            <tbody>
            {skins.map((skin) => (
                <tr
                    key={skin.id}
                    className="skins-table__body-row"
                    onClick={() => onSelect(skin)}
                >
                    <td>{skin.id}</td>
                    <td>{skin.name}</td>
                    <td>{skin.rarity}</td>
                    <td>{new Date(skin.createdAt).toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}