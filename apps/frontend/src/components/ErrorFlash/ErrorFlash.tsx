import {useState} from "react";
import "./ErrorFlash.css";

type ErrorFlashProps = {
    title?: string;
    error?: string | null;
    closable?: boolean;
};

export function ErrorFlash({title, error, closable = true}: ErrorFlashProps) {
    const [visible, setVisible] = useState(true);

    if (!error || !visible) return null;

    return (
        <div className="error-flash">
            <div className="error-flash-content">
                {title && (<span className="error-flash-title">{title}</span>)}
                <span className="error-flash-message">{error}</span>
            </div>

            {closable && (
                <button
                    className="error-flash-close"
                    onClick={() => setVisible(false)}
                >
                    ×
                </button>
            )}
        </div>
    );
}