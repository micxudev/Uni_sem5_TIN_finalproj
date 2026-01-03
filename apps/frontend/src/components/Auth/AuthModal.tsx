import {useState} from "react";
import {AuthForm} from "./AuthForm.tsx";
import {type AuthInput, type User} from "@shared";
import {login, register} from "../../api/api.auth.ts";
import {ErrorFlash} from "../ErrorFlash/ErrorFlash.tsx";
import "./Auth.css";

type AuthMode = "signin" | "signup";

interface AuthModalProps {
    onClose: () => void;
    onSignIn: (user: User) => void;
    onSignUp: () => void;
    labels: {
        signIn: string;
        signUp: string;
        noAccount: string;
        alreadyHaveAccount: string;
        username: string;
        password: string;
    }
}

export function AuthModal({onClose, onSignIn, onSignUp, labels}: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>("signin");
    const [error, setError] = useState<string | null>(null);

    const isSignIn = mode === "signin";

    async function handleSubmit(data: AuthInput) {
        const response = isSignIn
            ? await login(data)
            : await register(data);

        if (!response.success) {
            setError(response.error.message);
            return;
        }

        isSignIn ? onSignIn(response.data) : onSignUp();

        onClose();
    }

    return (
        <div className="auth-modal">
            <h2 className="auth-title">
                {isSignIn ? labels.signIn : labels.signUp}
            </h2>

            <ErrorFlash error={error} closable={false}/>

            <AuthForm
                labels={{
                    username: labels.username,
                    password: labels.password,
                    submit: isSignIn ? labels.signIn : labels.signUp,
                }}
                onSubmit={handleSubmit}
            />

            <div className="auth-switch">
                <span>
                    {isSignIn ? labels.noAccount : labels.alreadyHaveAccount}
                </span>
                <a onClick={() => {
                    setMode(isSignIn ? "signup" : "signin");
                    setError(null);
                }}>
                    {isSignIn ? labels.signUp : labels.signIn}
                </a>
            </div>
        </div>
    );
}