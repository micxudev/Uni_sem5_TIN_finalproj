import {useState} from "react";
import {AuthForm} from "../AuthForm/AuthForm.tsx";
import "./AuthModal.css";

type AuthMode = "signin" | "signup";

interface AuthModalProps {
    onClose: () => void;
    labels: {
        signIn: string;
        signUp: string;
        noAccount: string;
        alreadyHaveAccount: string;
        username: string;
        password: string;
    }
}

export function AuthModal({onClose, labels}: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>("signin");

    const isSignIn = mode === "signin";

    return (
        <div className="auth-modal">
            <h2 className="auth-title">{isSignIn ? labels.signIn : labels.signUp}</h2>

            {isSignIn ? (
                <AuthForm
                    labels={{
                        username: labels.username,
                        password: labels.password,
                        submit: labels.signIn
                    }}
                />
            ) : (
                <AuthForm
                    labels={{
                        username: labels.username,
                        password: labels.password,
                        submit: labels.signUp
                    }}
                />
            )}

            <div className="auth-switch">
                {isSignIn ? (
                    <>
                        <span>{labels.noAccount}</span>
                        <a onClick={() => setMode("signup")}>{labels.signUp}</a>
                    </>
                ) : (
                    <>
                        <span>{labels.alreadyHaveAccount}</span>
                        <a onClick={() => setMode("signin")}>{labels.signIn}</a>
                    </>
                )}
            </div>
        </div>
    );
}