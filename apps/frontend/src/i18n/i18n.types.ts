export interface TranslationSchema {
    skins: {
        title: string;
        id: string;
        name: string;
        rarity: string;
        createdAt: string;
        createdBy: string;
        createSuccess: string;
        updateSuccess: string;
        deleteSuccess: string;
        create: string;
        update: string;
        delete: string;
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
    };
    errors: {
        serverNotResponded: string;
    };
}