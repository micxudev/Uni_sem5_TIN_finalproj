import "./Header.css";

interface HeaderProps {
    onAuthClick: () => void;
    onLanguageClick: () => void;
    labels: {
        signIn: string;
    }
}

export function Header({onAuthClick, onLanguageClick, labels}: HeaderProps) {
    return (
        <header className="header">
            <img className="logo" src="/logo.svg" alt="Logo"/>
            <div className="buttons-container">
                <button className="auth-button" onClick={onAuthClick}>
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