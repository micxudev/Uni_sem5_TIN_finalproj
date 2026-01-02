import type {ReactNode} from "react";
import {Footer} from "../components/Footer/Footer";
import "./Layout.css";

interface AppLayoutProps {
    children: ReactNode;
    header: ReactNode;
}

export function AppLayout({children, header}: AppLayoutProps) {
    return (
        <div className="layout">
            {header}
            <main className="layout__main">{children}</main>
            <Footer/>
        </div>
    );
}