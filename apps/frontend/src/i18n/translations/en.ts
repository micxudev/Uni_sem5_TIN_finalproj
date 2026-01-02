import type {TranslationSchema} from "../i18n.types.ts";

export const en: TranslationSchema = {
    skins: {
        title: "skins",
        id: "ID",
        name: "Name",
        rarity: "Rarity",
        createdAt: "Created at",
        createdBy: "Created by",
    },
    users: {
        title: "Users",
        id: "ID",
        username: "Username",
        role: "Role",
        createdAt: "Created at",
        lastLootboxOpenedAt: "Last lootbox opened at",
    },
    auth: {
        signIn: "Sign in",
        signUp: "Sign up",
        logout: "Logout",
        noAccount: "Don’t have an account?",
        alreadyHaveAccount: "Already have an account?",
        username: "Username",
        password: "Password",
        signInSuccess: "Sign in successful!",
        signUpSuccess: "Sign up successful, you can now sign in!",
        logoutSuccess: "Logged out successfully!",
        profile: "Profile",
        changePassword: "Change Password",
    },
    pagination: {
        prev: "Previous",
        next: "Next",
        page: "Page",
    },
    languages: {
        title: "Interface Language"
    },
    common: {
        edit: "Edit",
        delete: "Delete",
    },
    errors: {
        serverNotResponded: "Server could not respond",
    },
};