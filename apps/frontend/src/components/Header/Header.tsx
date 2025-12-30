import "./Header.css";

export function Header() {
    return (
        <header className="header">
            <img className="logo" src="/logo.svg" alt="Logo"/>
            <div className="buttons-container">
                <button className="auth-button">
                    <img className="auth-img" src="/auth.svg" alt="Auth"/>
                    Sign in
                </button>

                <button className="language-button">
                    <img className="language-img" src="/language.svg" alt="Language"/>
                </button>
            </div>
        </header>
    );
}