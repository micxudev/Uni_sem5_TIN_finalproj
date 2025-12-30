import type {Skin} from "@shared";
import "./SkinsTable.css";

interface SkinsTableProps {
    skins: Skin[];
    onSelect: (skin: Skin) => void;
}

export function SkinsTable({skins, onSelect}: SkinsTableProps) {
    return (
        <table className="skins-table">
            <thead>
            <tr className="skins-table__head-row">
                <th>ID</th>
                <th>Name</th>
                <th>Rarity</th>
                <th>Created at</th>
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