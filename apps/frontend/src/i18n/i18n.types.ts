export interface TranslationSchema {
    skins: {
        title: string;
        id: string;
        name: string;
        rarity: string;
        createdAt: string;
        createdBy: string;
    };
    auth: {
        signIn: string;
        signUp: string;
        noAccount: string;
        alreadyHaveAccount: string;
        username: string;
        password: string;
        signUpSuccess: string;
    };
    pagination: {
        prev: string;
        next: string;
        page: string;
    };
    languages: {
        title: string;
    };
    common: {
        edit: string;
        delete: string;
    };
    errors: {
        serverNotResponded: string;
    };
}