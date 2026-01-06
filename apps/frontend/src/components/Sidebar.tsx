import {useState} from "react";
import {NavLink} from "react-router-dom";
import "../styles/components/Sidebar.css";
import type {AppRoute} from "../lib/types.ts";

interface SidebarProps {
    routes: AppRoute[]
}

export function Sidebar({routes}: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className="sidebar">
            <div className="sidebar__header">
                {!collapsed && (
                    <img
                        src="/logo.svg"
                        alt=""
                        className="sidebar__logo"
                    />
                )}

                <button
                    className="sidebar__toggle"
                    onClick={() => setCollapsed(prev => !prev)}
                >
                    <img
                        src="/close.svg"
                        alt=""
                        className="sidebar__toggle-icon"
                    />
                </button>
            </div>

            <nav className="sidebar__nav">
                {routes.map(route => (
                    <NavLink
                        key={route.path}
                        to={route.path}
                        className={({isActive}) =>
                            `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
                        }
                    >
                        <img
                            src={route.iconPath}
                            alt=""
                            className="sidebar__item-icon"
                        />
                        {!collapsed && (
                            <span className="sidebar__item-label">
                                {route.label}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}