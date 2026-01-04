export interface TranslationSchema {
    skins: {
        title: string;
        id: string;
        name: string;
        rarity: string;
        createdAt: string;
        createdBy: string;
        createSuccess: (id: number) => string;
        updateSuccess: (id: number) => string;
        deleteSuccess: (id: number) => string;
        create: string;
        update: string;
        delete: string;
        deleteConfirm: string;
    };
    users: {
        title: string;
        id: string;
        username: string;
        role: string;
        createdAt: string;
        lastLootboxOpenedAt: string;
    };
    auth: {
        signIn: string;
        signUp: string;
        logout: string;
        noAccount: string;
        alreadyHaveAccount: string;
        username: string;
        password: string;
        signInSuccess: string;
        signUpSuccess: string;
        logoutSuccess: string;
        changePasswordSuccess: string;
        profile: string;
        changePassword: string;
        currentPassword: string;
        newPassword: string;
        logoutConfirm: string;
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
        create: string;
        update: string;
        delete: string;
        cancel: string;
    };
    errors: {
        serverNotResponded: string;
    };
}