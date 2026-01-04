import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {App} from "./App";

import {I18nProvider} from "./i18n/I18nContext";
import {AuthProvider} from "./AuthContext/AuthContext.tsx";
import {ConfirmProvider} from "./Contexts/ConfirmContext.tsx";
import {Slide, ToastContainer} from "react-toastify";

import "./styles/index.css";
import "./styles/variables.css";
import "./styles/toasts.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <I18nProvider>
            <AuthProvider>
                <ConfirmProvider>
                    <App/>
                    <ToastContainer
                        autoClose={3000}
                        pauseOnHover
                        theme="dark"
                        transition={Slide}
                    />
                </ConfirmProvider>
            </AuthProvider>
        </I18nProvider>
    </StrictMode>
);