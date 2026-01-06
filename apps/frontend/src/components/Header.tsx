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
            <span className="header__title">s30173</span>

            <div className="header__actions">
                <button
                    className="header__action"
                    onClick={onLanguageClick}
                >
                    <img
                        className="header__action-icon"
                        src="/language.svg"
                        alt=""
                    />
                    <span className="header__action-label">
                        {labels.language}
                    </span>
                </button>

                {!user ? (
                    <button
                        className="header__action"
                        onClick={onAuthClick}
                    >
                        <img
                            className="header__action-icon"
                            src="/auth.svg"
                            alt=""
                        />
                        <span className="header__action-label">
                            {labels.signIn}
                        </span>
                    </button>
                ) : (
                    <button
                        className="header__action"
                        onClick={onProfileClick}
                    >
                        <img
                            className="header__action-icon"
                            src="/profile.svg"
                            alt=""
                        />
                        <span className="header__action-label">
                            {labels.profile}
                        </span>
                    </button>
                )}
            </div>
        </header>
    );
}