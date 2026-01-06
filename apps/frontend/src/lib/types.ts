import type {ComponentType} from "react";

export interface AppRoute {
    path: string;
    navPath?: string;
    label: string;
    iconPath: string;
    component: ComponentType;
}