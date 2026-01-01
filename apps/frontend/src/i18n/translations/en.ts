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
    auth: {
        signIn: "Sign in",
        signUp: "Sign up",
        noAccount: "Don’t have an account?",
        alreadyHaveAccount: "Already have an account?",
        username: "Username",
        password: "Password",
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