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
}