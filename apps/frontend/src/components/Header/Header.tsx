import "./Header.css";

interface HeaderProps {
    onLanguageClick: () => void;
    labels: {
        signIn: string;
    }
}

export function Header({onLanguageClick, labels}: HeaderProps) {
    return (
        <header className="header">
            <img className="logo" src="/logo.svg" alt="Logo"/>
            <div className="buttons-container">
                <button className="auth-button">
                    <img className="auth-img" src="/auth.svg" alt="Auth"/>
                    {labels.signIn}
                </button>

                <button className="language-button" onClick={onLanguageClick}>
                    <img className="language-img" src="/language.svg" alt="Language"/>
                </button>
            </div>
        </header>
    );
}