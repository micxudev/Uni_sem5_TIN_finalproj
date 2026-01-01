import {useState} from "react";
import {AuthForm} from "./AuthForm.tsx";
import {type ApiErrorPayload, type AuthInput} from "@shared";
import {login, register} from "../../api/api.auth.ts";
import {ErrorFlash} from "../ErrorFlash/ErrorFlash.tsx";
import "./Auth.css";

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
    const [error, setError] = useState<ApiErrorPayload | null>(null);

    const isSignIn = mode === "signin";

    async function handleSubmit(data: AuthInput) {
        const response = isSignIn
            ? await login(data)
            : await register(data);

        if (!response.success) {
            setError(response.error);
            return;
        }

        console.log(isSignIn ? "Signed in as:" : "Registered as:");
        console.log(response.data);

        onClose();
    }

    return (
        <div className="auth-modal">
            <h2 className="auth-title">
                {isSignIn ? labels.signIn : labels.signUp}
            </h2>

            <ErrorFlash error={error?.message}/>

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