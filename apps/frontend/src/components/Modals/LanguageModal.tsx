import {type Language, languages} from "../../lib/i18n";
import {Modal} from "./Modal.tsx";
import "../../styles/components/LanguageModal.css";

interface LanguageModalProps {
    current: Language;
    onSelect: (lang: Language) => void;
    onClose: () => void;
    labels: {
        title: string;
    }
}

export function LanguageModal({current, onSelect, onClose, labels,}: LanguageModalProps) {
    return (
        <Modal
            onClose={onClose}
            titleText={labels.title}
        >
            <ul className="languages-list">
                {Object.values(languages).map((lang) => (
                    <li
                        key={lang.code}
                        className={`language-row ${current === lang.code ? "active" : ""}`}
                        onClick={() => {
                            onSelect(lang.code);
                            onClose();
                        }}
                    >
                        <img className="language-flag" src={lang.flagPath} alt={lang.label}/>
                        <span className="language-title">{lang.label}</span>
                    </li>
                ))}
            </ul>
        </Modal>
    );
}