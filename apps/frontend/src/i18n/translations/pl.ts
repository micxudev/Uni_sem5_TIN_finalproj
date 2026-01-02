import type {TranslationSchema} from "../i18n.types.ts";

export const pl: TranslationSchema = {
    skins: {
        title: "skórki",
        id: "ID",
        name: "Nazwa",
        rarity: "Rzadkość",
        createdAt: "Data utworzenia",
        createdBy: "Utworzone przez",
    },
    auth: {
        signIn: "Zaloguj się",
        signUp: "Zarejestruj się",
        logout: "Wyloguj się",
        noAccount: "Nie masz konta?",
        alreadyHaveAccount: "Masz już konto?",
        username: "Nazwa użytkownika",
        password: "Hasło",
        signInSuccess: "Logowanie pomyślne!",
        signUpSuccess: "Rejestracja przebiegła pomyślnie, możesz się teraz zalogować!",
        logoutSuccess: "Wylogowano pomyślnie!",
    },
    pagination: {
        prev: "Poprzednia",
        next: "Następna",
        page: "Strona",
    },
    languages: {
        title: "Język Interfejsu"
    },
    common: {
        edit: "Redagować",
        delete: "Usuwać",
    },
    errors: {
        serverNotResponded: "Serwer nie mógł odpowiedzieć",
    },
};