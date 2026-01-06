import type {ReactNode} from "react";
import "./styles/Layout.css";

interface AppLayoutProps {
    sidebar: ReactNode;
    header: ReactNode;
    children: ReactNode;
    footer: ReactNode;
}

export function Layout({sidebar, header, children, footer}: AppLayoutProps) {
    return (
        <div className="layout">
            {sidebar}
            <main className="layout__main">
                {header}
                <div className="layout__content">
                    {children}
                </div>
                {footer}
            </main>
        </div>
    );
}