import type {TranslationSchema} from "../i18n.types.ts";

export const en: TranslationSchema = {
    skins: {
        title: "skins",
        id: "ID",
        name: "Name",
        rarity: "Rarity",
        createdAt: "Created at",
        createdBy: "Created by",
        createSuccess: (id) => `Skin with ID = ${id} created successfully!`,
        updateSuccess: (id) => `Skin with ID = ${id} updated successfully!`,
        deleteSuccess: (id) => `Skin with ID = ${id} deleted successfully!`,
        create: "Create Skin",
        update: "Update Skin",
        delete: "Delete Skin",
        deleteConfirm: "Are you sure you want to delete skin?",
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
        changePasswordSuccess: "Password changed successfully!",
        profile: "Profile",
        changePassword: "Change Password",
        currentPassword: "Current Password",
        newPassword: "New Password",
        logoutConfirm: "Are you sure you want to logout?",
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
        create: "Create",
        update: "Update",
        delete: "Delete",
        cancel: "Cancel",
    },
    errors: {
        serverNotResponded: "Server could not respond",
    },
};