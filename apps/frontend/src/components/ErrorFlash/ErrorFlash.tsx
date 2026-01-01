import "./ErrorFlash.css";

type ErrorFlashProps = {
    title?: string;
    error?: string | null;
};

export function ErrorFlash({title, error}: ErrorFlashProps) {
    if (!error) return null;

    return (
        <div className="error-flash">
            {title && <span className="error-flash-title">{title}</span>}
            <span className="error-flash-message">{error}</span>
        </div>
    );
}