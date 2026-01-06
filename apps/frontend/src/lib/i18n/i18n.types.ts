export interface TranslationSchema {
    skins: {
        nav_label: string;
        table_header_label: string;
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
        noData: string;
    };
    skin_ownership: {
        nav_label: string;
        table_header_label: string;
        ownershipId: string;
        source: string;
        obtainedAt: string;
        userId: string;
        skinId: string;
        skin: string;
        grant: string;
        noData: string;
        grantSuccess: string;
        viewOwnedSkins: string;
    }
    users: {
        nav_label: string;
        table_header_label: string;
        id: string;
        username: string;
        role: string;
        createdAt: string;
        lastLootboxOpenedAt: string;
        noData: string;
        user: string;
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
        unauthenticated: string;
        unauthorized: string;
        authRequired: string;
        adminRequired: string;
    };
}