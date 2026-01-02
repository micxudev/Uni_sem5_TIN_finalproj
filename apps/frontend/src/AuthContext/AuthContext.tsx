import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import type {User} from "@shared";
import {getCurrentUser} from "../api/api.auth.ts";

type AuthContextValue = {
    user: User | null;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        getCurrentUser()
            .then((res) => {
                if (!isMounted) return;
                setUser(res.success ? res.data : null);
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    function login(user: User) {
        setUser(user);
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuthContext(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }
    return ctx;
}

export function useUser(): User | null {
    return useAuthContext().user;
}

export function useIsLoading(): boolean {
    return useAuthContext().isLoading;
}

export function useLogin(): (user: User) => void {
    return useAuthContext().login;
}

export function useLogout(): () => void {
    return useAuthContext().logout;
}