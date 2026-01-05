import type {User} from "@shared";
import "../styles/components/Header.css";

interface HeaderProps {
    user: User | null;
    onLanguageClick: () => void;
    onAuthClick: () => void;
    onProfileClick: () => void;
    labels: {
        language: string;
        signIn: string;
        profile: string;
    }
}

export function Header({user, onLanguageClick, onAuthClick, onProfileClick, labels}: HeaderProps) {
    return (
        <header className="header">
            <img className="logo" src="/logo.svg" alt="Logo"/>
            <div className="buttons-container">

                <button className="header-button" onClick={onLanguageClick}>
                    <img className="header-button-img" src="/language.svg" alt="Language"/>
                    {labels.language}
                </button>

                {!user ? (
                    <button className="header-button" onClick={onAuthClick}>
                        <img className="header-button-img" src="/auth.svg" alt="Auth"/>
                        {labels.signIn}
                    </button>
                ) : (
                    <button className="header-button" onClick={onProfileClick}>
                        <img className="header-button-img" src="/profile.svg" alt="Profile"/>
                        {labels.profile}
                    </button>
                )}
            </div>
        </header>
    );
}