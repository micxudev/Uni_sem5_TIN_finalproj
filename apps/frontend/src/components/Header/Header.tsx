import "./Header.css";
import type {User} from "@shared";

interface HeaderProps {
    user: User | null;
    onAuthClick: () => void;
    onLogoutClick: () => void;
    onLanguageClick: () => void;
    labels: {
        signIn: string;
        logout: string;
    }
}

export function Header({user, onAuthClick, onLogoutClick, onLanguageClick, labels}: HeaderProps) {
    return (
        <header className="header">
            <img className="logo" src="/logo.svg" alt="Logo"/>
            <div className="buttons-container">

                <button className="language-button" onClick={onLanguageClick}>
                    <img className="language-img" src="/language.svg" alt="Language"/>
                </button>

                {!user ? (
                    <button className="auth-button" onClick={onAuthClick}>
                        <img className="auth-img" src="/auth.svg" alt="Auth"/>
                        {labels.signIn}
                    </button>
                ) : (
                    <button className="auth-button" onClick={onLogoutClick}>
                        <img className="auth-img" src="/logout.svg" alt="Logout"/>
                        {labels.logout}
                    </button>
                )}
            </div>
        </header>
    );
}